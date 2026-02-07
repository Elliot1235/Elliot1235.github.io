



"use client";

import React, { useState } from "react";

// 简体中文翻译的 FEATURES（用于语言切换）
const FEATURES_ZH: Feature[] = [
  {
    tag: "拍摄界面 3.0",
    sections: [
      {
        custom: (
          <div>
            <h4 className="text-2xl font-semibold mb-4 mt-10" style={{ color: "#000000" }}>
              重新设计的拍摄体验
            </h4>

            <p className="text-base leading-relaxed text-slate-800 mt-3"><strong>背景：</strong></p>
            <p className="text-base leading-relaxed text-slate-800 mt-3">我加入 DWARFLAB 后很快发现：应用很难上手。天文摄影本身就有学习门槛，但产品本身让这一过程更艰难。界面复杂、操作不容错，初学者常常不知道从何开始，导致犹豫和重复错误，并产生强烈的挫败感。用户反馈长期指向同一问题——产品强大但令人望而步。</p>
            <p className="text-base leading-relaxed text-slate-800 mt-3"><strong>方法：</strong></p>
            <p className="text-base leading-relaxed text-slate-800 mt-3">我们从真实使用场景出发，而不是现有功能结构。目标是让核心操作更容易抵达，减少不必要的决策，将高级功能与日常拍摄任务分离。最终我们对拍摄界面进行了整体重构，既改变了视觉，也重塑了交互逻辑。</p>
            <p className="text-base leading-relaxed text-slate-800 mt-3"><strong>影响：</strong></p>
            <p className="text-base leading-relaxed text-slate-800 mt-3">新结构让系统更易理解与导航。核心操作更直接，高级选项被清晰隔离，整体流程更轻量直观。初学者不会被压垮，进阶用户仍能高效工作。</p>
            <img src="/images/image1.1.png" alt="Shooting Interface 3.0" className="mt-4 rounded-md shadow-md" />
            <img src="/images/image1.1.1.png" alt="Shooting Interface 3.0" className="mt-4 rounded-md shadow-md" />
          </div>
        ),
      },
    ],
  },
  {
    tag: "暗帧 2.0",
    sections: [
      {
        custom: (
          <div>
            <h4 className="text-2xl font-semibold mb-4 mt-10" style={{ color: "#000000" }}>一个独立的高级功能模块</h4>
            <p className="text-base leading-relaxed text-slate-800 mt-3">这是我们如何降低用户认知负担的具体示例。旧的暗帧与常规拍摄共用同一启动按钮，周围混杂许多无关控件，导致逻辑难以理解。重设计后暗帧成为独立模块，更清晰易用且更容易维护。</p>
            <img src="/images/image_dark.png" alt="Dark frame" className="mt-4 rounded-md shadow-md" />
          </div>
        ),
      },
    ],
  },
  {
    tag: "马赛克",
    sections: [
      {
        custom: (
          <div>
            <h4 className="text-2xl font-semibold mb-4 mt-10" style={{ color: "#000000" }}>折衷并非终点</h4>
            <p className="text-base leading-relaxed text-slate-800 mt-3">与不同利益相关者合作帮助我构建更好的解决方案。Astro Mosaic 是我第一个完全独立负责的产品，我认真倾听算法工程师、软件工程师与 UI 设计师的意见，并调整方向以保证按时交付。</p>
            <img src="/images/image_mosaic.png" alt="Mosaic" className="max-w-full max-h-[420px] object-contain rounded-md shadow-md mx-auto block" />
          </div>
        ),
      },
    ],
  },
  {
    tag: "后期处理",
    sections: [
      {
        title: "跨夜无缝叠加",
        text: "引入跨夜叠加，允许用户在不同观测会话中累积曝光，从而在不依赖一次长时间拍摄的情况下提升最终图像质量。",
        image: "/images/image1.3.png",
      },
      {
        title: "灵活的水印系统",
        text: "设计了一个集成在后处理流水线中的本地渲染水印系统，支持灵活个性化与未来扩展。",
        image: "/images/image1.2.png",
      },
    ],
  },
  {
    tag: "赤道仪对准",
    sections: [
      {
        title: "设置赤道仪模式的直观设计",
        text: "我们用 3D 动画引导替代了原有平面静态视觉，清晰展示需要旋转的部件和操作方式，大幅提升成功率。",
        video: "/images/EQ.mp4",
      },
    ],
  },
  {
    tag: "DWARF mini",
    sections: [
      {
        title: "定义 DWARF mini 的体验",
        text: "作为产品负责人之一，我参与了这款小型便携产品的产品定义与体验设计，聚焦便携性、亲和力与成本效率。我们有意去除高端配置，引入更适合初学者的特性，同时强调耐用性与可靠性，打造世界上最小的智能望远镜。",
        image: "/images/image_mini_0.png",
      },
      {
        text: "我们引入了 360° 旋转自由，消除了跟踪盲区并移除了由用户放置引起的限制。",
        image: "/images/image_mini_1.png",
      },
      {
        text: "集成内置暗帧滤镜，自动切换并拍摄暗帧，让复杂概念在日常使用中变得无感且轻松。",
        image: "/images/image_mini_2.png",
      },
    ],
  },
  {
    tag: "更多",
    sections: [
      {
        custom: (
          <div>
            <h4 className="text-2xl font-semibold mb-4 mt-10" style={{ color: "#000000" }}>想一起合作？聊聊吧。</h4>
            <p className="text-base leading-relaxed text-slate-800 mt-3">欢迎通过 <a href="https://www.linkedin.com/in/elliot-luo-7181ab254/" target="_blank" rel="noreferrer" className="font-bold no-underline inline-flex items-center gap-1 group">LinkedIn</a> 联系我。</p>
            <p className="text-base leading-relaxed text-slate-800 mt-3">或者发邮件至 <a href="mailto:haoluo2000@gmail.com" className="font-bold no-underline">haoluo2000@gmail.com</a></p>
          </div>
        ),
      },
    ],
  },
];

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
  const [lang, setLang] = useState<'en' | 'zh'>(() => {
    try {
      return localStorage.getItem('lang') === 'zh' ? 'zh' : 'en';
    } catch (e) {
      return 'en';
    }
  });

  const currentFeatures = lang === 'zh' ? FEATURES_ZH : FEATURES;
  const current = currentFeatures[selected];


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
          {lang === 'zh' ? 'DWARFLAB 的产品经理' : 'Product manager at DWARFLAB'}
        </h1>
      </header>

      {/* Content */}
      <section
        className="relative z-10 px-4 py-6"
        style={{ backgroundColor: "rgb(246,246,246)" }}
      >
        <div className="mx-auto w-[92vw] max-w-5xl">
          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {currentFeatures.map((item, idx) => {
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
            {selected < currentFeatures.length - 1 && (
              <div className="mt-14 flex justify-end">
                <button
                  onClick={goNext}
                  aria-label={lang === 'zh' ? '下一步' : 'Next'}
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
                  {lang === 'zh' ? '下一步' : 'Next'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
