"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { roles } from "@/data/roles";
import { ExperienceCard } from "./ExperienceCard";

export function RolePanels() {
  // Only keep the Product Manager panel visible on the page.
  const productManagerOnly = roles.filter(
    (role) => role.role === "Product Manager"
  );
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="flex w-[80vw] max-w-4xl gap-6">
        {productManagerOnly.map((role, index) => {
          const isActive = index === activeIndex;
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
              aria-pressed={isActive}
              className="group flex-1 cursor-pointer outline-none"
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.6
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="paper-card flex h-full w-full flex-col border border-[#F3D7A2]/70 p-6 text-left">
                <h2 className="text-xl font-semibold text-slate-900">
                  Experience
                </h2>

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
  );
}


