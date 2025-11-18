import { RolePanels } from "@/components/RolePanels";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-soft-green px-4 py-10">
      <div className="w-full max-w-5xl rounded-3xl bg-white/40 p-8 shadow-lg backdrop-blur-md md:p-10">
        <header className="text-center">
          <p className="text-sm font-medium text-slate-700">
            Hey, my name is
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Elliot Luo
          </h1>
        </header>

        <RolePanels />
      </div>
    </main>
  );
}


