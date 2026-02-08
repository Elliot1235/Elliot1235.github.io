"use client";
import { useEffect, useRef, useState } from "react";

/* ---------- 生成手绘路径 ---------- */

function generateSketchPath(w: number, h: number, jitter = 3) {
  const j = () => (Math.random() - 0.5) * jitter;

  const topMid = w / 2 + j();
  const rightMid = h / 2 + j();
  const bottomMid = w / 2 + j();
  const leftMid = h / 2 + j();

  return `
    M ${10 + j()} ${10 + j()}
    Q ${topMid} ${5 + j()}, ${w - 10 + j()} ${10 + j()}
    Q ${w - 5 + j()} ${rightMid}, ${w - 10 + j()} ${h - 10 + j()}
    Q ${bottomMid} ${h - 5 + j()}, ${10 + j()} ${h - 10 + j()}
    Q ${5 + j()} ${leftMid}, ${10 + j()} ${10 + j()}
    Z
  `;
}

/* ---------- 主组件 ---------- */

export default function SketchCard({
  children,
  width = 420,
  height = 180,
  fillParent = false,
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  fillParent?: boolean;
}) {
  const [measured, setMeasured] = useState({ w: width, h: height });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!fillParent || !containerRef.current) return;

    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setMeasured({
        w: Math.max(160, Math.round(rect.width)),
        h: Math.max(120, Math.round(rect.height)),
      });
    });

    ro.observe(el);

    const rect = el.getBoundingClientRect();
    setMeasured({
      w: Math.max(160, Math.round(rect.width)),
      h: Math.max(120, Math.round(rect.height)),
    });

    return () => ro.disconnect();
  }, [fillParent]);

  const w = fillParent ? measured.w : width;
  const h = fillParent ? measured.h : height;

  const [path1, setPath1] = useState(generateSketchPath(w, h, 3));
  const [path2, setPath2] = useState(generateSketchPath(w, h, 2));

  const [stroke1, setStroke1] = useState(2);
  const [stroke2, setStroke2] = useState(1.2);

  const [active, setActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPath1(generateSketchPath(w, h, 3));
    setPath2(generateSketchPath(w, h, 2));
  }, [w, h]);

  useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => {
        setPath1(generateSketchPath(w, h, 3));
        setPath2(generateSketchPath(w, h, 2));
        setStroke1(1.8 + Math.random() * 0.4);
        setStroke2(1 + Math.random() * 0.3);
      }, 120);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, w, h]);

  const uid = Math.random().toString(36).slice(2, 9);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [measuredContent, setMeasuredContent] = useState({ w: w, h: h, ready: false });

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setMeasuredContent({ w: Math.max(160, Math.round(rect.width)), h: Math.max(80, Math.round(rect.height)), ready: true });
    });
    ro.observe(el);
    // initial measure
    const rect = el.getBoundingClientRect();
    setMeasuredContent({ w: Math.max(160, Math.round(rect.width)), h: Math.max(80, Math.round(rect.height)), ready: true });
    return () => ro.disconnect();
  }, [w, h, children]);

  return (
    <div
      ref={containerRef}
      className="relative w-full transition-transform duration-300 hover:rotate-[0.15deg] hover:scale-[1.01]"
      style={{ height: measuredContent.ready ? measuredContent.h : 'auto' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* While measuring, render an invisible content node to size the card. After measured, render clipped SVG containing the paper and content. */}
      {!measuredContent.ready && (
        <div ref={contentRef} className="w-full box-border p-6">
          {children}
        </div>
      )}

      {measuredContent.ready && (
        <svg
          width={measuredContent.w}
          height={measuredContent.h}
          viewBox={`0 0 ${measuredContent.w} ${measuredContent.h}`}
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          <defs>
            <clipPath id={`clip-${uid}`}>
              <path d={path1} />
            </clipPath>
          </defs>

          <foreignObject width={measuredContent.w} height={measuredContent.h} clipPath={`url(#clip-${uid})`}>
              <div style={{ width: '100%', height: '100%', position: 'relative', pointerEvents: 'auto' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#ffffff,#fbfcff)' }} />
                <div className="paper-grain w-full h-full" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.08 }} />
                <div className="w-full h-full box-border p-6" style={{ position: 'relative' }}>
                  {children}
                </div>
              </div>
            </foreignObject>

            <path
              d={path1}
              fill="none"
              stroke="black"
              strokeWidth={stroke1}
              strokeLinecap="round"
              opacity="0.9"
              pointerEvents="none"
            />

            <path
              d={path2}
              fill="none"
              stroke="black"
              strokeWidth={stroke2}
              strokeLinecap="round"
              opacity="0.5"
              pointerEvents="none"
            />
        </svg>
      )}
    </div>
  );
}
