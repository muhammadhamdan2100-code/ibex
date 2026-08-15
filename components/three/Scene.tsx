"use client";

import { useGLTF } from "@react-three/drei";

/**
 * Empty scene placeholder. Phase 1 deliberately ships no geometry — this
 * file exists so the Canvas/Lighting/Loader pipeline can be smoke-tested
 * end to end. Real content (restored vehicle model, SPV chassis, etc.)
 * is added in Phase 3.
 */
export default function Scene() {
  return null;
}

/**
 * Typed GLTF preloader. Named `use*` deliberately — `useGLTF.preload` is
 * matched by the react-hooks lint rule as hook-shaped, so the calling
 * function must follow hook naming or the linter flags a rules-of-hooks
 * violation. Call `usePreloadAsset(path)` from a route-level effect once
 * real .glb files exist, so the model is warm in cache before the Canvas
 * mounts it.
 */
export function usePreloadAsset(path: string) {
  useGLTF.preload(path);
}
