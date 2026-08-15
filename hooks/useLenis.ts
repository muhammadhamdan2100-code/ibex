"use client";

import { useEffect, useRef } from "react";
import type Lenis from "@studio-freight/lenis";
import { createLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Mounts Lenis for the lifetime of the component tree it's called in
 * (intended to be called once, from PageWrapper) and syncs it with GSAP's
 * ScrollTrigger via its own RAF loop. Returns the instance ref in case a
 * future section (Phase 2+) needs programmatic scrollTo.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = createLenis();
    lenisRef.current = lenis;
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis?.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    let rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
