"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Color, type Group, type Mesh, type MeshStandardMaterial } from "three";
import { reveal, toStageUnits } from "@/lib/three-utils";

interface BusManufacturingMeshProps {
  progressRef: RefObject<number>;
}

/**
 * The Hero's 3D centerpiece. Not a smooth geometric morph of a
 * photorealistic vehicle model — that needs real modeled/sculpted assets
 * this project doesn't have yet. What this genuinely delivers: every part
 * (raw steel stock, chassis rail, frame ribs, roof rail, body shell,
 * window band, trim, headlights, wheels) fades and scales in on its own
 * smoothstep window keyed to scroll progress — continuous, not a hard cut
 * — and the body shell's material itself grades from raw unpainted steel
 * to a glossier "painted" finish partway through. Combined with
 * `ManufacturingStageRig`'s camera/lighting motion, this is a real,
 * smooth, scroll-driven progression telling the named nine-stage story —
 * a progressive assembly, not a mesh morph.
 */
export default function BusManufacturingMesh({ progressRef }: BusManufacturingMeshProps) {
  const groupRef = useRef<Group>(null);
  const rawSteelRef = useRef<Group>(null);
  const chassisRef = useRef<Mesh>(null);
  const ribsRef = useRef<Group>(null);
  const roofRailRef = useRef<Mesh>(null);
  const bodyRef = useRef<Mesh>(null);
  const bodyMaterialRef = useRef<MeshStandardMaterial>(null);
  const windowRef = useRef<Mesh>(null);
  const trimRef = useRef<Mesh>(null);
  const detailRef = useRef<Group>(null);

  const rawSteelColor = new Color("#4A4E54");
  const paintedColor = new Color("#16171A");
  const tmpColor = useRef(new Color());

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }

    const scaled = toStageUnits(progressRef.current ?? 0);

    // Raw steel stock — present at the very start, consumed as the
    // chassis takes shape.
    const rawSteelAmount = 1 - reveal(scaled, 0.2, 1.0);
    if (rawSteelRef.current) {
      rawSteelRef.current.visible = rawSteelAmount > 0.01;
      rawSteelRef.current.scale.setScalar(0.6 + rawSteelAmount * 0.4);
    }

    const chassisAmount = reveal(scaled, 0.5, 1.3);
    if (chassisRef.current) {
      chassisRef.current.visible = chassisAmount > 0.01;
      chassisRef.current.scale.set(chassisAmount, 1, 1);
    }

    const ribsAmount = reveal(scaled, 1.5, 2.3);
    if (ribsRef.current) {
      ribsRef.current.visible = ribsAmount > 0.01;
      ribsRef.current.scale.setScalar(ribsAmount);
    }

    const roofAmount = reveal(scaled, 2.5, 3.3);
    if (roofRailRef.current) {
      roofRailRef.current.visible = roofAmount > 0.01;
      roofRailRef.current.scale.set(roofAmount, 1, 1);
    }

    const bodyAmount = reveal(scaled, 3.2, 4.0);
    if (bodyRef.current) {
      bodyRef.current.visible = bodyAmount > 0.01;
      bodyRef.current.scale.setScalar(0.85 + bodyAmount * 0.15);
    }

    // Painting stage: body material grades from raw steel to a glossier
    // painted finish. Finished-vehicle stage nudges gloss further still.
    if (bodyMaterialRef.current) {
      const paintAmount = reveal(scaled, 5.0, 5.8);
      tmpColor.current.copy(rawSteelColor).lerp(paintedColor, paintAmount);
      bodyMaterialRef.current.color.copy(tmpColor.current);
      const finalPolish = reveal(scaled, 8.0, 8.8) * 0.15;
      bodyMaterialRef.current.roughness = 0.42 - paintAmount * 0.2 - finalPolish;
      bodyMaterialRef.current.metalness = 0.8 + paintAmount * 0.1 + finalPolish;
    }

    const windowAmount = reveal(scaled, 6.0, 6.8);
    if (windowRef.current) {
      windowRef.current.visible = windowAmount > 0.01;
      windowRef.current.scale.setScalar(0.9 + windowAmount * 0.1);
      const mat = windowRef.current.material as MeshStandardMaterial;
      if (mat) mat.opacity = windowAmount * 0.35;
    }

    const detailAmount = reveal(scaled, 7.0, 7.8);
    if (detailRef.current) {
      detailRef.current.visible = detailAmount > 0.01;
      detailRef.current.scale.setScalar(detailAmount);
    }
    if (trimRef.current) {
      trimRef.current.visible = detailAmount > 0.01;
      trimRef.current.scale.set(detailAmount, 1, 1);
    }
  });

  const wheelPositions: [number, number, number][] = [
    [-1.55, -0.55, 0.75],
    [1.55, -0.55, 0.75],
    [-1.55, -0.55, -0.75],
    [1.55, -0.55, -0.75],
  ];

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Stage 1 — Raw Steel: unformed stock, consumed as the chassis appears. */}
      <group ref={rawSteelRef} position={[0, -0.3, 0]}>
        <mesh position={[-0.6, 0, 0]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[1.6, 0.12, 0.3]} />
          <meshStandardMaterial color="#3A3D42" metalness={0.6} roughness={0.55} />
        </mesh>
        <mesh position={[0.5, 0.15, 0.2]} rotation={[0, 0.3, -0.05]}>
          <boxGeometry args={[1.3, 0.1, 0.28]} />
          <meshStandardMaterial color="#3A3D42" metalness={0.6} roughness={0.55} />
        </mesh>
      </group>

      {/* Stage 2 — Steel Chassis. */}
      <mesh ref={chassisRef} position={[0, -0.5, 0]}>
        <boxGeometry args={[3.6, 0.18, 1.3]} />
        <meshStandardMaterial color="#16171A" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Stage 3 — Vehicle Frame: vertical ribs along the chassis. */}
      <group ref={ribsRef}>
        {[-1.3, -0.65, 0, 0.65, 1.3].map((x, i) => (
          <mesh key={i} position={[x, 0.0, 0]}>
            <boxGeometry args={[0.06, 1.0, 1.3]} />
            <meshStandardMaterial color="#2A2C30" metalness={0.85} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Roof rail completes the skeletal cage ahead of Stage 4 — Body Construction. */}
      <mesh ref={roofRailRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[3.5, 0.08, 1.3]} />
        <meshStandardMaterial color="#2A2C30" metalness={0.85} roughness={0.4} />
      </mesh>

      {/* Stage 4 — Body Construction (material grades through Stage 6 — Premium Painting). */}
      <RoundedBox ref={bodyRef} args={[3.3, 1.15, 1.35]} radius={0.14} position={[0, 0.22, 0]}>
        <meshStandardMaterial ref={bodyMaterialRef} color="#4A4E54" metalness={0.8} roughness={0.42} />
      </RoundedBox>

      {/* Stage 7 — Interior Assembly: tinted window band. */}
      <RoundedBox ref={windowRef} args={[3.05, 0.42, 1.42]} radius={0.08} position={[0.05, 0.5, 0]}>
        <meshStandardMaterial color="#22D3E8" metalness={0.2} roughness={0.1} transparent opacity={0} />
      </RoundedBox>

      {/* Exterior completion (trim, headlights, wheels) — timed to read as finished by Stage 8 — Quality Inspection. */}
      <RoundedBox ref={trimRef} args={[3.32, 0.04, 1.37]} radius={0.02} position={[0, 0.02, 0]}>
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.25} />
      </RoundedBox>

      <group ref={detailRef}>
        <mesh position={[1.68, -0.05, 0.45]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#F6F6F4" emissive="#F6F6F4" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[1.68, -0.05, -0.45]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#F6F6F4" emissive="#F6F6F4" emissiveIntensity={0.6} />
        </mesh>
        {wheelPositions.map((pos, i) => (
          <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.26, 24]} />
            <meshStandardMaterial color="#0A0A0B" metalness={0.5} roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
