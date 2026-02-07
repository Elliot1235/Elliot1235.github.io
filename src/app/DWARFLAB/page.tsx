



"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -----------------------------
   Types
------------------------------ */

type Section = {
  title?: string;
  text?: string;
  image?: string;
  video?: string;
  custom?: React.ReactNode;
};

type Feature = {
  tag: string;
  sections: Section[];
};

/* -----------------------------
   Data（你的 FEATURES 原样保留）
------------------------------ */

const FEATURES: Feature[] = [


  {
    tag: "Shooting interface 3.0",
    sections: [
      {
        custom: (
        <div>
          <h4
            className="text-2xl font-semibold mb-4 mt-10"
            style={{ color: "#000000" }}
          >
            A redesigned shooting experience
          </h4>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            <strong>Context:</strong> 
          </p>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            When I joined DWARFLAB, one thing became clear very quickly: the app was hard to learn. Astrophotography already has a natural learning barrier, but the product itself made it even harder. The interface was complex, the operations were unforgiving, and beginners often didn’t know where to start or what to do next. This usually led to hesitation, repeated mistakes, and a strong sense of frustration. Over time, user feedback kept pointing to the same feeling — the product was powerful, but intimidating and difficult to approach.
          </p>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            <strong>Approach:</strong> 
          </p>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            People often said the app was “not user-friendly,” but that description was vague and didn’t really explain the problem. To understand it properly, I went through the full user journey and mapped out the structure of the system. What I found was a deeply layered interface with long navigation paths and tightly connected features. Core actions were buried, advanced options were mixed with basic ones, and users had to think too much just to complete simple tasks.
          </p>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            Together with the product and design teams, we started from real usage scenarios rather than existing feature structures. The goal was to make core actions easier to reach, reduce unnecessary decision-making, and separate advanced capabilities from everyday shooting tasks. Instead of adding more guidance on top of a complex system, we focused on simplifying the structure itself. This process led to a full redesign of the shooting interface, not just in how it looked, but in how it worked.
          </p>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            <strong>Impact:</strong> 
          </p>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            The new structure made the system easier to understand and navigate. No third-level menus, core shooting actions became more direct, advanced features were clearly separated, and the overall flow felt lighter and more intuitive. Beginners could start without feeling overwhelmed, while experienced users could still work efficiently. The result is a shooting experience that is easier to learn, faster to operate, and structurally scalable for future evolution.
          </p>

          <img src="/images/image1.1.png" alt="Shooting Interface 3.0" className="mt-4 rounded-md shadow-md" />
          
          <img src="/images/image1.1.1.png" alt="Shooting Interface 3.0" className="mt-4 rounded-md shadow-md" />
        </div>
        ),
      },
    ],
  },
  
  

  {
    tag: "Dark frame 2.0",
    sections: [
      {
        custom: (
        <div>
          <h4
            className="text-2xl font-semibold mb-4 mt-10"
            style={{ color: "#000000" }}
          >
            A separated advanced feature
          </h4>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            This is a concrete example of how we reduced users’ cognitive demand. On the left side of the figure is the old dark-frame shooting interface. Dark-frame capture and normal astrophotography shared the same start button, surrounded by many unrelated controls and visual elements. This made the logic difficult for users to understand, and at the same time forced developers to handle complex states such as disabling irrelevant functions, managing conditional prompts, and maintaining edge-case logic.
          </p>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            On the right is the redesigned, standalone dark-frame module. It is clean, focused, and efficient, designed specifically for a single purpose. The interface adapts naturally to both portrait and landscape orientations. By separating it from the core shooting flow, the feature became easier to understand, easier to use, and easier to maintain—both for users and for the system itself.
          </p>

          <img src="/images/image_dark.png" alt="Shooting Interface 3.0" className="mt-4 rounded-md shadow-md" />
          
        </div>
        ),
      },
    ],
  },

        
        
  {
    tag: "Mosaic",
    sections: [
      {
        custom: (
        <div>
          <h4
            className="text-2xl font-semibold mb-4 mt-10"
            style={{ color: "#000000" }}
          >
            Compromise is not the finish line
          </h4>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            Working with different stakeholders has always helped me build better solutions. Collaboration brings perspective and balance. Astro Mosaic, a space-panorama style project, was my first fully independent product, and I took this seriously. I listened to many voices — from algorithm engineers, software engineers, and UI designers — and adjusted the product direction to ensure the project could be delivered on time.
          </p>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            The result wasn’t bad. The system worked, the project shipped, and everything was technically functional. But it was also unremarkable. There were small friction points everywhere, each solved with a temporary “patch.” The product was usable, but it didn’t feel complete.
          </p>

          <p className="text-base leading-relaxed text-slate-800 mt-3">
            These unresolved issues stayed with me. I kept reflecting on them until one day I remembered a requirement a software engineer had once called “impossible.” From his technical perspective, he was right. But from a product perspective, the conflict itself wasn’t real. The two features didn’t actually need to work at the same time — they only needed to appear available through the UI. By restructuring the interaction logic, the contradiction disappeared. That moment reshaped how I see compromise. I realized that compromise is sometimes not a solution, but a signal that the problem hasn’t been framed correctly.
          </p>

          <img src="/images/image_mosaic.png" alt="Shooting Interface 3.0" className="max-w-full max-h-[420px] object-contain rounded-md shadow-md mx-auto block" />
          
        </div>
        ),
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
        title: "Intuitive design for setting EQ mode",
        text:
          "We replaced the original flat, static visuals with a 3D animated guidance system to help users set up EQ mode. The old interface often confused users about what to rotate: whether to rotate the telescope body or the tripod, leading to hesitation and errors. The new animation shows exactly what to adjust and how to do it, making the operation intuitive and significantly improving the success rate of EQ mode setup.",
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
          "Beyond my role as a software product manager, I was also involved as one of the product owners of the new-generation compact product, DWARF mini. I contributed to its product definition and experience design, with a clear focus on portability, approachability, and cost efficiency. We intentionally removed high-end configurations and introduced more beginner-friendly features, while placing strong emphasis on durability and reliability, because making something small is often harder than making it big. This vision shaped The World’s Smallest Smart Telescope. ",
        image: "/images/image_mini_0.png",
      },
      {
        text:
          "We introduced 360° pivot freedom, eliminating tracking dead zones and removing constraints caused by user placement. ",
        image: "/images/image_mini_1.png",
      },
      {
        text:
          "We also integrated a built-in dark frame filter, an important astrophotography concept for reducing sensor color noise, allowing the system to automatically switch and capture dark frames without user awareness, making a complex concept invisible and effortless in everyday use.",
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
          <h4
            className="text-2xl font-semibold mb-4 mt-10"
            style={{ color: "#000000" }}
          >
            Interested in working together? Let’s talk.
          </h4>



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

    // scroll to top
    window.scrollTo({
      top: 0,
      behavior: "auto", 
    });
  }
};

  return (
    <main
      className="min-h-screen relative z-10"
      style={{ backgroundColor: "rgb(246,246,246)" }}
    >
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
        className="relative z-10 px-4 py-6"
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

          {/* Sections with animation */}
          <div className="mx-auto max-w-[680px] text-left">

            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="space-y-14">
                  {current.sections.map((section, idx) => (
                    <div key={idx} className="space-y-4">

                      {/* Custom content */}
                      {section.custom && section.custom}

                      {/* Title */}
                      {section.title && (
                        <h4 className="text-2xl font-semibold">
                          {section.title}
                        </h4>
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
              </motion.div>
            </AnimatePresence>

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
