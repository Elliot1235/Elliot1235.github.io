"use client";

import { useEffect, useState } from "react";

export default function SoftNebulaBackground() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  // 鼠标监听
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

  // 漂移惯性
  useEffect(() => {
    const interval = setInterval(() => {
      setDrift(prev => ({
        x: prev.x + (mouse.x - 0.5 - prev.x) * 0.03,
        y: prev.y + (mouse.y - 0.5 - prev.y) * 0.03,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [mouse]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* Impressionist sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 60% 30%, #E7C7A8 0%, transparent 35%),
            radial-gradient(circle at 30% 20%, #C9D7E0 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, #9FB7C9 0%, transparent 60%),
            #ECEAE6
          `,
        }}
      />

      {/* 色块云层 */}
      <PaintCloud color="#C9D7E0" size={1400} top="5%" left="10%" drift={drift} depth={20} duration={60}/>
      <PaintCloud color="#E4E1D9" size={1200} top="55%" left="60%" drift={drift} depth={40} duration={70}/>
      <PaintCloud color="#C3C4DA" size={1300} top="35%" left="30%" drift={drift} depth={30} duration={65}/>
      <PaintCloud color="#EFE5DB" size={1100} top="70%" left="5%" drift={drift} depth={25} duration={55}/>

      {/* 日出暖光 */}
      <div
        className="absolute inset-0 glow"
        style={{
          background: `
            radial-gradient(circle at ${65 + drift.x * 15}% ${40 + drift.y * 15}%,
            rgba(231,199,168,0.25),
            transparent 60%)
          `,
        }}
      />

      {/* 笔触纹理 */}
      <div className="brushTexture" />

      <style jsx>{`
        .paintCloud {
          position: absolute;
          border-radius: 45% 55% 60% 40% / 55% 45% 60% 40%;
          filter: blur(120px);
          opacity: 0.45;
          animation: breathing ease-in-out infinite;
        }

        @keyframes breathing {
          0% { transform: scale(1); opacity: 0.42; }
          50% { transform: scale(1.04); opacity: 0.47; }
          100% { transform: scale(1); opacity: 0.42; }
        }

        .glow {
          animation: glowBreath 70s ease-in-out infinite;
        }

        @keyframes glowBreath {
          0% { opacity: 0.9; }
          50% { opacity: 1; }
          100% { opacity: 0.9; }
        }

        /* 关键：笔触纹理 */
        .brushTexture {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }
      `}</style>
    </div>
  );
}

function PaintCloud({ color, size, top, left, drift, depth, duration }: any) {
  return (
    <div
      className="paintCloud"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: color,
        transform: `translate(${drift.x * depth}px, ${drift.y * depth}px)`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}
