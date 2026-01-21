"use client";

import { useEffect, useRef, useState } from "react";

// StickyName: scales the heading as the user scrolls and pins it to the top.
// Behavior:
// - On first render we capture the heading's initial top offset.
// - As the page scrolls up, we compute progress until the heading reaches
//   a sticky top offset and interpolate a scale between 1 and minScale.
// - The wrapper uses `position: sticky` so once user scrolls past it the
//   element remains fixed at the top of the viewport.

export default function StickyName({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [scale, setScale] = useState(1);
  const [isPinned, setIsPinned] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const minScale = 0.4; // final scale when pinned (60% smaller => 40% size)
  const stickyTop = 16; // px from top when pinned (16px padding from edge)

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // measure element height and top relative to document
    const rect = el.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;
    // reserve an extra 32px below the name when pinned so content doesn't touch it
    setPlaceholderHeight(rect.height + 32);
    const denom = Math.max(elementTop - stickyTop, 1);

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        const raw = scrollY / denom;
        const p = Math.max(0, Math.min(1, raw));
        const s = 1 - p * (1 - minScale);
        setScale(s);
        // consider pinned when progress reaches 1 (allow tiny epsilon)
        const pinned = p >= 0.999;
        setIsPinned(pinned);
        // expose a hero fade value: lines should disappear as p -> 1
        try {
          document.documentElement.style.setProperty("--hero-text-opacity", String(Math.max(0, 1 - p)));
          document.documentElement.style.setProperty("--hero-content-opacity", String(Math.max(0, 1 - p)));
        } catch (e) {
          // ignore on server
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // initialize
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Placeholder to avoid layout shift when the heading becomes fixed */}
      {isPinned && <div style={{ height: placeholderHeight }} aria-hidden />}

      <div
        style={isPinned ? { position: "fixed", top: `${stickyTop}px`, left: 0, width: "100%", zIndex: 9999 } : {}}
        className="w-full flex justify-center"
      >
        <div
          style={isPinned ? { padding: "8px 0", width: "100%", display: "flex", justifyContent: "center", background: "transparent" } : {}}
        >
          <h1
            ref={ref}
            className={className}
            style={{ transform: `scale(${isPinned ? minScale : scale})`, transformOrigin: "top center", transition: "transform 120ms linear" }}
          >
            {children}
          </h1>
        </div>
      </div>
    </>
  );
}
