"use client";

import { useEffect, useState } from "react";
import { breakpoints } from "@/config/theme";

type BreakpointKey = keyof typeof breakpoints;

/** SSR-safe media query hook. Pass a raw query or a design-token breakpoint key. */
export function useMediaQuery(query: string | BreakpointKey) {
  const resolvedQuery =
    query in breakpoints ? `(min-width: ${breakpoints[query as BreakpointKey]})` : query;

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(resolvedQuery);
    const listener = () => setMatches(mql.matches);
    listener();
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [resolvedQuery]);

  return matches;
}
