"use client";

import { useEffect, useState } from "react";

export type PerformanceTier = "low" | "medium" | "high";

interface ThreePerformanceProfile {
  tier: PerformanceTier;
  dpr: [number, number];
  shadows: boolean;
  antialias: boolean;
  /** Ambient dust / welding-spark particle systems. Off entirely on low tier — particle systems are cheap individually but add up with everything else in the Hero scene. */
  particles: boolean;
  /** Point count multiplier for whatever particle systems are enabled. */
  particleDensity: number;
  /** Bloom post-processing (EffectComposer). This is the single most expensive toggle here (extra render passes) — high tier only. */
  postFX: boolean;
}

const PROFILES: Record<PerformanceTier, ThreePerformanceProfile> = {
  low: {
    tier: "low",
    dpr: [1, 1],
    shadows: false,
    antialias: false,
    particles: false,
    particleDensity: 0,
    postFX: false,
  },
  medium: {
    tier: "medium",
    dpr: [1, 1.5],
    shadows: false,
    antialias: true,
    particles: true,
    particleDensity: 0.5,
    postFX: false,
  },
  high: {
    tier: "high",
    dpr: [1, 2],
    shadows: true,
    antialias: true,
    particles: true,
    particleDensity: 1,
    postFX: true,
  },
};

/**
 * Coarse device-tier detector used to gate Three.js/R3F render quality —
 * dpr cap, shadows, antialiasing, and (Phase 3) particle systems and
 * post-processing. This is a heuristic based on `hardwareConcurrency` and
 * pointer coarseness, not a real frame-time benchmark — it's a reasonable
 * first cut for "don't run the expensive stuff on a phone," not a
 * guarantee of 60fps on every device it labels "high."
 */
export function useThreePerformance(): ThreePerformanceProfile {
  const [profile, setProfile] = useState<ThreePerformanceProfile>(PROFILES.medium);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData;

    if (saveData || cores <= 4) {
      setProfile(PROFILES.low);
    } else if (isCoarsePointer || cores <= 8) {
      setProfile(PROFILES.medium);
    } else {
      setProfile(PROFILES.high);
    }
  }, []);

  return profile;
}
