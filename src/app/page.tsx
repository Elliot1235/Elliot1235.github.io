import { RolePanels } from "@/components/RolePanels";
import AnimatedSvgBackground from "@/components/AnimatedSvgBackground";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Fullscreen SVG background (layered radial gradients with subtle motion). */}
      <AnimatedSvgBackground />

      {/* Hero (fullscreen). */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        <p className="text-sm font-medium text-slate-800/80">
          Hey, my name is
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
          Elliot Luo
        </h1>

        <div className="mt-16 max-w-5xl text-xl leading-relaxed text-slate-900 md:text-2xl">
          <p>
            I am a product manager who balances user needs with delivery.
          </p>
          <p className="mt-6">
            My goal is to design products that feel invisible to users, where the
            experience is frictionless and intuitive across both software and hardware.
          </p>
        </div>
      </section>

      {/* Experiences (scroll down). */}
      <section className="relative z-10 px-4 pb-16">
        <RolePanels />
      </section>
    </main>
  );
}


