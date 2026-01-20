"use client";

import { useEffect, useRef } from "react";
import { initGradientBackground } from "@/lib/gradientBackground";

export function GradientBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initializes the procedural heightmap gradient + subtle animation and returns a cleanup.
    const cleanup = initGradientBackground(canvas);
    return cleanup;
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-60"
      />
    </div>
  );
}


