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
      // Use non-negative z-index so the canvas isn't placed behind the body background.
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        // Slightly higher opacity so the effect is visible but still subtle.
        className="h-full w-full opacity-80"
      />
    </div>
  );
}


