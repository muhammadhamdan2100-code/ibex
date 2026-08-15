"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

/**
 * Adds HDR-style bloom around emissive surfaces (headlights, gold trim,
 * welding sparks) — a real post-processing pass via @react-three/
 * postprocessing, not a CSS glow trick. Only mounted when
 * `useThreePerformance().postFX` is true (high tier) — an EffectComposer
 * pass is the single most expensive toggle available here, so it's
 * withheld on medium/low-tier devices entirely rather than tuned down,
 * per this phase's 60fps target.
 */
export default function HeroPostFX() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.4}
        luminanceSmoothing={0.9}
        intensity={0.6}
        mipmapBlur
      />
    </EffectComposer>
  );
}
