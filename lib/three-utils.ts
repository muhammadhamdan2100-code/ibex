import { HERO_STAGES } from "@/lib/data/hero-stages";

/** The scale every per-stage animation reads progress against: 0 = stage 1, STAGE_MAX = the last stage. */
export const STAGE_MAX = HERO_STAGES.length - 1;

/**
 * Smoothstep between two points on the "stage units" scale (0..STAGE_MAX).
 * Returns 0 before `from`, 1 after `to`, smoothly eased between. Shared by
 * every Hero VFX component (mesh part reveal, particle intensity, camera/
 * light rig) so the interpolation curve is identical everywhere and isn't
 * redefined per file.
 */
export function reveal(scaledProgress: number, from: number, to: number): number {
  const t = Math.min(1, Math.max(0, (scaledProgress - from) / (to - from)));
  return t * t * (3 - 2 * t);
}

/** Converts a hook's raw 0–1 scroll progress into "stage units" (0..STAGE_MAX). */
export function toStageUnits(progress: number): number {
  return Math.min(0.999, Math.max(0, progress)) * STAGE_MAX;
}
