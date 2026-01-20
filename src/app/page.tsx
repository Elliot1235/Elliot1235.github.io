import { RolePanels } from "@/components/RolePanels";
import { GradientBackgroundCanvas } from "@/components/GradientBackgroundCanvas";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#BAD3D8] px-4 py-12">
      {/* Fullscreen canvas background (sits behind all content). */}
      <GradientBackgroundCanvas />
      <header className="text-center">
        <p className="text-sm font-medium text-slate-700">
          Hey, my name is
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Elliot Luo
        </h1>
      </header>

      <RolePanels />
    </main>
  );
}


