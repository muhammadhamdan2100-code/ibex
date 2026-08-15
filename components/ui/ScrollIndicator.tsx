"use client";

import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrollIndicatorProps {
  className?: string;
}

/**
 * Thin top-of-viewport scroll progress bar, gold-on-transparent.
 * Reads from useScrollProgress (plain scroll listener in Phase 1 —
 * swapped for Lenis' progress event once smooth scroll is mounted).
 */
export default function ScrollIndicator({ className }: ScrollIndicatorProps) {
  const progress = useScrollProgress();

  return (
    <div
      className={cn("fixed top-0 left-0 h-[2px] w-full z-navbar bg-white/5", className)}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-gold"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
