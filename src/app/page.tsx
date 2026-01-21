import { RolePanels } from "@/components/RolePanels";
import dynamic from "next/dynamic";

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

      {/* Experiences (scroll down). */}
      <section className="relative z-10 px-4 pb-16">
        <RolePanels />
      </section>

      {/* About me */}
      <section id="about" className="relative z-10 px-4 py-16">
        <div className="mx-auto w-[85vw] max-w-5xl">
          <h2 className="text-2xl font-semibold mb-4">About me</h2>
          <p className="text-base leading-relaxed text-slate-800">I build products by combining user empathy with pragmatic delivery. I enjoy working across design, data and engineering to create delightful, reliable experiences.</p>
        </div>
      </section>

      {/* Let's talk / contact */}
      <section id="contact" className="relative z-10 px-4 py-16">
        <div className="mx-auto w-[85vw] max-w-5xl">
          <h2 className="text-2xl font-semibold mb-4">Let's talk</h2>
          <p className="text-base leading-relaxed text-slate-800">Interested in collaborating or have a question? Email me at <a href="mailto:hello@example.com" className="underline">hello@example.com</a>.</p>
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


