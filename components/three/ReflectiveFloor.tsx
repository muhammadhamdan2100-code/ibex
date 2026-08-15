"use client";

/**
 * Reflective factory floor beneath the bus.
 *
 * Deliberately a static high-metalness/low-roughness plane rather than
 * drei's `<Reflector>` (a genuine real-time planar reflection, which
 * renders the scene a second time from a mirrored camera every frame).
 * That's a real, meaningful frame-cost for what's a background element —
 * given this phase's explicit 60fps target, the environment-map-based
 * approach here gets a comparable "reflective metal floor" read for a
 * fraction of the cost. Worth revisiting if a future pass has GPU budget
 * to spare.
 */
export default function ReflectiveFloor() {
  return (
    <mesh position={[0, -0.86, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[24, 24]} />
      <meshStandardMaterial color="#0A0A0B" metalness={0.75} roughness={0.22} />
    </mesh>
  );
}
