"use client";

import React, { useEffect, useState } from "react";
import Background from "@/components/background";
import dynamic from "next/dynamic";
import Link from "next/link";

{/*const AnimatedSvgBackground = dynamic(() => import("@/components/AnimatedSvgBackground"), { ssr: false });  */}
const StickyName = dynamic(() => import("@/components/StickyName"), { ssr: false });
const GoToTop = dynamic(() => import("@/components/GoToTop"), { ssr: false });
const UpdatedOn = dynamic(() => import("@/components/UpdatedOn"), { ssr: false });
const FaceGallery = dynamic(() => import("@/components/FaceGallery"), { ssr: false });
const FlipCard = dynamic(() => import("@/components/FlipCard"), { ssr: false });
const ExperienceCard = dynamic(() => import("@/components/ExperienceCard"), { ssr: false });
const SoftNebulaBackground = dynamic(
  () => import("@/components/SoftNebulaBackground"),
  { ssr: false }
);



export default function HomePage() {
  // avoid reading localStorage during render to prevent hydration mismatch
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang');
      if (stored === 'zh') setLang('zh');
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {}
  }, [lang]);

  const t = {
    en: {
      heroIntro: 'Hey, my name is',
      experienceTitle: 'My experience',
      thingsTitle: 'Things I am good at',
      aboutTitle: 'About me',
      putFace: 'Put a face to the name',
      talkTitle: "Let's talk",
      emailPrefix: 'Or drop me an email at',
      learnMore: 'Learn more',
      skillsPara1: 'I break complex product problems into clear, actionable pieces.',
      skillsPara2: 'I translate ideas into logic teams can align on, from concept to execution.',
      skillsPara3: 'Collaboration matters, details matter, and a user-friendly experience is always the goal.'
    },
    zh: {
      heroIntro: '嗨，我的名字是',
      experienceTitle: '我的经历',
      thingsTitle: '我擅长的事',
      aboutTitle: '关于我',
      putFace: '给名字一个面孔',
      talkTitle: '聊聊吧',
      emailPrefix: '或者发邮件到',
      learnMore: '了解更多',
      skillsPara1: '我将复杂的产品问题拆解为清晰、可执行的任务。',
      skillsPara2: '我把想法转化为团队能达成一致的逻辑，从概念到执行。',
      skillsPara3: '协作重要，细节重要，用户友好的体验始终是目标。'
    }
  }[lang];

  // Auto-flip coordination for the three FlipCards in the skills section
  const cardRefs = React.useRef<Array<any>>([]);
  const autoRunningRef = React.useRef(false);
  const userInterruptedRef = React.useRef(false);

  function isFirstCardCentered(): boolean {
    const api = cardRefs.current[0];
    const el = api?.el;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const center = (rect.top + rect.bottom) / 2;
    const viewportCenter = window.innerHeight / 2;
    return Math.abs(center - viewportCenter) < 40; // 40px tolerance
  }

  React.useEffect(() => {
    let mounted = true;

    async function runSequence() {
      if (!mounted) return;
      autoRunningRef.current = true;
      userInterruptedRef.current = false;

      const perFlipDelay = 700; // ms (animation 600ms + small gap)

      // Check center once at start; proceed to flip all three unless interrupted
      if (!isFirstCardCentered()) {
        autoRunningRef.current = false;
        return;
      }

      for (let i = 0; i < 3; i++) {
        if (!mounted) break;
        if (userInterruptedRef.current) break;

        const api = cardRefs.current[i];
        if (!api) continue;
        // only flip if it's currently not flipped
        try {
          if (!api.isFlipped()) api.flip(true); // suppress callback so this isn't treated as user interaction
        } catch (e) {}

        // wait for flip animation to finish or for interruption
        await new Promise((res) => setTimeout(res, perFlipDelay));
      }

      autoRunningRef.current = false;
    }

    function checkAndMaybeStart() {
      // only start if not running and all are currently back
      if (autoRunningRef.current) return;
      const anyFlipped = cardRefs.current.some((api: any) => api?.isFlipped && api.isFlipped());
      if (anyFlipped) return;
      if (isFirstCardCentered()) {
        runSequence();
      }
    }

    checkAndMaybeStart();
    window.addEventListener("scroll", checkAndMaybeStart, { passive: true });
    window.addEventListener("resize", checkAndMaybeStart);

    return () => {
      mounted = false;
      window.removeEventListener("scroll", checkAndMaybeStart);
      window.removeEventListener("resize", checkAndMaybeStart);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <button
        aria-label={lang === 'en' ? 'Switch to Chinese' : '切换到英文'}
        onClick={() => setLang((l) => (l === 'en' ? 'zh' : 'en'))}
        style={{
          position: 'fixed',
          right: 16,
          top: 16,
          zIndex: 99999,
          width: 56,
          height: 56,
          borderRadius: 9999,
          border: 'none',
          background: 'rgba(255,255,255,0.2)',
          color: '#374151',
          boxShadow: '0 8px 24px rgba(2,6,23,0.12)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 140ms ease'
        }}
      >
        <span style={{ fontWeight: 700, userSelect: 'none' }}>{lang === 'en' ? '中' : 'EN'}</span>
      </button>
      {/* Fullscreen SVG background (layered radial gradients with subtle motion). 
      {/* <AnimatedSvgBackground />  */}

        <SoftNebulaBackground />
      


      {/* Hero (fullscreen). */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        <p className="text-lg font-medium text-slate-800/90 md:text-2xl" style={{ opacity: 'var(--hero-text-opacity, 1)', transition: 'opacity 160ms linear' }}>
          {t.heroIntro}
        </p>
        <div className="mt-6">{/* extra spacing between intro and name */}
          <StickyName className="text-5xl font-semibold tracking-tight text-slate-900 md:text-7xl">
            {lang === 'zh' ? '羅浩' : 'Elliot Luo'}
          </StickyName>
        </div>

        <div className="mt-16 max-w-5xl text-xl leading-relaxed text-slate-900 md:text-2xl" style={{ opacity: 'var(--hero-text-opacity, 1)', transition: 'opacity 160ms linear' }}>
          {lang === 'zh' ? (
            <>
              <p>我是一个在用户需求与交付之间寻找平衡的<span style={{ color: 'var(--accent-color-dark, #E2A391)', fontWeight: 600 }}>产品经理</span>。</p>
              <p className="mt-6">我的目标是设计让用户感觉愉悦的产品，体验在软件和硬件上都能<span style={{ color: 'var(--accent-color-dark, #E2A391)', fontWeight: 600 }}>无摩擦</span>且<span style={{ color: 'var(--accent-color-dark, #E2A391)', fontWeight: 600 }}>直观</span>。</p>
            </>
          ) : (
            <>
              <p>I am a <span style={{ color: 'var(--accent-color-dark, #E2A391)', fontWeight: 600 }}>product manager</span> who balances user needs with delivery.</p>
              <p className="mt-6">My goal is to design products that feel pleasant to users, where the experience is <span style={{ color: 'var(--accent-color-dark, #E2A391)', fontWeight: 600 }}>frictionless</span> <span style={{ color: 'var(--accent-color-dark, #E2A391)', fontWeight: 600 }}>and</span> <span style={{ color: 'var(--accent-color-dark, #E2A391)', fontWeight: 600 }}>intuitive</span> across both software and hardware.</p>
            </>
          )}
        </div>
      </section>

      





      {/* My experience */}
<section id="me-experience" className="relative z-10 px-4 py-8">
  <div className="mx-auto w-[92vw] max-w-5xl">

    <h2
      className="text-3xl font-semibold mb-8"
      style={{ color: "var(--accent-color-dark, #E2A391)" }}
      id="experience-title"
    >
      {t.experienceTitle}
    </h2>

    <div className="space-y-8">

      {/* Experience 1 */}
      <ExperienceCard
        title1={lang === 'zh' ? '软件领导 (App v3.1.2 → v3.3.0)' : 'Software Leadership (App v3.1.2 → v3.3.0)'}
        desc1={lang === 'zh' ? '带领软件团队完成多个发布周期，将产品从 v3.1.2 推进到 v3.3.0。以用户需求为导向，我负责物联网设备的解决方案设计，在 DevOps 驱动的开发循环中与团队协作。我与 UI/UX 设计师紧密合作以提升可用性并减少学习成本，同时与嵌入式与前端工程师跨职能协作以最大化交付效率和产品质量。' : 'Led the software team through multiple release cycles, driving the product from version 3.1.2 to 3.3.0. Guided by user needs, I owned solution design for IoT devices within a DevOps-driven development loop. I partnered closely with UI/UX designers to improve usability and reduce the learning curve, and worked cross-functionally with embedded and frontend engineers to maximize delivery efficiency and overall product quality.'}
        title2={lang === 'zh' ? '新产品开发 – DWARF Mini' : 'New Product Development – DWARF Mini'}
        desc2={lang === 'zh' ? '负责 DWARF Mini 的产品定义，这是一台全球最小的智能望远镜。我进行了用户研究识别核心痛点，提出功能改进，并在现有产品线中平衡产品定位。主要贡献包括内置暗滤镜和 360° 水平旋转机制等功能。' : 'Led the product definition of DWARF Mini, the world\'s smallest smart telescope. I conducted user research to identify core pain points, proposed feature improvements, and balanced product positioning across the existing lineup. Key contributions included features such as a built-in dark filter and a 360° horizontal rotation mechanism.'}
        images={[
          { src: "/images/phone.png", alt: "phone" },
          { src: "/images/dwarfmini.png", alt: "dwarfmini" }
        ]}
        logo="/images/LOGODWARFLAB.svg"
        role={lang === 'zh' ? '产品经理' : 'Product Manager'}
        year="2024–2025"
        link="/DWARFLAB"
        learnMoreText={t.learnMore}
      />

      {/* Experience 2 */}
      <ExperienceCard
        title1={lang === 'zh' ? '低代码平台的应用研究' : 'Applied Research on Low-Code Platforms'}
        desc1={lang === 'zh' ? '设计了一个基于 LSP 的评估框架，依据 ISO/IEC 9126 从功能性、可用性和健壮性评估低代码平台。对 Mendix 和 OutSystems 进行了比较研究，结合性能测试和可用性分析，为基于证据的平台选择提供指导。' : 'Designed an LSP-based evaluation framework aligned with ISO/IEC 9126 to assess low-code platforms across functionality, usability, and robustness. Conducted a comparative study of Mendix and OutSystems, combining performance testing with usability analysis to provide evidence-based platform selection guidance.'}
        images={[
          { src: "/images/KPMG.png", alt: "KPMG" }
        ]}
        logo="/images/LOGOKPMG.svg"
        role={lang === 'zh' ? '研究实习生' : 'Research Intern'}
        year="2024"
      />

      {/* Experience 3 */}
      <ExperienceCard
        title1={lang === 'zh' ? 'ICT4D 项目 – 农业通信平台' : 'ICT4D Project – Agricultural Communication Platform'}
        desc1={lang === 'zh' ? '为布基纳法索的农民设计并原型化了一个使用功能手机出售林下非木材产品的通信平台。该项目探索了在低连接性和非智能手机约束下数字服务的可行性。' : 'Designed and prototyped a communication platform for farmers in Burkina Faso to sell non-timber forest products using feature phones. The project explored how digital services could work under low-connectivity and non-smartphone constraints.'}
        title2={''}
        desc2={lang === 'zh' ? '我负责系统设计与实现，创建 UML 与活动图，并为功能手机用户开发了基于 VoiceXML 的语音应用，同时构建了基于 Web 的信息平台。我使用 HTML、CSS、JavaScript 构建面向用户的界面，并使用 JSP、Servlet 与 MySQL 实现后端服务。' : 'I led system design and implementation, creating UML and activity diagrams and developing a VoiceXML-based voice application for feature phone users, alongside a web-based information platform. I built user-facing interfaces with HTML, CSS, and JavaScript, and implemented backend services using JSP, Servlet, and MySQL.'}
        images={[
          { src: "/images/ICT4D.png", alt: "ICT4D" }
        ]}
        logo="/images/LOGOICT4D.svg"
        role={lang === 'zh' ? '产品设计与工程（课程项目）' : 'Product Design & Engineering (Course Project)'}
        year="2023"
      />

    </div>
  </div>
</section>
















      
      {/* Things I am good at */}
      <section id="skills" className="relative z-10 px-4 py-16">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: 'var(--accent-color-dark, #E2A391)' }}>{t.thingsTitle}</h2>

          <div className="max-w-[880px]">
            <p className="text-base leading-relaxed text-slate-900">
              {t.skillsPara1}
              <br />{t.skillsPara2}
              <br />{t.skillsPara3}
            </p>
          </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-16">
          <FlipCard
            domApiRef={(api) => (cardRefs.current[0] = api)}
            frontSrc="/images/AI.png"
            backSrc="/images/Back1.png"
            alt="AI"
            onToggle={(next) => { if (autoRunningRef.current) userInterruptedRef.current = true; }}
          />

          <FlipCard
            domApiRef={(api) => (cardRefs.current[1] = api)}
            frontSrc="/images/Design.png"
            backSrc="/images/Back2.png"
            alt="Design"
            onToggle={(next) => { if (autoRunningRef.current) userInterruptedRef.current = true; }}
          />

          <FlipCard
            domApiRef={(api) => (cardRefs.current[2] = api)}
            frontSrc="/images/Coding.png"
            backSrc="/images/Back3.png"
            alt="Coding"
            onToggle={(next) => { if (autoRunningRef.current) userInterruptedRef.current = true; }}
          />
        </div>





        </div>
      </section>

      
      
      {/* About me */}
      <section id="about" className="relative z-10 px-4 py-16">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: 'var(--accent-color-dark, #E2A391)' }}>{lang === 'zh' ? '关于我' : 'About me'}</h2>

          <div className="mx-auto max-w-[680px]">
            <div className="text-slate-800 text-base leading-[1.75] space-y-6 text-center">
              {lang === 'zh' ? (
                <>
                  <p>2000 年出生，我伴随数字世界的快速崛起成长。从 Nokia 与 HTC 到 Apple、Amazon、YouTube，以及现在的生成式 AI，我见证了产品如何持续重塑日常生活。屏幕逐渐成为我们最常看的东西——有时比周围的世界还多。</p>

                  <p>我自 13 岁起对移动互联网着迷，会画自己的手机和操作系统，并在学习曲线阻碍时帮助他人上手设备。这种好奇心与解决问题的驱动力促使我学习计算机科学，并最终成为产品经理。</p>

                  <p>随着数字产品与日常生活日益融合，我的关注点发生了变化。我不再仅以屏幕时间或参与度衡量成功，而更关心产品带来的价值：</p>

                  <div className="mt-4 space-y-4 text-base text-slate-600">
                    <p>体验是否令人愉悦？</p>
                    <p>用户旅程是否直观？</p>
                    <p>它是否真正让生活更轻松或更美好？</p>
                  </div>

                  <p>展望未来，随着屏幕出现在更多场景，产品经理需要在技术、设计与人类直觉之间取得平衡。我希望创造那些对用户看似“无形”但影响深远的产品。</p>
                </>
              ) : (
                <>
                  <p>Born in 2000, I grew up alongside the rapid rise of the digital world. From Nokia and HTC to Apple, Amazon, YouTube, and now Generative AI, I’ve witnessed how products continuously reshape everyday life. Screens gradually became what we look at most—often more than the world around us.</p>

                  <p>Fascinated by the mobile internet, I sketched my own phones and operating systems at 13 and helped adults navigate devices when learning curves got in the way. That mix of curiosity and frustration led me to study computer science and eventually become a product manager.</p>

                  <p>As digital products became inseparable from daily life, my focus evolved. Rather than measuring success solely by screen time or engagement, I care more about the value a product brings:</p>

                  <div className="mt-4 space-y-4 text-base text-slate-600">
                    <p>Is the experience pleasant?</p>
                    <p>Does the user journey feel intuitive?</p>
                    <p>Does it genuinely make life easier or better?</p>
                  </div>

                  <p>Looking ahead, as screens appear in more places, the role of product managers becomes increasingly important—balancing technology, design, and human intuition. I hope to create products that feel invisible to users, yet meaningful in impact.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Put a face to the name (gallery) */}
      <FaceGallery lang={lang} />

        {/* Let&apos;s talk / contact */}
        <section id="contact" className="relative z-10 px-4 py-16">
          <div className="mx-auto w-[85vw] max-w-5xl">
                <h2 className="text-3xl font-semibold mb-4" style={{ color: 'var(--accent-color-dark, #E2A391)' }}>{t.talkTitle}</h2>
                <p className="text-base leading-relaxed text-slate-800">
                <a
                  href="https://www.linkedin.com/in/elliot-luo-7181ab254/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold no-underline inline-flex items-center gap-1 group"
                  aria-label="Open LinkedIn in a new tab"
                >
                  <span className="transition-transform transform group-hover:scale-[1.15]">LinkedIn</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    style={{ width: '1.2rem', height: '1.2rem' }}
                    className="inline-block"
                  >
                    <path d="M6 18 L18 6" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M11 6 H18 V13" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </a>
              </p>
              <p className="text-base leading-relaxed text-slate-800 mt-3">
                {lang === 'zh' ? '或者发邮件到' : 'Or drop me an email at'} <a href="mailto:haoluo2000@gmail.com" className="font-bold no-underline">haoluo2000@gmail.com</a>
              </p>
        </div>
      </section>

      {/* Go to top button */}
      {/* Client-only component */}
      <UpdatedOn lang={lang} />
      <script type="module">
        {/* placeholder: GoToTop is client component imported below */}
      </script>

      <GoToTop />
    </main>
  );
}


