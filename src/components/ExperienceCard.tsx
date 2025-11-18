"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Experience } from "@/data/roles";

type Props = {
  experience: Experience;
};

export function ExperienceCard({ experience }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-white/70 p-4 shadow-sm flex gap-4">
      <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-200 to-emerald-400" />
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900">
          {experience.title}
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-2 text-sm font-semibold text-sky-600 hover:text-sky-700 focus:outline-none"
        >
          {open ? "show less" : "learn more"}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-sm text-slate-700">
                {experience.details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


