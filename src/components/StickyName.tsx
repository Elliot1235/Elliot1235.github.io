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
  const minScale = 0.62; // final scale when pinned
  const stickyTop = 12; // px from top when pinned

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let initialTop = el.getBoundingClientRect().top;
    // If initialTop is too close to top (rare during SSR/hydration), recompute after a tick.
    requestAnimationFrame(() => {
      initialTop = el.getBoundingClientRect().top;
    });

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const currentTop = rect.top;

        // If currentTop is below initialTop, progress is 0.
        // When currentTop reaches stickyTop, progress is 1.
        const denom = Math.max(initialTop - stickyTop, 1);
        const raw = (initialTop - currentTop) / denom;
        const p = Math.max(0, Math.min(1, raw));
        const s = 1 - p * (1 - minScale);
        setScale(s);

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
    <div className="w-full flex justify-center">
      <div className="sticky" style={{ top: `${stickyTop}px`, zIndex: 30 }}>
        <h1
          ref={ref}
          className={className}
          style={{ transform: `scale(${scale})`, transformOrigin: "top center", transition: "transform 120ms linear" }}
        >
          {children}
        </h1>
      </div>
    </div>
  );
}
