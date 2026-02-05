"use client";

import React, { useState } from "react";

/* -----------------------------
   Types
------------------------------ */

type Section = {
  title: string;
  text: string;
  image?: string;
  video?: string;
  custom?: React.ReactNode;  
};

type Feature = {
  tag: string;
  sections: Section[];
};

/* -----------------------------
   Data
------------------------------ */

const FEATURES: Feature[] = [
  {
    tag: "Shooting interface 3.0",
    sections: [
      {
        title: "A redesigned shooting experience",
        text:
          "Led the redesign of the Shooting Interface 3.0, focusing on clarity, faster access to core actions, and reduced cognitive load during observation sessions.",
        image: "/images/image1.1.png",
      },
    ],
  },
  {
    tag: "Mosaic",
    sections: [
      {
        title: "Wide-field imaging through smart mosaics",
        text:
          "Enabled mosaic shooting to capture large celestial targets by intelligently stitching multiple frames while minimizing total shooting time.",
        image: "/images/image_mosaic.png",
      },
    ],
  },
  {
    tag: "Dark frame 2.0",
    sections: [
      {
        title: "Smarter calibration with Dark Frame 2.0",
        text:
          "Upgraded the dark frame calibration workflow to reduce noise more efficiently and improve usability for beginners.",
        image: "/images/image_dark.png",
      },
    ],
  },
  {
    tag: "Post-processing",
    sections: [
      {
        title: "Seamless stacking across multiple nights",
        text:
          "Introduced multi-night stacking to allow users to accumulate exposure over different observation sessions, improving final image quality without requiring a single long shoot.",
        image: "/images/image1.3.png",
      },
      {
        title: "Flexible watermark system",
        text:
          "Designed a local-rendered watermarking system integrated into the post-processing pipeline, enabling flexible personalization and future extensibility.",
        image: "/images/image1.2.png",
      },
    ],
  },
  {
    tag: "Equatorial alignment",
    sections: [
      {
        title: "Equation mode for precise calibration",
        text:
          "Improved EQ alignment workflow to make polar alignment faster and easier for beginners while keeping precision for experienced users.",
        video: "/images/EQ.mp4", // ✅ video instead of image
      },
    ],
  },
  {
    tag: "DWARF mini",
    sections: [
      {
        title: "Defining the DWARF mini experience",
        text:
          "Contributed to the product definition and experience design of DWARF mini, focusing on portability, approachability, and cost efficiency.",
        image: "/images/image_mini_0.png",
      },
      {
        title: "Defining the DWARF mini experience",
        text:
          "Contributed to the product definition and experience design of DWARF mini, focusing on portability, approachability, and cost efficiency.",
        image: "/images/image_mini_1.png",
      },
      {
        title: "Defining the DWARF mini experience",
        text:
          "Contributed to the product definition and experience design of DWARF mini, focusing on portability, approachability, and cost efficiency.",
        image: "/images/image_mini_2.png",
      },
    ],
  },
  {
    tag: "And more",
    sections: [
    {
      custom: (
        <div>
          <h2
            className="text-2xl font-semibold mb-4 mt-6"
            style={{ color: "#000000" }}
          >
            Interested in working together? Let’s talk.
          </h2>



          <p className="text-base leading-relaxed text-slate-800 mt-3">
  Feel free to reach out via{" "}
  <a
    href="https://www.linkedin.com/in/elliot-luo-7181ab254/"
    target="_blank"
    rel="noreferrer"
    className="font-bold no-underline inline-flex items-center gap-1 group"
    aria-label="Open LinkedIn in a new tab"
  >
    <span className="transition-transform transform group-hover:scale-[1.05]">
      LinkedIn
    </span>

    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: "1.2rem", height: "1.2rem" }}
    >
      <path
        d="M6 18 L18 6"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 6 H18 V13"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </a>
</p>





          <p className="text-base leading-relaxed text-slate-800 mt-3">
            or{" "}
            <a
              href="mailto:haoluo2000@gmail.com"
              className="font-bold no-underline"
            >
              haoluo2000@gmail.com
            </a>
          </p>
          <img
            src="/images/art1.jpg"
            className="mt-8"
          />
          <p className="text-sm text-slate-600 mt-2 text-right">
  By みなはむ (mi na ha mu).
</p>
        </div>
        
      ),
    },
  ],
  },
];

/* -----------------------------
   Page component
------------------------------ */

export default function DwarfMiniPage() {
  const [selected, setSelected] = useState(0);

  const current = FEATURES[selected];

  const goNext = () => {
    if (selected < FEATURES.length - 1) {
      setSelected((s) => s + 1);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header
        className="relative flex items-center justify-center w-full h-56 md:h-72"
        style={{
          backgroundImage: "url('/images/header1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl md:text-4xl text-white">
          Product manager at DWARFLAB
        </h1>
      </header>

      {/* Content */}
      <section
        className="relative z-10 px-4 py-10"
        style={{ backgroundColor: "rgb(246,246,246)" }}
      >
        <div className="mx-auto w-[92vw] max-w-5xl">
          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-10">
            {FEATURES.map((item, idx) => {
              const isSelected = idx === selected;

              return (
                <button
                  key={item.tag}
                  onClick={() => setSelected(idx)}
                  className="
                    px-4 py-2
                    rounded-full
                    border-2 border-black
                    text-sm
                    transition-all duration-150
                    hover:scale-[1.05]
                    active:scale-[0.95]
                  "
                  style={{
                    backgroundColor: isSelected
                      ? "black"
                      : "rgb(246,246,246)",
                    color: isSelected ? "white" : "black",
                  }}
                >
                  {item.tag}
                </button>
              );
            })}
          </div>

          {/* Sections */}
          <div className="mx-auto max-w-[680px] text-left">
            <div className="space-y-14">
  {current.sections.map((section, idx) => (
    <div key={idx} className="space-y-4">

      {/* Custom content */}
      {section.custom && section.custom}

      {/* Normal title */}
      {section.title && (
        <h3 className="text-lg font-semibold">{section.title}</h3>
      )}

      {/* Text */}
      {section.text && (
        <p className="text-base leading-relaxed text-slate-800">
          {section.text}
        </p>
      )}

      {/* Image */}
      {section.image && (
        <div className="w-full flex justify-center">
          <img
            src={section.image}
            alt={section.title}
            className="max-w-full max-h-[420px] object-contain rounded-md shadow-md"
          />
        </div>
      )}

      {/* Video */}
      {section.video && (
        <div className="w-full flex justify-center">
          <video
            src={section.video}
            autoPlay
            loop
            muted
            playsInline
            className="max-w-full max-h-[420px] object-contain rounded-md shadow-md"
          />
        </div>
      )}
    </div>
  ))}
</div>


            {/* Next button */}
            {selected < FEATURES.length - 1 && (
              <div className="mt-14 flex justify-end">
                <button
                  onClick={goNext}
                  aria-label="Next"
                  className="
                    px-4 py-2
                    rounded-full
                    border-2 border-black
                    bg-[rgb(246,246,246)]
                    text-black
                    transition-all duration-150
                    hover:bg-black hover:text-white hover:scale-[1.05]
                    active:scale-[0.95]
                    focus:outline-none
                  "
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
