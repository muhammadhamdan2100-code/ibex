"use client";

import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

interface ScrollRevealOptions {
  /** CSS selector (relative to the container) for the items to reveal. */
  selector?: string;
  /** Stagger between each item's animation start, in seconds. */
  stagger?: number;
  /** Vertical offset items animate in from, in pixels. */
  y?: number;
}

/**
 * Batched scroll-reveal animation (fade + rise, staggered) for card grids,
 * list sections, and gallery tiles. Uses `ScrollTrigger.batch` so many
 * items on one page share a small number of triggers instead of one per
 * item. Respects `prefers-reduced-motion` via GSAP's own duration
 * collapse (see config/theme.ts motion tokens + globals.css media query).
 */
export function useScrollReveal<T extends HTMLElement>({
  selector = "[data-reveal]",
  stagger = 0.08,
  y = 32,
}: ScrollRevealOptions = {}): RefObject<T | null> {
  const containerRef = useRef<T | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector);
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y });

      ScrollTrigger.batch(items, {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger,
          }),
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, stagger, y]);

  return containerRef;
}
