// Fullscreen generative gradient background rendered to a canvas.
// Uses value-noise + fbm to create an organic, non-repeating heightmap,
// then maps height (0..1) to a harmonious randomized color scale.

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(c1, c2, t) {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t))
  ];
}

function hslToRgb(h, s, l) {
  // h in [0..360)
  const hh = ((h % 360) + 360) % 360;
  const ss = clamp01(s);
  const ll = clamp01(l);
  const c = (1 - Math.abs(2 * ll - 1)) * ss;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = ll - c / 2;
  let r = 0, g = 0, b = 0;
  if (hh < 60) [r, g, b] = [c, x, 0];
  else if (hh < 120) [r, g, b] = [x, c, 0];
  else if (hh < 180) [r, g, b] = [0, c, x];
  else if (hh < 240) [r, g, b] = [0, x, c];
  else if (hh < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

function makePalette() {
  // Deterministic palette tuned to Pantone 11-4201 (Cloud Dancer).
  // CMYK(0,1,3,6) ≈ RGB(240,237,233) -> base color
  const base = [240, 237, 233];

  function mix(a, b, t) {
    return [
      Math.round(lerp(a[0], b[0], t)),
      Math.round(lerp(a[1], b[1], t)),
      Math.round(lerp(a[2], b[2], t))
    ];
  }

  const lighter = [255, 255, 255];
  const darker = [30, 30, 30];

  return [
    mix(base, darker, 0.18),
    mix(base, lighter, 0.06),
    mix(base, lighter, 0.18),
    mix(base, lighter, 0.35)
  ];
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function makeValueNoise(seed) {
  const rand = mulberry32(seed);
  const cache = new Map();
  const key = (x, y) => `${x},${y}`;

  function grid(x, y) {
    const k = key(x, y);
    if (!cache.has(k)) cache.set(k, rand());
    return cache.get(k);
  }

  // 2D value noise with smooth interpolation
  return function noise2D(x, y) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = x0 + 1;
    const y1 = y0 + 1;
    const sx = smoothstep(x - x0);
    const sy = smoothstep(y - y0);

    const n00 = grid(x0, y0);
    const n10 = grid(x1, y0);
    const n01 = grid(x0, y1);
    const n11 = grid(x1, y1);

    const ix0 = lerp(n00, n10, sx);
    const ix1 = lerp(n01, n11, sx);
    return lerp(ix0, ix1, sy);
  };
}

function fbm(noise2D, x, y, octaves) {
  let value = 0;
  let amp = 0.5;
  let freq = 1;
  let sumAmp = 0;
  for (let i = 0; i < octaves; i++) {
    value += amp * noise2D(x * freq, y * freq);
    sumAmp += amp;
    amp *= 0.55;
    freq *= 2.0;
  }
  return value / sumAmp;
}

function colorFromHeight(palette, h) {
  const t = clamp01(h);
  // Use 4-stop gradient mapping for smooth, organic color transitions
  if (t < 0.33) return lerpColor(palette[0], palette[1], t / 0.33);
  if (t < 0.66) return lerpColor(palette[1], palette[2], (t - 0.33) / 0.33);
  return lerpColor(palette[2], palette[3], (t - 0.66) / 0.34);
}

export function initGradientBackground(canvas) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return () => {};

  // Render at a smaller internal resolution for performance, then scale up smoothly.
  let renderW = 0;
  let renderH = 0;
  let img = null;
  const offscreen = document.createElement("canvas");
  const offCtx = offscreen.getContext("2d", { alpha: false });
  if (!offCtx) return () => {};

  const seed = 123456789;
  const noise2D = makeValueNoise(seed);
  const palette = makePalette();

  // Subtle animation: slowly drift the sampling offsets.
  let ox = Math.random() * 1000;
  let oy = Math.random() * 1000;

  let raf = 0;
  let lastPaint = 0;
  const FPS = 12; // low frequency for "homepage-safe" subtle motion
  const frameInterval = 1000 / FPS;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth || window.innerWidth;
    const cssH = canvas.clientHeight || window.innerHeight;

    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);

    // internal render grid (kept small for perf, but proportional to screen)
    renderW = Math.max(240, Math.floor(cssW / 5));
    renderH = Math.max(240, Math.floor(cssH / 5));
    img = ctx.createImageData(renderW, renderH);
    offscreen.width = renderW;
    offscreen.height = renderH;
  }

  function paint(ts) {
    raf = requestAnimationFrame(paint);
    if (ts - lastPaint < frameInterval) return;
    lastPaint = ts;
    if (!img) return;

    // Very slow drift speeds (subtle)
    ox += 0.002;
    oy += 0.0015;

    const data = img.data;
    // Higher spatial frequency and one fewer octave to keep visible banding smooth but clear.
    const scale = 0.05;
    const octaves = 4;

    for (let y = 0; y < renderH; y++) {
      const ny = (y / renderH) * 10;
      for (let x = 0; x < renderW; x++) {
        const nx = (x / renderW) * 10;
        const h = fbm(noise2D, nx * scale + ox, ny * scale + oy, octaves);
        const c = colorFromHeight(palette, h);
        const i = (y * renderW + x) * 4;
        data[i + 0] = c[0];
        data[i + 1] = c[1];
        data[i + 2] = c[2];
        data[i + 3] = 255;
      }
    }

    // Draw scaled up to the full canvas
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Put pixels into an offscreen buffer, then scale that buffer to fill the main canvas.
    offCtx.putImageData(img, 0, 0);
    ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  resize();
  const onResize = () => resize();
  window.addEventListener("resize", onResize, { passive: true });
  raf = requestAnimationFrame(paint);

  // Cleanup for React unmount / HMR
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onResize);
  };
}


