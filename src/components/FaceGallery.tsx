"use client";
import React from "react";

export default function FaceGallery({ lang = 'en' }: { lang?: 'en' | 'zh' }): JSX.Element {
  const images = [
    {
      src: "/images/qiu.jpg",
      type: "qiu",
      caption: lang === 'zh' ? "与产品经理邱的产品迭代" : "Product iteration with Product Manager Qiu",
    },
    {
      src: "/images/matisse.jpg",
      type: "cover",
      caption: lang === 'zh' ? "向马蒂斯致敬" : "A tribute to Matisse",
    },
    {
      src: "/images/draw.png",
      type: "square",
      caption: lang === 'zh' ? "会议中的速写" : "Drawing in a meeting",
    },
    {
      src: "/images/Depot.JPG",
      type: "square",
      caption: lang === 'zh' ? "不断重新想象（Depot 博物馆）" : "Always reimagining (Depot Museum)",
    },
    {
      src: "/images/xiong.png",
      type: "square",
      caption: lang === 'zh' ? "与熊在 UI/UX 设计上紧密协作" : "Collaborating closely with Xiong on UI/UX design",
    },
    {
      src: "/images/Jumbo.jpg",
      type: "wide",
      caption: lang === 'zh' ? "曾在 Jumbo 超市担任理货员和收银员" : "Worked as a stock clerk and cashier at Jumbo supermarket",
    },
    {
      src: "/images/Sky.JPG",
      type: "wide",
      caption: lang === 'zh' ? "沉浸在用户环境中，带着同理心去设计" : "Immersing myself in the user’s environment and designing with empathy",
    },
  ];

  return (
    <section id="put-a-face" className="relative z-10 px-4 py-16">
      <div className="mx-auto w-[85vw] max-w-5xl">
        <h2
          className="text-3xl font-semibold mb-6"
          style={{ color: "var(--accent-color-dark, #E2A391)" }}
        >
          {lang === 'zh' ? '给名字一个面孔' : 'Put a face to the name'}
        </h2>

        <div className="face-grid">
          {/* Row 1 */}
          <div className="face-item p1">
            <div className="qiu-frame">
              <img src={images[0].src} alt="" />
              <span className="caption caption-qiu">
                {images[0].caption}
              </span>
            </div>
          </div>

          <div className="face-item p2">
            <img src={images[1].src} alt="" />
            <span className="caption">{images[1].caption}</span>
          </div>

          {/* Row 2 */}
          <div className="face-item p3">
            <img src={images[2].src} alt="" />
            <span className="caption">{images[2].caption}</span>
          </div>

          <div className="face-item p4">
            <img src={images[3].src} alt="" />
            <span className="caption">{images[3].caption}</span>
          </div>

          <div className="face-item p5">
            <img src={images[4].src} alt="" />
            <span className="caption">{images[4].caption}</span>
          </div>

          {/* Row 3 — full width */}
          <div className="face-row-wide p8">
            <div className="face-wide-item">
              <img src={images[5].src} alt="" />
              <span className="caption">{images[5].caption}</span>
            </div>
            <div className="face-wide-item">
              <img src={images[6].src} alt="" />
              <span className="caption">{images[6].caption}</span>
            </div>
          </div>
        </div>

        <style>{`
          /* ================= GRID ================= */
          .face-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-areas:
              "p1 p2 p2"
              "p3 p4 p5"
              "p8 p8 p8";
            gap: 16px;
          }

          .p1 { grid-area: p1; }
          .p2 { grid-area: p2; }
          .p3 { grid-area: p3; }
          .p4 { grid-area: p4; }
          .p5 { grid-area: p5; }
          .p8 { grid-area: p8; }

          /* ================= BASE ITEM ================= */
          .face-item {
            position: relative;
            width: 100%;
            overflow: hidden;
          }

          .face-item img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }

          /* ================= CAPTION ================= */
          .caption {
            position: absolute;
            right: 8px;
            bottom: 8px;
            padding: 6px 10px;
            font-size: 12px;
            line-height: 1;
            color: #111;
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(3px);
            border-radius: 1px;
            white-space: nowrap;
          }

          /* ================= QIU FRAME ================= */
          .qiu-frame {
            position: relative;
            background: rgb(243, 233, 221);

            /* paper-like padding */
            padding: 12px;
            padding-bottom: 20px;

            width: 100%;
            height: 100%;
            box-sizing: border-box;
          }

          .qiu-frame img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: contain;
            object-position: top center;
          }

          /* caption sits on the frame, not the image */
          .caption-qiu {
            right: 12px;
            bottom: 12px;
          }

          /* ================= SECOND ROW ================= */
          .p3,
          .p4,
          .p5 {
            aspect-ratio: 1 / 1;
          }

          /* ================= THIRD ROW ================= */
          .face-row-wide {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            width: 100%;
          }

          .face-wide-item {
            position: relative;
            aspect-ratio: 4 / 3;
            overflow: hidden;
          }

          .face-wide-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          /* ================= RESPONSIVE ================= */
          @media (max-width: 768px) {
            .face-grid {
              grid-template-columns: 1fr 1fr;
              grid-template-areas:
                "p1 p2"
                "p3 p4"
                "p5 p5"
                "p8 p8";
            }

            .face-row-wide {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
