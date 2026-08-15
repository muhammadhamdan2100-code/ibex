"use client";

/**
 * Lenis smooth-scroll configuration.
 *
 * Phase 1 scope: configuration + a single factory function used by the
 * `useLenis` hook. Not mounted globally yet — that happens when PageWrapper
 * is wired up in Phase 2 so the loading screen can control first paint.
 */

import Lenis from "@studio-freight/lenis";
import { motion } from "@/config/theme";
import { prefersReducedMotion } from "@/lib/utils";

export function createLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (prefersReducedMotion()) return null; // accessibility: no forced smoothing

  return new Lenis({
    duration: motion.lenis.duration,
    smoothWheel: motion.lenis.smoothWheel,
    touchMultiplier: motion.lenis.touchMultiplier,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
  });
}
