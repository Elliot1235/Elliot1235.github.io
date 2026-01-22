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
