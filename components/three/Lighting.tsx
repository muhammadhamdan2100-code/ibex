"use client";

import { Environment } from "@react-three/drei";

/**
 * Studio three-point lighting rig, tuned toward a matte-black / gold /
 * steel material palette so future vehicle/SPV models read as premium
 * engineering hardware rather than a flat product render.
 */
export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        color="#F6F6F4"
        castShadow
      />
      <directionalLight position={[-6, 2, -4]} intensity={0.6} color="#C9A24B" />
      <pointLight position={[0, -2, 4]} intensity={0.3} color="#4A4E54" />
      <Environment preset="city" />
    </>
  );
}
