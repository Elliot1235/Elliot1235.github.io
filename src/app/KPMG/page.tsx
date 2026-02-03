import Link from "next/link";

export default function KPMGPage() {
  return (
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto w-[92vw] max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">KPMG — Applied Research on Low-Code Platforms</h1>
          <p className="mt-3 text-sm text-slate-600">Full page dedicated to the KPMG research project.</p>
        </header>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <img src="/images/KPMG.png" alt="KPMG" className="w-full h-64 object-cover rounded-lg" />
          </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">Applied Research on Low-Code Platforms</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-800">Designed an LSP-based evaluation framework aligned with ISO/IEC 9126 to assess low-code platforms across functionality, usability, and robustness. Conducted a comparative study of Mendix and OutSystems, combining performance testing with usability analysis to provide evidence-based platform selection guidance.</p>

            <h3 className="text-lg font-medium mt-6">Key contributions</h3>
            <ul className="mt-3 list-disc pl-5 text-slate-800">
              <li>Designed a built-in dark filter to improve night-time viewing.</li>
              <li>Introduced a 360° horizontal rotation mechanism for easier targeting.</li>
              <li>Collaborated with engineering and design to optimize manufacturability and user experience.</li>
            </ul>

            <div className="mt-8">
              <Link href="/" className="inline-block rounded-md bg-slate-900 text-white px-4 py-2">Back to home</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
