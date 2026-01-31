"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  frontSrc: string;
  alt?: string;
  className?: string;
};

export default function FlipCard({
  frontSrc,
  alt = "card",
  className = "",
}: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped(v => !v)}
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
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* BACK FACE */}
        <div
          className="
            absolute inset-0 rounded-lg overflow-hidden
            bg-white
            shadow-[12px_12px_24px_rgba(0,0,0,0.14)]
          "
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <img
            src="/images/Back.png"
            alt="card back"
            className="h-full w-full object-cover select-none"
            draggable={false}
          />
        </div>

        {/* FRONT FACE */}
        <div
          className="
            absolute inset-0 rounded-lg overflow-hidden
            bg-white
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
}
