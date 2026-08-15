"use client";

/**
 * GSAP global configuration.
 *
 * Phase 1 scope: register plugins once, expose shared defaults and a small
 * set of reusable animation *utilities*. No section is wired to an actual
 * timeline yet — that begins in Phase 2 (Hero) and Phase 3 (scroll
 * storytelling, 3D sync).
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion as motionTokens } from "@/config/theme";

let registered = false;

/** Call once (e.g. from a top-level client provider) before using ScrollTrigger. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: "expo.out",
    duration: motionTokens.duration.base,
  });

  registered = true;
}

/** Shared eases mapped from design tokens, for consistency across every future animation. */
export const eases = {
  standard: "expo.out",
  enter: "power3.out",
  exit: "power2.in",
} as const;

/**
 * Reveal-on-scroll utility (fade + rise). Intentionally unopinionated about
 * trigger markers/pinning — sections opt in explicitly in later phases.
 */
export function fadeInUp(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
) {
  return gsap.from(target, {
    y: 40,
    opacity: 0,
    duration: motionTokens.duration.base,
    ease: eases.enter,
    ...vars,
  });
}

/** Utility for a scroll-pinned section — configured, not invoked, in Phase 1. */
export function createScrollPin(
  trigger: gsap.DOMTarget,
  vars: ScrollTrigger.Vars = {}
) {
  return ScrollTrigger.create({
    trigger,
    start: "top top",
    end: "+=100%",
    pin: true,
    ...vars,
  });
}

export { gsap, ScrollTrigger };

// Registered at module-evaluation time, not only inside a React effect.
// React fires child effects before parent effects on mount, so a page's
// own client component (e.g. one calling useScrollReveal, which uses
// ScrollTrigger.batch) can run before PageWrapper's registerGsap() effect
// would otherwise have fired. Since this module only ever loads in the
// browser (every importer is a "use client" file) and ES modules execute
// their top-level body once on first import — before any component's
// effects run — this guarantees the plugin is ready by the time any
// consumer's effect executes. registerGsap() remains exported/idempotent
// (guarded by `registered`) for call sites that want to trigger it
// explicitly or re-check after an SSR/hydration boundary.
registerGsap();
