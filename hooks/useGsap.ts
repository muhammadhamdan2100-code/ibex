"use client";

import { useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/**
 * Scoped GSAP context hook. Wraps gsap.context so every component's tweens
 * / ScrollTriggers are automatically created and reverted with that
 * component's lifecycle — prevents leaks across route changes.
 *
 * Usage (Phase 2+):
 *   const scope = useGsap<HTMLDivElement>((ctx, el) => {
 *     gsap.from(el, { opacity: 0 });
 *   });
 *   return <div ref={scope}>...</div>
 */
export function useGsap<T extends HTMLElement>(
  callback: (context: gsap.Context, element: T) => void,
  deps: React.DependencyList = []
): RefObject<T | null> {
  const scope = useRef<T | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => callback(ctx, scope.current as T), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
