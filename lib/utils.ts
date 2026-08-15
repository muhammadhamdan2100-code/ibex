import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional Tailwind classes without specificity collisions.
 * Use this in every component instead of raw template strings.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between a min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation, used across GSAP/Three.js utilities. */
export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

/** Map a value from one numeric range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/** SSR-safe check for whether the current device supports fine hover/pointer. */
export function isDesktopPointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** SSR-safe check for reduced-motion preference — every animation utility must respect this. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Slugify a string for anchors / routes (e.g. service names, registrations). */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
