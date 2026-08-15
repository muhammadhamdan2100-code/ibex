"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, type Points } from "three";

interface ParticleFieldProps {
  count: number;
  color?: string;
  size?: number;
  /** [x, y, z] half-extents of the box particles drift within. */
  bounds?: [number, number, number];
  speed?: number;
  opacity?: number;
}

/**
 * Ambient floating-dust field for the Hero's factory atmosphere. A real,
 * lightweight Three.js `Points` system (not a texture/sprite trick) —
 * positions drift upward each frame and wrap back to the bottom, giving a
 * continuous, cheap "dust in factory light" effect. Density is controlled
 * entirely by `count`, which callers should scale from
 * `useThreePerformance().particleDensity`.
 */
export default function ParticleField({
  count,
  color = "#C9A24B",
  size = 0.02,
  bounds = [4, 2.2, 2.5],
  speed = 0.06,
  opacity = 0.35,
}: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * bounds[0] * 2;
      arr[i * 3 + 1] = (Math.random() - 0.5) * bounds[1] * 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * bounds[2] * 2;
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useFrame((_, delta) => {
    const geometry = pointsRef.current?.geometry;
    const attr = geometry?.getAttribute("position") as BufferAttribute | undefined;
    if (!attr) return;

    for (let i = 0; i < count; i++) {
      const y = attr.getY(i) + delta * speed;
      attr.setY(i, y > bounds[1] ? -bounds[1] : y);
      const x = attr.getX(i) + Math.sin(y * 3 + i) * delta * 0.01;
      attr.setX(i, x);
    }
    attr.needsUpdate = true;
  });

  if (count <= 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
