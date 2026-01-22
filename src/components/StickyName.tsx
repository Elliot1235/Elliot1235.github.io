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
  const [hiddenByOverlap, setHiddenByOverlap] = useState(false);
  const hiddenRef = useRef(false);
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

    // Reduce thrash by limiting updates and applying hysteresis around the pinned state.
    let ticking = false;
    const pinnedEnter = 0.98; // p >= enter -> pin
    const pinnedExit = 0.94; // p <= exit -> unpin
    const scaleRef = { current: scale };
    let pinnedRef = isPinned;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        const raw = scrollY / denom;
        const p = Math.max(0, Math.min(1, raw));
        const s = 1 - p * (1 - minScale);

        // Update scale only when change is perceptible to avoid excessive renders.
        if (Math.abs(s - scaleRef.current) > 0.004) {
          scaleRef.current = s;
          setScale(s);
        }

        // Hysteresis for pinned state to avoid rapid toggle near the boundary.
        const shouldPin = p >= pinnedEnter || (p > pinnedExit && pinnedRef);
        if (shouldPin !== pinnedRef) {
          pinnedRef = shouldPin;
          setIsPinned(shouldPin);
        }

        // expose a hero fade value: lines should disappear as p -> 1
        try {
          document.documentElement.style.setProperty("--hero-text-opacity", String(Math.max(0, 1 - p)));
          document.documentElement.style.setProperty("--hero-content-opacity", String(Math.max(0, 1 - p)));
        } catch (e) {
          // ignore on server
        }

        // Stable section-based hide: once the page scroll passes the top of
        // `#experience-title` the sticky name remains hidden until the page
        // scrolls back above that section. This prevents momentary re-appear
        // caused by transient overlap during scrolling.
        try {
          const other = document.getElementById("experience-title");
          if (other) {
            const otherRect = other.getBoundingClientRect();
            const experienceTop = otherRect.top + (window.scrollY || window.pageYOffset);
            const scrollY = window.scrollY || window.pageYOffset;
            const shouldHide = scrollY >= Math.max(0, experienceTop - stickyTop);
            if (shouldHide !== hiddenRef.current) {
              hiddenRef.current = shouldHide;
              setHiddenByOverlap(shouldHide);
            }
          }
        } catch (e) {
          // ignore
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
            style={{
              transform: `scale(${isPinned ? minScale : scale})`,
              transformOrigin: "top center",
              transition: "transform 120ms linear, opacity 120ms linear",
              opacity: hiddenByOverlap ? 0 : 1
            }}
          >
            {children}
          </h1>
        </div>
      </div>
    </>
  );
}
