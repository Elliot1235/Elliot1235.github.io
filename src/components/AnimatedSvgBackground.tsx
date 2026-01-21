"use client";

import { useMemo } from "react";

/*
  AnimatedSvgBackground

  - Full-viewport SVG composed of multiple layered <radialGradient>s.
  - Each layer uses 2-3 stops sampled only from the allowed palette (see constants).
  - Subtle, extremely slow CSS animations applied to each layer's <g> wrapper.
  - Respects prefers-reduced-motion: disables animation when user prefers reduced motion.

  Easy-to-adjust constants are grouped near the top of the file.
*/

const PALETTE = [
  // Slightly stronger / more visible approximations of the allowed Pantone colors
  // Pantone 11-0515 Lemon Icing
  "#FFF7A3",
  // Pantone 13-4108 Nimbus Cloud
  "#BFC9D3",
  // Pantone 11-1400 Raindrops on Roses
  "#F8C9CC",
  // Pantone 11-4201 Cloud Dancer
  "#F0EDE9",
  // Pantone 13-4306 Ice Melt
  "#CFEFF4",
  // Pantone 12-1107 Peach Dust
  "#F6D1C2",
  // Pantone 13-6006 Almost Aqua
  "#C6F0EC",
  // Pantone 13-3802 Orchid Tint
  "#E9DFF5"
];

// Constants you can tweak
const NUM_LAYERS = 5; // 3-6 is a good range
const OPACITY_MIN = 0.12;
const OPACITY_MAX = 0.32;
const R_MIN = 60; // percent
const R_MAX = 120; // percent
const CX_OFFSET = 12; // percent: allow cx/cy to be slightly outside 0..100
const DURATION_MIN = 90; // seconds
const DURATION_MAX = 220; // seconds
const TRANSLATE_PCT = 4; // ±% translation range (very subtle)
const SCALE_MIN = 0.99;
const SCALE_MAX = 1.04;
const ROTATE_DEG = 5; // ± degrees

function rand(seedless = false) {
  // Small wrapper for randomness; using Math.random() is acceptable here.
  return Math.random();
}

function pickFromPalette() {
  return PALETTE[Math.floor(rand() * PALETTE.length)];
}

function randBetween(min: number, max: number) {
  return min + rand() * (max - min);
}

export function AnimatedSvgBackground({ layers = NUM_LAYERS }: { layers?: number }) {
  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Generate deterministic-ish layer data on first render.
  const layerData = useMemo(() => {
    return Array.from({ length: layers }).map((_, i) => {
      const stops = Math.random() < 0.5 ? 2 : 3; // 2 or 3 stops
      const colors = Array.from({ length: stops }).map(() => pickFromPalette());
      const cx = randBetween(-CX_OFFSET, 100 + CX_OFFSET);
      const cy = randBetween(-CX_OFFSET, 100 + CX_OFFSET);
      const r = randBetween(R_MIN, R_MAX);
      const opacity = randBetween(OPACITY_MIN, OPACITY_MAX);
      const duration = Math.floor(randBetween(DURATION_MIN, DURATION_MAX));
      // Motion parameters (very small)
      const tx = randBetween(-TRANSLATE_PCT, TRANSLATE_PCT);
      const ty = randBetween(-TRANSLATE_PCT, TRANSLATE_PCT);
      const scale = randBetween(SCALE_MIN, SCALE_MAX);
      const rotate = randBetween(-ROTATE_DEG, ROTATE_DEG);

      return { id: `g-${i}`, colors, cx, cy, r, opacity, duration, tx, ty, scale, rotate };
    });
  }, [layers]);

  // Create CSS keyframes for each layer. We inline the stylesheet so durations
  // and deltas differ per-layer and are generated at runtime.
  const styleSheet = useMemo(() => {
    let css = "";
    if (!prefersReduced) {
      layerData.forEach((ld, i) => {
        const name = `anim-${i}`;
        // Keyframes: subtle 3-stop drift (0 -> mid -> 100) to avoid mechanical back-and-forth.
        css += `@keyframes ${name} {`;
        css += `0% { transform: translate(${(-ld.tx / 2).toFixed(3)}%, ${(-ld.ty / 2).toFixed(3)}%) rotate(${(-ld.rotate / 2).toFixed(3)}deg) scale(${(1 / Math.sqrt(ld.scale)).toFixed(4)}); }`;
        css += `50% { transform: translate(${(ld.tx).toFixed(3)}%, ${(ld.ty).toFixed(3)}%) rotate(${(ld.rotate).toFixed(3)}deg) scale(${(ld.scale).toFixed(4)}); }`;
        css += `100% { transform: translate(${(-ld.tx / 2).toFixed(3)}%, ${(-ld.ty / 2).toFixed(3)}%) rotate(${(-ld.rotate / 2).toFixed(3)}deg) scale(${(1 / Math.sqrt(ld.scale)).toFixed(4)}); }`;
        css += `}`;

        css += `.svg-layer-${i} { transform-origin: 50% 50%; transform-box: fill-box; animation: ${name} ${ld.duration}s linear infinite; }\n`;
      });
    }
    // Reduced motion rule
    css += `@media (prefers-reduced-motion: reduce) { .svg-layer { animation: none !important; } }`;
    return css;
  }, [layerData, prefersReduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {layerData.map((ld, i) => (
            <radialGradient
              key={ld.id}
              id={ld.id}
              cx={`${ld.cx}%`}
              cy={`${ld.cy}%`}
              r={`${ld.r}%`}
              gradientUnits="userSpaceOnUse"
            >
              {ld.colors.map((c, idx) => {
                // Spread stops across 0..100%
                const offset = Math.round((idx / (ld.colors.length - 1)) * 100);
                return <stop key={idx} offset={`${offset}%`} stopColor={c} stopOpacity={1} />;
              })}
            </radialGradient>
          ))}
        </defs>

        {/* Inline dynamic stylesheet for per-layer keyframes */}
        <style>{styleSheet}</style>

        {/* Each rect fills the viewBox and is wrapped in a <g> which is animated subtly */}
        {layerData.map((ld, i) => (
          <g
            key={`wrap-${i}`}
            className={`svg-layer svg-layer-${i}`}
            style={{ opacity: ld.opacity }}
          >
            <rect x="0" y="0" width="100" height="100" fill={`url(#${ld.id})`} />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default AnimatedSvgBackground;
