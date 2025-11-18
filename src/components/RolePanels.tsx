"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { roles } from "@/data/roles";
import { ExperienceCard } from "./ExperienceCard";

const PANEL_WIDTH = 320;

function getPositions(activeIndex: number) {
  // Maintains logical order while moving panels visually
  return roles.map((_role, index) => {
    if (index === activeIndex) {
      return { x: 0, scale: 1, opacity: 1, z: 30, visible: true };
    }

    const offset = index - activeIndex;
    if (offset === -1) {
      return { x: -PANEL_WIDTH, scale: 0.8, opacity: 0.6, z: 20, visible: true };
    }
    if (offset === 1) {
      return { x: PANEL_WIDTH, scale: 0.8, opacity: 0.6, z: 20, visible: true };
    }

    return { x: offset < 0 ? -PANEL_WIDTH * 2 : PANEL_WIDTH * 2, scale: 0.8, opacity: 0, z: 10, visible: false };
  });
}

export function RolePanels() {
  const [activeIndex, setActiveIndex] = useState(1);
  const positions = useMemo(() => getPositions(activeIndex), [activeIndex]);

  return (
    <div className="mt-10 w-full overflow-hidden">
      <div className="relative mx-auto flex h-[560px] max-w-5xl items-stretch justify-center px-4">
        <div className="relative flex h-full w-full items-stretch justify-center">
          {roles.map((role, index) => {
            const state = positions[index];
            return (
              <motion.div
                key={role.role}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={index === activeIndex}
                className={`group absolute inset-y-0 flex h-full w-full max-w-md cursor-pointer items-stretch outline-none ${
                  state.visible ? "" : "pointer-events-none"
                }`}
                initial={false}
                animate={{
                  x: state.x,
                  opacity: state.opacity,
                  scale: state.scale
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                style={{ zIndex: state.z }}
              >
                <div
                  className={`flex w-full flex-col rounded-2xl border border-emerald-100 p-6 text-left shadow-md backdrop-blur-sm ${
                    index === activeIndex ? "bg-panel-green" : "bg-white/80"
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


