"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * Isomorphic layout effect — resolves to `useLayoutEffect` in the browser
 * and `useEffect` during SSR, avoiding React's
 * "useLayoutEffect does nothing on the server" console warning.
 *
 * Lives in `hooks/` (not `lib/utils.ts`) deliberately: `lib/utils.ts` is
 * imported by Server Components (e.g. `SectionHeading` uses `cn()` from
 * it), and any module reachable from a Server Component that references
 * React hooks — even just to assign one to a variable — breaks the RSC
 * boundary unless it's marked `"use client"`. Keeping hook-shaped code out
 * of `lib/utils.ts` entirely keeps that file safely importable from both
 * server and client components.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
