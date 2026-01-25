"use client";
import { useEffect, useRef, useState } from "react";

export default function UpdatedOn() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Consider visible only when the element is fully in the viewport
          setVisible(entry.intersectionRatio >= 1);
        });
      },
      { threshold: [1.0] }
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
          color: "white",
          opacity: visible ? 0.65 : 0,
          transition: "opacity 180ms ease",
          padding: "6px 8px",
        }}
      >
        Updated on Jan 25, 2026
      </span>
    </div>
  );
}
