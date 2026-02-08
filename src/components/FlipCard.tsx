"use client";

import React, { useState, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";

 type Props = {
  frontSrc: string;
  backSrc: string;
  alt?: string;
  className?: string;
  // called when user clicks the card (not when flipped programmatically)
  onToggle?: (next: boolean) => void;
  // callback to receive an imperative API: { el, flip(suppressCallback?), isFlipped }
  domApiRef?: (api: { el: HTMLButtonElement | null; flip: (suppressCallback?: boolean) => void; isFlipped: () => boolean } | null) => void;
};

const FlipCard = forwardRef<HTMLButtonElement, Props>(function FlipCard(
  { frontSrc, backSrc, alt = "card", className = "", onToggle, domApiRef },
  ref
) {
  const [internal, setInternal] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  // expose imperative API to parent
  React.useImperativeHandle(ref, () => ({
    // attach el to forwarded ref for compatibility
    // consumer likely won't use forwarded ref directly when using domApiRef
    // but we keep it for completeness
    get el() {
      return buttonRef.current as any;
    }
  }), []);

  // provide domApiRef callback with methods
  useEffect(() => {
    const api = {
      el: buttonRef.current,
      flip: (suppressCallback = true) => {
        setInternal((v) => {
          const next = !v;
          if (!suppressCallback) onToggle && onToggle(next);
          return next;
        });
      },
      isFlipped: () => internal,
    };
    domApiRef?.(api);
    return () => domApiRef?.(null);
  }, [internal, domApiRef, onToggle]);

  function handleClick() {
    setInternal((v) => {
      const next = !v;
      onToggle && onToggle(next);
      return next;
    });
  }

  const shown = internal;

  return (
    <button
      ref={(el) => (buttonRef.current = el) as any}
      type="button"
      aria-pressed={shown}
      onClick={handleClick}
      className={`
        relative aspect-[5/7] w-full
        focus:outline-none
        transition-transform hover:scale-[1.02]
        ${className}
      `}
      style={{ perspective: 1200 }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: shown ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* BACK FACE */}
        <div
          className="
            absolute inset-0 rounded-lg overflow-hidden
            shadow-[12px_12px_24px_rgba(0,0,0,0.14)]
          "
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <img
            src={backSrc}
            alt="card back"
            className="h-full w-full object-cover select-none"
            draggable={false}
          />
        </div>

        {/* FRONT FACE */}
        <div
          className="
            absolute inset-0 rounded-lg overflow-hidden
            shadow-[12px_12px_24px_rgba(0,0,0,0.14)]
          "
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <img
            src={frontSrc}
            alt={alt}
            className="h-full w-full object-cover select-none"
            draggable={false}
          />
        </div>
      </motion.div>
    </button>
  );
});

export default FlipCard;
