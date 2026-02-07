"use client";
import { useEffect, useRef, useState } from "react";

export default function UpdatedOn({ lang = 'en' }: { lang?: 'en' | 'zh' }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Consider visible when element enters the viewport moderately (50% visible)
          setVisible(entry.isIntersecting || entry.intersectionRatio >= 0.5);
        });
      },
      { threshold: [0, 0.5, 1.0] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
      <span
        aria-hidden={!visible}
        style={{
          fontSize: 12,
          color: "#374151",
          opacity: visible ? 0.85 : 0,
          transition: "opacity 200ms ease",
          padding: "6px 8px",
        }}
      >
        {lang === 'zh' ? '更新于 2026年2月6日' : 'Updated on Feb 6, 2026'}
      </span>
    </div>
  );
}
