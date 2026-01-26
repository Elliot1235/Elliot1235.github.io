"use client";
import React, { useEffect, useState } from "react";

export default function FaceGallery(): JSX.Element {
  const [images, setImages] = useState<string[] | null>(null);

  useEffect(() => {
    let mounted = true;

    async function probe() {
      const found: string[] = [];
      const maxCandidates = 12;
      const exts = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];

      for (let i = 1; i <= maxCandidates; i++) {
        if (found.length >= 7) break;
        for (const ext of exts) {
          const url = `/images/gallery/face${i}.${ext}`;
          try {
            const res = await fetch(url, { method: "HEAD" });
            if (res.ok) {
              found.push(url);
              break;
            }
          } catch (e) {
            // ignore
          }
        }
      }

      // If no gallery images found, fall back to the site's default image repeated.
      if (found.length === 0) {
        const fallback = Array.from({ length: 7 }, () => "/images/default.JPG");
        if (mounted) setImages(fallback);
        return;
      }

      // If fewer than 7 found, fill the remainder with the default.
      while (found.length < 7) found.push("/images/default.JPG");

      if (mounted) setImages(found.slice(0, 7));
    }

    probe();
    return () => {
      mounted = false;
    };
  }, []);

  const imgs = images ?? Array.from({ length: 7 }, () => "/images/default.JPG");

  return (
    <section id="put-a-face" className="relative z-10 px-4 py-12">
      <div className="mx-auto w-[85vw] max-w-5xl">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--accent-color-dark, #d2cfc6)' }}>Put a face to the name</h2>

        <div className="face-grid">
          <div className="face-item" data-area="p1">
            <img src={imgs[0]} alt="photo-1" />
          </div>
          <div className="face-item" data-area="p2">
            <img src={imgs[1]} alt="photo-2" />
          </div>
          <div className="face-item" data-area="p3">
            <img src={imgs[2]} alt="photo-3" />
          </div>
          <div className="face-item" data-area="p4">
            <img src={imgs[3]} alt="photo-4" />
          </div>
          <div className="face-item" data-area="p5">
            <img src={imgs[4]} alt="photo-5" />
          </div>
          <div className="face-item" data-area="p6">
            <img src={imgs[5]} alt="photo-6" />
          </div>
          <div className="face-item" data-area="p7">
            <img src={imgs[6]} alt="photo-7" />
          </div>
        </div>

        <style>{`
          .face-grid {
            display: grid;
            grid-template-columns: 1fr 1.6fr 1.6fr;
            grid-template-rows: repeat(3, minmax(120px, 1fr));
            grid-template-areas:
              "p1 p2 p2"
              "p3 p4 p5"
              "p3 p6 p7";
            gap: 16px;
          }

          .face-item {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .face-item img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0px;
          }

          .face-item[data-area="p1"] { grid-area: p1; }
          .face-item[data-area="p2"] { grid-area: p2; }
          .face-item[data-area="p3"] { grid-area: p3; }
          .face-item[data-area="p4"] { grid-area: p4; }
          .face-item[data-area="p5"] { grid-area: p5; }
          .face-item[data-area="p6"] { grid-area: p6; }
          .face-item[data-area="p7"] { grid-area: p7; }

          /* Responsive: stack into two columns on narrow screens */
          @media (max-width: 768px) {
            .face-grid {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: repeat(4, minmax(120px, 1fr));
              grid-template-areas:
                "p1 p2"
                "p3 p4"
                "p5 p6"
                "p7 p7";
            }
          }
        `}</style>
      </div>
    </section>
  );
}
