import dynamic from "next/dynamic";
import Link from "next/link";

const AnimatedSvgBackground = dynamic(() => import("@/components/AnimatedSvgBackground"), { ssr: false });
const StickyName = dynamic(() => import("@/components/StickyName"), { ssr: false });
const GoToTop = dynamic(() => import("@/components/GoToTop"), { ssr: false });
const UpdatedOn = dynamic(() => import("@/components/UpdatedOn"), { ssr: false });
const FaceGallery = dynamic(() => import("@/components/FaceGallery"), { ssr: false });

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

      {/* My experience 1 */}
      <section id="me-experience" className="relative z-10 px-4 py-[1.2rem]">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <h2 id="experience-title" className="text-2xl font-semibold mb-8" style={{ color: 'var(--accent-color-dark, #d2cfc6)' }}>My experience</h2>

          <div style={{ background: 'rgba(93,93,93,0.3)', borderRadius: 10, padding: 28, position: 'relative' }}>
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
                <h3 className="text-xl font-semibold">Software Leadership (App v3.1.2 → v3.3.0)</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-800">Led the software team through multiple release cycles, driving the product from version 3.1.2 to 3.3.0. Guided by user needs, I owned solution design for IoT devices within a DevOps-driven development loop. I partnered closely with UI/UX designers to improve usability and reduce the learning curve, and worked cross-functionally with embedded and frontend engineers to maximize delivery efficiency and overall product quality.</p>

                <h3 className="text-xl font-semibold mt-6">New Product Development – DWARF Mini</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-800">Led the product definition of DWARF Mini, the world&apos;s smallest smart telescope. I conducted user research to identify core pain points, proposed feature improvements, and balanced product positioning across the existing lineup. Key contributions included features such as a built-in dark filter and a 360° horizontal rotation mechanism.</p>

                <div style={{ height: 48 }} />
              </div>
            </div>
            {/* bottom-left: logo + Product Manager */}
            <div style={{ position: 'absolute', left: 20, bottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/images/LOGODWARFLAB.svg" alt="Dwarf Lab" style={{ height: 18 }} />
              <span className="text-xl font-semibold" style={{ color: '#374151' }}>Product Manager</span>
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
      <section className="relative z-10 px-4 py-[1.2rem]">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <div style={{ background: 'rgba(93,93,93,0.3)', borderRadius: 10, padding: 28, position: 'relative' }}>
            <div className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-start">
              <div className="flex-shrink-0">
                <div style={{ width: 256, height: 176, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/images/KPMG.png" alt="KPMG" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 6 }} />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold">Applied Research on Low-Code Platforms</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-800">Designed an LSP-based evaluation framework aligned with ISO/IEC 9126 to assess low-code platforms across functionality, usability, and robustness. Conducted a comparative study of Mendix and OutSystems, combining performance testing with usability analysis to provide evidence-based platform selection guidance.</p>

                <div style={{ height: 48 }} />
              </div>
            </div>

            {/* bottom-left: KPMG logo + role */}
            <div style={{ position: 'absolute', left: 20, bottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/images/LOGOKPMG.svg" alt="KPMG" style={{ height: 30 }} />
              <span className="text-xl font-semibold" style={{ color: '#374151' }}>Research Intern</span>
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
      <section className="relative z-10 px-4 py-[1.2rem]">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <div style={{ background: 'rgba(93,93,93,0.3)', borderRadius: 10, padding: 28, position: 'relative' }}>
            <div className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-start">
              <div className="flex-shrink-0">
                <div style={{ width: 256, height: 280, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/images/ICT4D.png" alt="KPMG" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 6 }} />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold">ICT4D Project – Agricultural Communication Platform</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-800">Designed and prototyped a communication platform for farmers in Burkina Faso to sell non-timber forest products using feature phones. The project explored how digital services could work under low-connectivity and non-smartphone constraints.</p>

                <p className="mt-3 text-base leading-relaxed text-slate-800">I led system design and implementation, creating UML and activity diagrams and developing a VoiceXML-based voice application for feature phone users, alongside a web-based information platform. I built user-facing interfaces with HTML, CSS, and JavaScript, and implemented backend services using JSP, Servlet, and MySQL. The work followed a DevOps-style iteration loop covering design, testing, and deployment in a simulated production environment.</p>

                <div style={{ height: 48 }} />
              </div>
            </div>
            {/* bottom-left: KPMG logo + role */}
            <div style={{ position: 'absolute', left: 20, bottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/images/LOGOICT4D.svg" alt="Dwarf Lab" style={{ height: 40 }} />
              <span className="text-xl font-semibold" style={{ color: '#374151' }}>Product Design & Engineering (Course Project)</span>
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
      <section id="about" className="relative z-10 px-4 py-16">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--accent-color-dark, #d2cfc6)' }}>About me</h2>

          <div className="mx-auto max-w-[680px]">
            <div className="text-slate-800 text-base leading-[1.75] space-y-6 text-center">
              <p>Born in 2000, I grew up alongside the rapid rise of the digital world. From Nokia and HTC to Apple, Amazon, YouTube, TikTok and AI, I witnessed the game changers that reshaped how we live, work, and connect. Screens gradually became the objects we look at most—often more than the world around us.</p>

              <p>Fascinated by the mobile internet from an early age, I drew my own phone and operating system on paper at 13. I helped adults navigate their devices when steep learning curves got in the way. That curiosity—and frustration—naturally led me to study computer science and eventually become a product manager.</p>

              <p>As digital products became inseparable from daily life, my focus evolved. Rather than measuring success solely by screen time or engagement, I care more about the value a product brings:</p>

              <div className="mt-4 space-y-4 text-sm text-slate-400">
                <p>Is the experience pleasant?</p>
                <p>Does the user journey feel intuitive?</p>
                <p>Does it genuinely make life easier or better?</p>
              </div>

              <p>Looking ahead, screens will continue to appear in more places, reshaping experiences through simplification or reinvention. In this process, the role of the product manager becomes increasingly important—balancing technology, design, and human intuition.</p>

              <p className="font-medium">I hope to create products that feel invisible to users, yet meaningful in impact—and I’d love to create something with you that truly reshapes the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Put a face to the name (gallery) */}
      <FaceGallery />

        {/* Let&apos;s talk / contact */}
        <section id="contact" className="relative z-10 px-4 pt-16 pb-32">
          <div className="mx-auto w-[85vw] max-w-5xl">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--accent-color-dark, #d2cfc6)' }}>Let&apos;s talk</h2>
              <p className="text-base leading-relaxed text-slate-800">
                <a href="https://www.linkedin.com/in/elliot-luo-7181ab254/" target="_blank" rel="noreferrer" className="underline">LinkedIn</a>
              </p>
              <p className="text-base leading-relaxed text-slate-800 mt-3">
                Or drop me an email at <a href="mailto:haoluo2000@gmail.com" className="underline">haoluo2000@gmail.com</a>
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


