"use client";

import { useRef, useState } from "react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/lib/utils";
import { HERO_STAGES } from "@/lib/data/hero-stages";

interface HeroScrollStage {
  containerRef: RefObject<HTMLDivElement | null>;
  /** Index into HERO_STAGES for the currently active stage — React state, changes only 9 times, safe to re-render on. */
  activeIndex: number;
  /**
   * 0–1 progress through the whole pinned region, as a mutable ref rather
   * than state. This updates on every scroll tick (potentially dozens of
   * times per second) — routing it through React state would re-render
   * the whole Hero tree that often. Anything that needs continuous,
   * smooth motion (the 3D camera/lighting rig) should read
   * `progressRef.current` inside its own `useFrame`, not consume this as
   * a prop that changes every render.
   */
  progressRef: RefObject<number>;
}

/**
 * Pins the Hero section for one scroll "chapter" and tracks progress
 * through the nine transformation stages.
 *
 * @param progressBarRef optional ref to a DOM element whose `style.width`
 * should track scroll progress directly (the on-screen progress bar).
 * Set outside React state for the same reason `progressRef` is a ref —
 * this can update far more often than a React re-render should.
 */
export function useHeroScrollStage(
  progressBarRef?: RefObject<HTMLDivElement | null>
): HeroScrollStage {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    // Reduced motion: skip pinning/scrubbing entirely, keep the first
    // stage active, let the section scroll normally.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=550%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          if (progressBarRef?.current) {
            progressBarRef.current.style.width = `${self.progress * 100}%`;
          }
          const stageCount = HERO_STAGES.length;
          const index = Math.min(stageCount - 1, Math.floor(self.progress * stageCount));
          setActiveIndex((prev) => (prev === index ? prev : index));
        },
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { containerRef, activeIndex, progressRef };
}
