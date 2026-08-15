"use client";

import { MANUFACTURING_PROCESS } from "@/lib/data/manufacturing-process";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Vertical timeline, staggered scroll-reveal via the existing
 * `useScrollReveal` hook (same batched-ScrollTrigger mechanism used
 * elsewhere — no new animation system introduced for this one section).
 */
export default function ManufacturingTimeline() {
  const listRef = useScrollReveal<HTMLOListElement>();

  return (
    <ol ref={listRef} className="relative flex flex-col gap-4 border-l border-white/10 pl-8">
      {MANUFACTURING_PROCESS.map(({ step, title }) => (
        <li key={step} data-reveal className="relative">
          <span
            className="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/50 bg-matte-black font-mono text-xs text-gold-500"
            aria-hidden="true"
          >
            {String(step).padStart(2, "0")}
          </span>
          <div className="glass rounded-lg px-5 py-4 transition-all duration-fast ease-standard hover:border-gold-500/40 hover:-translate-y-0.5">
            <h3 className="font-display text-lg text-white">{title}</h3>
          </div>
        </li>
      ))}
    </ol>
  );
}
