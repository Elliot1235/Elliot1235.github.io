"use client";

import { useEffect, useState } from "react";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const atBottom = (window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 24);
      setVisible(Boolean(atBottom));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div style={{ textAlign: "center", marginTop: 36, marginBottom: 8 }}>
      <button
        aria-label="Go to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          background: "var(--accent-color-dark, #d2cfc6)",
          color: "#111827",
          border: "none",
          padding: "10px 14px",
          borderRadius: 12,
          boxShadow: "0 6px 18px rgba(15,23,42,0.12)",
          cursor: "pointer",
          display: "inline-block"
        }}
      >
        ↑ Top
      </button>
    </div>
  );
}
