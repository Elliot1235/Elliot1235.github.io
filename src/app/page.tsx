import dynamic from "next/dynamic";
import Link from "next/link";

const AnimatedSvgBackground = dynamic(() => import("@/components/AnimatedSvgBackground"), { ssr: false });
const StickyName = dynamic(() => import("@/components/StickyName"), { ssr: false });
const GoToTop = dynamic(() => import("@/components/GoToTop"), { ssr: false });

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

      {/* Me Experience (uploaded content) */}
      <section id="me-experience" className="relative z-10 px-4 py-16">
        <div className="mx-auto w-[92vw] max-w-5xl">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--accent-color-dark, #d2cfc6)' }}>My experience</h2>
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <div className="w-64 h-44 bg-slate-200/90 rounded-lg flex items-center justify-center text-slate-500 text-sm" aria-hidden>
                占位图
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold">Software Leadership (App v3.1.2 → v3.3.0)</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-800">Led the software team through multiple release cycles, driving the product from version 3.1.2 to 3.3.0. Guided by user needs, I owned solution design for IoT devices within a DevOps-driven development loop. I partnered closely with UI/UX designers to improve usability and reduce the learning curve, and worked cross-functionally with embedded and frontend engineers to maximize delivery efficiency and overall product quality.</p>

              <h3 className="text-xl font-semibold mt-6">New Product Development – DWARF Mini</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-800">Led the product definition of DWARF Mini, the world&apos;s smallest smart telescope. I conducted user research to identify core pain points, proposed feature improvements, and balanced product positioning across the existing lineup. Key contributions included features such as a built-in dark filter and a 360° horizontal rotation mechanism.</p>

              <div className="mt-6">
                <Link href="/dwarf-mini" className="inline-block rounded-md bg-slate-900 text-white px-4 py-2 hover:opacity-95">Learn more</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About me */}
      <section id="about" className="relative z-10 px-4 py-16">
        <div className="mx-auto w-[85vw] max-w-5xl">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--accent-color-dark, #d2cfc6)' }}>About me</h2>
          <p className="text-base leading-relaxed text-slate-800">I build products by combining user empathy with pragmatic delivery. I enjoy working across design, data and engineering to create delightful, reliable experiences.</p>
        </div>
      </section>

        {/* Let&apos;s talk / contact */}
        <section id="contact" className="relative z-10 px-4 py-16">
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
      <script type="module">
        {/* placeholder: GoToTop is client component imported below */}
      </script>

      <GoToTop />
    </main>
  );
}


