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

  // 惯性漂移（云层跟随）
  useEffect(() => {
    const interval = setInterval(() => {
      setDrift(prev => ({
        x: prev.x + (mouse.x - 0.5 - prev.x) * 0.02,
        y: prev.y + (mouse.y - 0.5 - prev.y) * 0.02,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [mouse]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* Twilight base sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 70% 30%, #F3D6BF 0%, transparent 45%),
            radial-gradient(circle at 30% 20%, #C9D7E0 0%, transparent 55%),
            radial-gradient(circle at 50% 85%, #B7B9D8 0%, transparent 65%),
            #ECEAE6
          `,
        }}
      />

      {/* 云层 */}
      <PaintCloud color="#BFD3E6" size={1400} top="5%" left="10%" drift={drift} depth={20} duration={60}/>
      <PaintCloud color="#E8D6C6" size={1200} top="55%" left="60%" drift={drift} depth={35} duration={70}/>
      <PaintCloud color="#B7B9D8" size={1300} top="35%" left="30%" drift={drift} depth={28} duration={65}/>
      <PaintCloud color="#F2E4D6" size={1100} top="70%" left="5%" drift={drift} depth={24} duration={55}/>

      {/* 空气暖光 */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${65 + drift.x * 10}% ${40 + drift.y * 10}%,
            rgba(255,210,170,0.22),
            transparent 60%)
          `,
          mixBlendMode: "soft-light",
        }}
      />

      {/* subtle noise */}
      <div className="noiseTexture" />

      <style jsx>{`
        .cloud {
          position: absolute;
          border-radius: 45% 55% 60% 40% / 55% 45% 60% 40%;
          filter: blur(70px);
          opacity: 0.65;
          animation: breathing ease-in-out infinite;
          mix-blend-mode: soft-light;
        }

        @keyframes breathing {
          0% { transform: scale(1); }
          50% { transform: scale(1.035); }
          100% { transform: scale(1); }
        }

        .noiseTexture {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }
      `}</style>
    </div>
  );
}

function PaintCloud({ color, size, top, left, drift, depth, duration }: any) {
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
          opacity: 0.5,
          animation: `breathing ${duration}s ease-in-out infinite`
        }}
      />
    </div>
  );
}

