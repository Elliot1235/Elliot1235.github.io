"use client";

import { useEffect, useRef, useState } from "react";

export default function StickyName({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  const [scale, setScale] = useState(1);
  const [isPinned, setIsPinned] = useState(false);
  const [hidden, setHidden] = useState(false);
  const hiddenRef = useRef(false);

  const [placeholderHeight, setPlaceholderHeight] = useState(0);

  const minScale = 0.4;
  const stickyTop = 16;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;

    setPlaceholderHeight(rect.height + 32);

    const denom = Math.max(elementTop - stickyTop, 1);

    let ticking = false;
    let pinnedRef = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;

        // ===== 计算缩放 =====
        const raw = scrollY / denom;
        const p = Math.max(0, Math.min(1, raw));
        const newScale = 1 - p * (1 - minScale);

        setScale(newScale);

        // ===== pinned 状态 =====
        const shouldPin = p >= 0.98;
        if (shouldPin !== pinnedRef) {
          pinnedRef = shouldPin;
          setIsPinned(shouldPin);
        }

        // ===== Hero 文本淡出 =====
        const heroOpacity = Math.max(0, 1 - p * 1.2);
        document.documentElement.style.setProperty(
          "--hero-text-opacity",
          String(heroOpacity)
        );

        // ===== Experience 淡出逻辑 =====
        const experienceTitle = document.getElementById("experience-title");

        if (experienceTitle) {
          const otherRect = experienceTitle.getBoundingClientRect();
          const experienceTop =
            otherRect.top + (window.scrollY || window.pageYOffset);

          const fadeOffset = 120; // 提前淡出
          const shouldHide =
            scrollY >= experienceTop - stickyTop - fadeOffset;

          if (shouldHide !== hiddenRef.current) {
            hiddenRef.current = shouldHide;
            setHidden(shouldHide);
          }
        }

        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* 防止跳动 */}
      {isPinned && <div style={{ height: placeholderHeight }} aria-hidden />}

      <div
        style={
          isPinned
            ? {
                position: "fixed",
                top: `${stickyTop}px`,
                left: 0,
                width: "100%",
                zIndex: 9999,
              }
            : {}
        }
        className="w-full flex justify-center"
      >
        <div
          style={
            isPinned
              ? {
                  padding: "8px 0",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }
              : {}
          }
        >
          <h1
            ref={ref}
            className={className}
            style={{
              transform: `scale(${isPinned ? minScale : scale})`,
              transformOrigin: "top center",
              opacity: hidden ? 0 : 1,
              filter: hidden ? "blur(6px)" : "blur(0px)",
              transition:
                "transform 140ms linear, opacity 320ms ease, filter 320ms ease",
              willChange: "transform, opacity, filter",
            }}
          >
            {children}
          </h1>
        </div>
      </div>
    </>
  );
}
