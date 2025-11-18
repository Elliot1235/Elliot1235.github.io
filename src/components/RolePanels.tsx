"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { roles } from "@/data/roles";
import { ExperienceCard } from "./ExperienceCard";

type PanelState = {
  x: number;
  scale: number;
  opacity: number;
  zIndex: number;
  hidden: boolean;
  isActive: boolean;
};

function getPanelState(index: number, activeIndex: number): PanelState {
  // Keep the logical order: [Software Engineer, Product Manager, Graduate Researcher]
  // Only reposition visually.
  if (activeIndex === 0) {
    if (index === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 30, hidden: false, isActive: true };
    }
    if (index === 1) {
      return { x: 160, scale: 0.8, opacity: 0.6, zIndex: 20, hidden: false, isActive: false };
    }
    return { x: 400, scale: 0.8, opacity: 0, zIndex: 10, hidden: true, isActive: false };
  }

  if (activeIndex === 1) {
    if (index === 0) {
      return { x: -160, scale: 0.8, opacity: 0.6, zIndex: 20, hidden: false, isActive: false };
    }
    if (index === 1) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 30, hidden: false, isActive: true };
    }
    return { x: 160, scale: 0.8, opacity: 0.6, zIndex: 20, hidden: false, isActive: false };
  }

  // activeIndex === 2
  if (index === 2) {
    return { x: 0, scale: 1, opacity: 1, zIndex: 30, hidden: false, isActive: true };
  }
  if (index === 1) {
    return { x: -160, scale: 0.8, opacity: 0.6, zIndex: 20, hidden: false, isActive: false };
  }
  return { x: -400, scale: 0.8, opacity: 0, zIndex: 10, hidden: true, isActive: false };
}

export function RolePanels() {
  // Default active: Product Manager (index 1)
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="mt-10 w-full">
      <div className="relative mx-auto flex h-full max-w-5xl items-stretch justify-center px-4">
        <div className="relative flex w-full items-stretch justify-center">
          <AnimatePresence initial={false}>
            {roles.map((role, index) => {
              const state = getPanelState(index, activeIndex);

              if (state.hidden && !state.isActive) {
                // Keep in DOM for order, but visually hidden and non-interactive.
                return (
                  <motion.div
                    key={role.role}
                    className="pointer-events-none absolute inset-y-0 flex w-full max-w-md"
                    initial={false}
                    animate={{ x: state.x, opacity: state.opacity, scale: state.scale }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    style={{ zIndex: state.zIndex }}
                  />
                );
              }

              return (
                <motion.button
                  key={role.role}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group absolute inset-y-0 flex w-full max-w-md cursor-pointer items-stretch outline-none"
                  initial={false}
                  animate={{
                    x: state.x,
                    opacity: state.opacity,
                    scale: state.scale
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  style={{ zIndex: state.zIndex }}
                >
                  <div
                    className={`flex w-full flex-col rounded-2xl border border-emerald-100 p-6 text-left shadow-md backdrop-blur-sm ${
                      state.isActive
                        ? "bg-panel-green"
                        : "bg-white/70"
                    }`}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700">
                      {role.role}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-slate-900">
                      {role.intro.split(".")[0]}.
                    </h2>
                    <p className="mt-1 text-sm text-slate-700">
                      {role.intro.replace(`${role.intro.split(".")[0]}.`, "").trim()}
                    </p>

                    <div className="mt-4 flex-1 space-y-3">
                      {role.experiences.map((exp) => (
                        <ExperienceCard key={exp.title} experience={exp} />
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


