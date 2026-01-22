"use client";

import { useEffect, useState } from "react";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let sentinel: HTMLElement | null = null;

    // SSR safety: only run DOM code in browser
    if (typeof window !== "undefined" && typeof IntersectionObserver !== "undefined") {
      sentinel = document.createElement("div");
      sentinel.style.position = "absolute";
      sentinel.style.left = "0";
      sentinel.style.right = "0";
      sentinel.style.bottom = "0";
      sentinel.style.height = "1px";
      sentinel.style.pointerEvents = "none";
      sentinel.setAttribute("data-gototop-sentinel", "");
      document.body.appendChild(sentinel);

      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setVisible(Boolean(entry && entry.isIntersecting));
        },
        { root: null, threshold: 0, rootMargin: "0px 0px -24px 0px" }
      );
      observer.observe(sentinel);
    }

    // Fallback: simple, rAF-throttled scroll check (keeps previous logic but safer).
    let tick = false;
    function fallbackScroll() {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        const atBottom = window.innerHeight + scrollY >= (document.documentElement.scrollHeight - 24);
        setVisible(Boolean(atBottom));
        tick = false;
      });
    }
    window.addEventListener("scroll", fallbackScroll, { passive: true });
    // Initial assess: either observer will trigger, or run fallback immediately.
    fallbackScroll();

    return () => {
      window.removeEventListener("scroll", fallbackScroll);
      if (observer) {
        observer.disconnect();
      }
      if (sentinel && sentinel.parentNode) {
        sentinel.parentNode.removeChild(sentinel);
      }
    };
  }, []);

  // Render as a fixed overlay so showing/hiding doesn't change document flow
  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 24,
        display: "flex",
        justifyContent: "center",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 9999,
        transition: "opacity 180ms linear, transform 180ms linear",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)"
      }}
    >
      <button
        aria-label="Go to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          background: "#ffffff",
          color: "#374151",
          border: "none",
          width: 56,
          height: 56,
          padding: 0,
          borderRadius: 9999,
          boxShadow: "0 8px 24px rgba(2,6,23,0.12)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M6 15L12 9L18 15" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
