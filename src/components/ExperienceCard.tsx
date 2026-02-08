"use client";

import Link from "next/link";
import SketchCard from "./SketchCard";

type ImageItem = {
  src: string;
  alt: string;
};

type ExperienceCardProps = {
  title1: string;
  desc1: string;
  title2?: string;
  desc2?: string;
  images: ImageItem[];
  logo: string;
  role: string;
  year: string;
  link?: string;
  learnMoreText?: string;
};

export default function ExperienceCard(props: ExperienceCardProps) {
  const {
    title1,
    desc1,
    title2,
    desc2,
    images,
    logo,
    role,
    year,
    link,
    learnMoreText = "Learn more",
  } = props;

  return (
    <SketchCard fillParent>
      <div className="flex flex-col gap-8 md:flex-row-reverse">
        {/* Images */}
        <div className="hidden md:flex flex-shrink-0 flex-col gap-4">
          {images.map((img, i) => (
            <div key={i} className="w-[256px] h-[176px] flex items-center justify-center">
              <img
                src={img.src}
                alt={img.alt}
                className="max-w-full max-h-full object-contain rounded"
              />
            </div>
          ))}
        </div>

        {/* Text */}
        <div className="flex-1 text-sm md:text-base">
          <h3 className="text-xl font-semibold text-[#252525]">{title1}</h3>

          <p className="mt-3 leading-relaxed text-slate-800">{desc1}</p>

          {images[0] && (
            <div className="mt-4 flex justify-center md:hidden">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="max-w-[260px] w-full object-contain rounded"
              />
            </div>
          )}

          {title2 && (
            <>
              <h3 className="text-xl font-semibold mt-6 text-[#252525]">
                {title2}
              </h3>

              <p className="mt-3 leading-relaxed text-slate-800">{desc2}</p>

              {images[1] && (
                <div className="mt-4 flex justify-center md:hidden">
                  <img
                    src={images[1].src}
                    alt={images[1].alt}
                    className="max-w-[260px] w-full object-contain rounded"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-[22px]" />
          <span className="text-lg font-semibold text-black">{role}</span>
          <span className="text-base font-semibold text-black">{year}</span>
        </div>

        {link && (
          <Link href={link}>
            <button className="px-4 py-2 rounded-full border-2 border-black bg-white/70 backdrop-blur-sm text-black transition-all duration-150 hover:bg-black hover:text-white hover:scale-[1.05] active:scale-[0.95]">
              {learnMoreText}
            </button>
          </Link>
        )}
      </div>
    </SketchCard>
  );
}
