"use client";

import { useEffect, useState } from "react";

export default function Background() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  // 监听鼠标（空气被轻微推动）
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 极慢惯性漂移
  useEffect(() => {
    const interval = setInterval(() => {
      setDrift(prev => ({
        x: prev.x + (mouse.x - 0.5 - prev.x) * 0.02,
        y: prev.y + (mouse.y - 0.5 - prev.y) * 0.02,
      }));
    }, 40);
    return () => clearInterval(interval);
  }, [mouse]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* 底色 twilight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #E9EDF2 0%, #E6E2DD 40%, #EFE5DB 100%)"
        }}
      />

      {/* 云层 */}
      <Cloud color="#C9D7E0" size={1200} top="10%" left="15%" drift={drift} depth={20} duration={60}/>
      <Cloud color="#E4E1D9" size={1000} top="60%" left="55%" drift={drift} depth={40} duration={70}/>
      <Cloud color="#C3C4DA" size={1100} top="35%" left="35%" drift={drift} depth={30} duration={65}/>
      <Cloud color="#EFE5DB" size={900} top="75%" left="10%" drift={drift} depth={25} duration={55}/>

      {/* 柔光层 */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${60 + drift.x * 10}% ${40 + drift.y * 10}%,
            rgba(255,220,190,0.22),
            transparent 60%)
          `,
          animation: "glowBreath 70s ease-in-out infinite"
        }}
      />

      {/* subtle grain */}
      <div className="grain" />

      <style jsx>{`
        @keyframes breathing {
          0% { transform: scale(1); opacity: 0.42; }
          50% { transform: scale(1.05); opacity: 0.48; }
          100% { transform: scale(1); opacity: 0.42; }
        }

        @keyframes glowBreath {
          0% { opacity: 0.85; }
          50% { opacity: 1; }
          100% { opacity: 0.85; }
        }

        .grain {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
        }
      `}</style>
    </div>
  );
}

function Cloud({ color, size, top, left, drift, depth, duration }: any) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        transform: `translate(${drift.x * depth}px, ${drift.y * depth}px)`
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          background: color,
          borderRadius: "50%",
          filter: "blur(120px)",
          opacity: 0.45,
          animation: `breathing ${duration}s ease-in-out infinite`,
          mixBlendMode: "soft-light"
        }}
      />
    </div>
  );
}
