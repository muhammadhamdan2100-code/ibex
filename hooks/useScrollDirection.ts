"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollState {
  /** True once the user has scrolled past `glassThreshold` — switch chrome from transparent to glass. */
  scrolled: boolean;
  /** True when the navbar should hide (scrolling down, past `hideThreshold`). */
  hidden: boolean;
}

/**
 * Tracks scroll position/direction for the navbar's premium scroll
 * behaviour: transparent at the very top, glass once scrolled, and
 * auto-hiding on scroll-down / reappearing on scroll-up (never hidden
 * near the top, so the bar doesn't flicker while reading the hero).
 * 
 * Optimized: Only updates state on direction changes, uses CSS transforms.
 */
export function useScrollDirection(glassThreshold = 24, hideThreshold = 160): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, hidden: false });
  const lastY = useRef(0);
  const ticking = useRef(false);
  const lastHiddenState = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastY.current;
        const scrolled = y > glassThreshold;
        const hidden = goingDown && y > hideThreshold;

        // Only update state if hidden state changed to avoid re-renders
        if (hidden !== lastHiddenState.current) {
          setState({ scrolled, hidden });
          lastHiddenState.current = hidden;
        }

        lastY.current = y;
        ticking.current = false;
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [glassThreshold, hideThreshold]);

  return state;
}
