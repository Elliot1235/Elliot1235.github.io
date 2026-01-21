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
  const minScale = 0.62; // final scale when pinned
  const stickyTop = 12; // px from top when pinned

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // measure element height and top relative to document
    const rect = el.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;
    setPlaceholderHeight(rect.height);
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
        setIsPinned(p >= 0.999);
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
        style={isPinned ? { position: "fixed", top: 0, left: 0, width: "100%", zIndex: 60 } : {}}
        className="w-full flex justify-center"
      >
        <div
          style={isPinned ? { padding: "8px 0", width: "100%", display: "flex", justifyContent: "center", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(6px)" } : {}}
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
