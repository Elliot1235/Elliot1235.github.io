import Link from "next/link";

import SketchCard from "@/components/SketchCard";

export default function KPMGPage() {
  return (
    <div className="p-20 width-full max-w-4xl mx-auto space-y-8 background-color-white/80 rounded-lg shadow-lg">
      <SketchCard>
        <h3 className="text-xl font-semibold mb-2">Enchant</h3>
        <p className="text-gray-600 text-sm">
          Step into the journey of a unique project...
        </p>
      </SketchCard>
    </div>
  );
}

