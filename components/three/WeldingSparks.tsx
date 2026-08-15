"use client";

import { useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, type Points, type PointsMaterial } from "three";
import { reveal, toStageUnits } from "@/lib/three-utils";

interface WeldingSparksProps {
  progressRef: RefObject<number>;
  count?: number;
}

const ORIGIN: [number, number, number] = [0.3, -0.4, 0];

/**
 * Small bright particle burst near the chassis, standing in for welding
 * sparks during Stage 2 (Steel Chassis). Each particle rises, drifts
 * outward, and falls slightly (a simple gravity term) on a randomized
 * loop; the whole system's opacity follows the same stage-reveal
 * smoothstep used everywhere else in the Hero, so it's bright during
 * Stage 2 and genuinely fades to nothing outside that window rather than
 * just being hidden/shown abruptly.
 */
export default function WeldingSparks({ progressRef, count = 40 }: WeldingSparksProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const velocities = useRef<Float32Array>(new Float32Array(count * 3));

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      resetParticle(arr, velocities.current, i);
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useFrame((_, delta) => {
    const scaled = toStageUnits(progressRef.current ?? 0);
    const intensity = reveal(scaled, 0.9, 1.3) * (1 - reveal(scaled, 1.9, 2.3));

    if (materialRef.current) {
      materialRef.current.opacity = intensity * 0.9;
    }

    if (intensity <= 0.01) return; // skip the per-particle update entirely when invisible

    const geometry = pointsRef.current?.geometry;
    const attr = geometry?.getAttribute("position") as BufferAttribute | undefined;
    if (!attr) return;

    const vel = velocities.current;
    for (let i = 0; i < count; i++) {
      const vy = vel[i * 3 + 1]! - delta * 0.8; // gravity
      vel[i * 3 + 1] = vy;

      const x = attr.getX(i) + vel[i * 3]! * delta;
      const y = attr.getY(i) + vy * delta;
      const z = attr.getZ(i) + vel[i * 3 + 2]! * delta;

      if (y < ORIGIN[1] - 0.3) {
        resetParticleAt(attr, vel, i);
      } else {
        attr.setXYZ(i, x, y, z);
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={ORIGIN}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color="#F5A623"
        size={0.035}
        transparent
        opacity={0}
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function resetParticle(positions: Float32Array, velocities: Float32Array, i: number) {
  positions[i * 3] = 0;
  positions[i * 3 + 1] = 0;
  positions[i * 3 + 2] = 0;
  velocities[i * 3] = (Math.random() - 0.5) * 1.2;
  velocities[i * 3 + 1] = Math.random() * 1.5 + 0.4;
  velocities[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
}

function resetParticleAt(attr: BufferAttribute, velocities: Float32Array, i: number) {
  attr.setXYZ(i, 0, 0, 0);
  velocities[i * 3] = (Math.random() - 0.5) * 1.2;
  velocities[i * 3 + 1] = Math.random() * 1.5 + 0.4;
  velocities[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
}
