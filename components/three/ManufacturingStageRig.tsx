"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Color, type AmbientLight, type DirectionalLight } from "three";
import { HERO_STAGES } from "@/lib/data/hero-stages";

interface ManufacturingStageRigProps {
  progressRef: RefObject<number>;
}

const SMOOTHING = 4; // higher = snappier follow, lower = more cinematic lag

/**
 * Drives the "new camera angle, new lighting" requirement per stage.
 * Reads `progressRef.current` inside `useFrame` (runs every rendered
 * frame, independent of React's render cycle) and lerps the actual
 * camera position plus a dedicated ambient/key/rim light trio toward
 * whichever two stages the current scroll position sits between — so
 * motion is continuous, not a hard cut at each stage boundary.
 *
 * This is the Hero's *only* lighting rig — `CanvasWrapper` is mounted with
 * `lighting={false}` for the Hero specifically, so this fully replaces
 * (rather than stacks on top of) the site's default `Lighting` component.
 * That default remains untouched for every other scene.
 */
export default function ManufacturingStageRig({ progressRef }: ManufacturingStageRigProps) {
  const { camera } = useThree();
  const ambientLightRef = useRef<AmbientLight>(null);
  const keyLightRef = useRef<DirectionalLight>(null);
  const rimLightRef = useRef<DirectionalLight>(null);

  const tmpA = useRef(new Color());
  const tmpB = useRef(new Color());

  useFrame((_, delta) => {
    const stageCount = HERO_STAGES.length;
    const p = Math.min(0.999, Math.max(0, progressRef.current ?? 0));
    const scaled = p * (stageCount - 1);
    const i = Math.floor(scaled);
    const t = scaled - i;
    const current = HERO_STAGES[i]!;
    const next = HERO_STAGES[Math.min(stageCount - 1, i + 1)]!;

    const targetX = current.cameraPosition[0] + (next.cameraPosition[0] - current.cameraPosition[0]) * t;
    const targetY = current.cameraPosition[1] + (next.cameraPosition[1] - current.cameraPosition[1]) * t;
    const targetZ = current.cameraPosition[2] + (next.cameraPosition[2] - current.cameraPosition[2]) * t;

    const smoothing = 1 - Math.pow(1 - 1 / SMOOTHING, delta * 60);
    camera.position.x += (targetX - camera.position.x) * smoothing;
    camera.position.y += (targetY - camera.position.y) * smoothing;
    camera.position.z += (targetZ - camera.position.z) * smoothing;
    camera.lookAt(0, 0.1, 0);

    if (ambientLightRef.current) {
      const targetAmbient =
        current.light.ambientIntensity + (next.light.ambientIntensity - current.light.ambientIntensity) * t;
      ambientLightRef.current.intensity += (targetAmbient - ambientLightRef.current.intensity) * smoothing;
    }

    if (keyLightRef.current) {
      const targetIntensity =
        current.light.keyIntensity + (next.light.keyIntensity - current.light.keyIntensity) * t;
      keyLightRef.current.intensity += (targetIntensity - keyLightRef.current.intensity) * smoothing;
      tmpA.current.set(current.light.keyColor);
      tmpB.current.set(next.light.keyColor);
      tmpA.current.lerp(tmpB.current, t);
      keyLightRef.current.color.lerp(tmpA.current, smoothing);
    }

    if (rimLightRef.current) {
      tmpA.current.set(current.light.rimColor);
      tmpB.current.set(next.light.rimColor);
      tmpA.current.lerp(tmpB.current, t);
      rimLightRef.current.color.lerp(tmpA.current, smoothing);
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight ref={ambientLightRef} intensity={HERO_STAGES[0]!.light.ambientIntensity} />
      <directionalLight ref={keyLightRef} position={[4, 5, 3]} intensity={1.1} />
      <directionalLight ref={rimLightRef} position={[-4, 2, -3]} intensity={0.5} />
    </>
  );
}
