"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ComponentProps } from "react";
import { PerspectiveCamera, Preload } from "@react-three/drei";
import Lighting from "./Lighting";
import { useThreePerformance } from "@/hooks/useThreePerformance";
import { cn } from "@/lib/utils";

type CanvasElementProps = ComponentProps<typeof Canvas>;

interface CanvasWrapperProps {
  children?: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  fallback?: React.ReactNode;
  /** Set false when the scene provides its own complete lighting rig (e.g. Hero's per-stage ManufacturingStageRig) — avoids stacking the default fill lighting on top of it. */
  lighting?: boolean;
}

/**
 * Standard R3F Canvas configuration for the whole site: camera, lighting
 * rig, performance-tiered renderer settings, and Suspense/asset preloading.
 */
export default function CanvasWrapper({
  children,
  className,
  cameraPosition = [0, 1.2, 6],
  fov = 35,
  fallback = null,
  lighting = true,
  ...rest
}: CanvasWrapperProps & Partial<CanvasElementProps>) {
  const perf = useThreePerformance();

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Canvas
        dpr={perf.dpr}
        shadows={perf.shadows}
        gl={{
          antialias: perf.antialias,
          powerPreference: "high-performance",
          alpha: true,
        }}
        {...rest}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />
        {lighting && <Lighting />}
        <Suspense fallback={fallback}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
