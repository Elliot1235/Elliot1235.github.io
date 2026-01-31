import dynamic from "next/dynamic";
import Link from "next/link";

const AnimatedSvgBackground = dynamic(() => import("@/components/AnimatedSvgBackground"), { ssr: false });
const StickyName = dynamic(() => import("@/components/StickyName"), { ssr: false });
const GoToTop = dynamic(() => import("@/components/GoToTop"), { ssr: false });
const UpdatedOn = dynamic(() => import("@/components/UpdatedOn"), { ssr: false });
const FaceGallery = dynamic(() => import("@/components/FaceGallery"), { ssr: false });
const FlipCard = dynamic(() => import("@/components/FlipCard"), { ssr: false });

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Fullscreen SVG background (layered radial gradients with subtle motion). */}
      <AnimatedSvgBackground />

      {/* Hero (fullscreen). */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        <p className="text-lg font-medium text-slate-800/90 md:text-2xl" style={{ opacity: 'var(--hero-text-opacity, 1)', transition: 'opacity 160ms linear' }}>
          Hey, my name is
        </p>
        <div className="mt-6">{/* extra spacing between intro and name */}
          <StickyName className="text-5xl font-semibold tracking-tight text-slate-900 md:text-7xl">
            Elliot Luo
          </StickyName>
        </div>

        <div className="mt-16 max-w-5xl text-xl leading-relaxed text-slate-900 md:text-2xl" style={{ opacity: 'var(--hero-text-opacity, 1)', transition: 'opacity 160ms linear' }}>
          <p>
            I am a <span style={{ color: 'var(--accent-color-dark, #d2cfc6)', fontWeight: 600 }}>product manager</span> who balances user needs with delivery.
          </p>
          <p className="mt-6">
            My goal is to design products that feel pleasant to users, where the
            experience is <span style={{ color: 'var(--accent-color-dark, #d2cfc6)', fontWeight: 600 }}>frictionless</span> <span style={{ color: 'var(--accent-color-dark, #d2cfc6)', fontWeight: 600 }}>and</span> <span style={{ color: 'var(--accent-color-dark, #d2cfc6)', fontWeight: 600 }}>intuitive</span> across both software and hardware.
          </p>
        </div>
      </section>

      
      {/* My experience */}
      {/* My experience 1 */}
      <section id="me-experience" className="relative z-10 px-4 py-8">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <h2 id="experience-title" className="text-3xl font-semibold mb-8" style={{ color: 'var(--accent-color-dark, #d2cfc6)' }}>My experience</h2>

          <div style={{ background: 'rgba(93,93,93,0.2)', borderRadius: 10, padding: 28, position: 'relative' }}>
            <div className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-start">
              <div className="flex-shrink-0 flex flex-col gap-4">
                <div style={{ width: 256, height: 176, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/images/phone.png" alt="phone" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 6 }} />
                </div>
                <div style={{ width: 256, height: 176, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/images/dwarfmini.png" alt="DWARF Mini" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 6 }} />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold" style={{ color: '#252525'}}>Software Leadership (App v3.1.2 → v3.3.0)</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-800">Led the software team through multiple release cycles, driving the product from version 3.1.2 to 3.3.0. Guided by user needs, I owned solution design for IoT devices within a DevOps-driven development loop. I partnered closely with UI/UX designers to improve usability and reduce the learning curve, and worked cross-functionally with embedded and frontend engineers to maximize delivery efficiency and overall product quality.</p>

                <h3 className="text-xl font-semibold mt-6" style={{ color: '#252525'}}>New Product Development – DWARF Mini</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-800">Led the product definition of DWARF Mini, the world&apos;s smallest smart telescope. I conducted user research to identify core pain points, proposed feature improvements, and balanced product positioning across the existing lineup. Key contributions included features such as a built-in dark filter and a 360° horizontal rotation mechanism.</p>

                <div style={{ height: 48 }} />
              </div>
            </div>
            {/* bottom-left: logo + Product Manager */}
            <div style={{ position: 'absolute', left: 20, bottom: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
              <img src="/images/LOGODWARFLAB.svg" alt="Dwarf Lab" style={{ height: 18 }} />
              <span className="text-xl font-semibold" style={{ color: '#000000' }}>Product Manager</span>
              <span className="text-lg font-semibold" style={{ color: '#000000' }}>2024-2025</span>
            </div>

            {/* bottom-right: Learn more button */}
            <div style={{ position: 'absolute', right: 20, bottom: 14 }}>
              <Link href="/dwarf-mini">
                <button
                  aria-label="Learn more"
                  style={{
                    background: 'transparent',
                    color: '#374151',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: 12,
                    boxShadow: '0 8px 24px rgba(2,6,23,0.08)',
                    cursor: 'pointer'
                  }}
                >
                  Learn more
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* My experience 2 */}
      <section className="relative z-10 px-4 py-8">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <div style={{ background: 'rgba(93,93,93,0.2)', borderRadius: 10, padding: 28, position: 'relative' }}>
            <div className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-start">
              <div className="flex-shrink-0">
                <div style={{ width: 256, height: 176, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/images/KPMG.png" alt="KPMG" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 6 }} />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold" style={{ color: '#252525'}}>Applied Research on Low-Code Platforms</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-800">Designed an LSP-based evaluation framework aligned with ISO/IEC 9126 to assess low-code platforms across functionality, usability, and robustness. Conducted a comparative study of Mendix and OutSystems, combining performance testing with usability analysis to provide evidence-based platform selection guidance.</p>

                <div style={{ height: 48 }} />
              </div>
            </div>

            {/* bottom-left: KPMG logo + role */}
            <div style={{ position: 'absolute', left: 20, bottom: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
              <img src="/images/LOGOKPMG.svg" alt="KPMG" style={{ height: 30 }} />
              <span className="text-xl font-semibold" style={{ color: '#000000' }}>Research Intern</span>
              <span className="text-lg font-semibold" style={{ color: '#000000' }}>2024</span>
            </div>

            {/* bottom-right: Learn more button (transparent) */}
            <div style={{ position: 'absolute', right: 20, bottom: 14 }}>
              <button
                aria-label="Learn more"
                style={{
                  background: 'transparent',
                  color: '#374151',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: 12,
                  boxShadow: '0 8px 24px rgba(2,6,23,0.08)',
                  cursor: 'pointer'
                }}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* My experience 3 */}
      <section className="relative z-10 px-4 py-8">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <div style={{ background: 'rgba(93,93,93,0.2)', borderRadius: 10, padding: 28, position: 'relative' }}>
            <div className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-start">
              <div className="flex-shrink-0">
                <div style={{ width: 256, height: 280, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/images/ICT4D.png" alt="KPMG" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 6 }} />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold" style={{ color: '#252525'}}>ICT4D Project – Agricultural Communication Platform</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-800">Designed and prototyped a communication platform for farmers in Burkina Faso to sell non-timber forest products using feature phones. The project explored how digital services could work under low-connectivity and non-smartphone constraints.</p>

                <p className="mt-3 text-base leading-relaxed text-slate-800">I led system design and implementation, creating UML and activity diagrams and developing a VoiceXML-based voice application for feature phone users, alongside a web-based information platform. I built user-facing interfaces with HTML, CSS, and JavaScript, and implemented backend services using JSP, Servlet, and MySQL. The work followed a DevOps-style iteration loop covering design, testing, and deployment in a simulated production environment.</p>

                <div style={{ height: 48 }} />
              </div>
            </div>
            {/* bottom-left: KPMG logo + role */}
            <div style={{ position: 'absolute', left: 20, bottom: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
              <img src="/images/LOGOICT4D.svg" alt="Dwarf Lab" style={{ height: 40 }} />
              <span className="text-xl font-semibold" style={{ color: '#000000' }}>Product Design & Engineering (Course Project)</span>
              <span className="text-lg font-semibold" style={{ color: '#000000' }}>2023</span>
            </div>

            {/* bottom-right: Learn more button (transparent) */}
            <div style={{ position: 'absolute', right: 20, bottom: 14 }}>
              <button
                aria-label="Learn more"
                style={{
                  background: 'transparent',
                  color: '#374151',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: 12,
                  boxShadow: '0 8px 24px rgba(2,6,23,0.08)',
                  cursor: 'pointer'
                }}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
      
      
      
      {/* Things I am good at */}
      <section id="skills" className="relative z-10 px-4 py-16">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: 'var(--accent-color-dark, #d2cfc6)' }}>Things I am good at</h2>

          <div className="max-w-[880px]">
            <p className="text-base leading-relaxed text-slate-900">
              I break complex product problems into clear, actionable pieces.
              <br />I translate ideas into logic teams can align on, from concept to execution.
              <br />Collaboration matters, details matter, and a user-friendly experience is always the goal.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-16">
            <FlipCard frontSrc="/images/AI.png" alt="AI" />
            <FlipCard frontSrc="/images/Design.png" alt="Design" />
            <FlipCard frontSrc="/images/Coding.png" alt="Coding" />
          </div>



        </div>
      </section>

      
      
      {/* About me */}
      <section id="about" className="relative z-10 px-4 py-16">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: 'var(--accent-color-dark, #d2cfc6)' }}>About me</h2>

          <div className="mx-auto max-w-[680px]">
            <div className="text-slate-800 text-base leading-[1.75] space-y-6 text-center">
              <p>Born in 2000, I grew up alongside the rapid rise of the digital world. From Nokia and HTC to Apple, Amazon, YouTube, and now Generative AI, I’ve witnessed how products continuously reshape everyday life. Screens gradually became what we look at most—often more than the world around us.</p>

              <p>Fascinated by the mobile internet, I sketched my own phones and operating systems at 13 and helped adults navigate devices when learning curves got in the way. That mix of curiosity and frustration led me to study computer science and eventually become a product manager.</p>

              <p>As digital products became inseparable from daily life, my focus evolved. Rather than measuring success solely by screen time or engagement, I care more about the value a product brings:</p>

              <div className="mt-4 space-y-4 text-base text-slate-400">
                <p>Is the experience pleasant?</p>
                <p>Does the user journey feel intuitive?</p>
                <p>Does it genuinely make life easier or better?</p>
              </div>

              <p>Looking ahead, as screens appear in more places, the role of product managers becomes increasingly important—balancing technology, design, and human intuition. I hope to create products that feel invisible to users, yet meaningful in impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Put a face to the name (gallery) */}
      <FaceGallery />

        {/* Let&apos;s talk / contact */}
        <section id="contact" className="relative z-10 px-4 py-16">
          <div className="mx-auto w-[85vw] max-w-5xl">
              <h2 className="text-3xl font-semibold mb-4" style={{ color: 'var(--accent-color-dark, #d2cfc6)' }}>Let&apos;s talk</h2>
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
                Or drop me an email at <a href="mailto:haoluo2000@gmail.com" className="font-bold no-underline">haoluo2000@gmail.com</a>
              </p>
        </div>
      </section>

      {/* Go to top button */}
      {/* Client-only component */}
      <UpdatedOn />
      <script type="module">
        {/* placeholder: GoToTop is client component imported below */}
      </script>

      <GoToTop />
    </main>
  );
}


