# IBEX VEHICLE RESTORATION — Phase 3 Report
## Cinematic 3D Manufacturing Experience

---

## Honest Scope Disclosure (read this first)

This phase's brief describes effects — robotic welding arms, laser
scanning, industrial smoke simulation, literal cranes, true volumetric
HDR lighting — that need a real 3D art and VFX pipeline (modeled/rigged
assets, simulated fluids, baked lighting) to build properly. None of that
exists as an input to this project, and faking the *appearance* of having
built it (e.g. claiming a particle sprite is "smoke simulation," or a
static plane is "real-time reflection") would be dishonest about what's
actually running in the browser. So here's a plain mapping of brief →
reality:

| Brief asked for | What's actually running |
|---|---|
| Robotic welding arms | A particle spark burst (`WeldingSparks`) at the chassis during Stage 2 — no welding-arm geometry exists |
| Industrial smoke | Not built — a real smoke look needs either simulated fluids or a sprite-sheet texture asset, neither of which exist here. Flagged as a gap, not faked with a placeholder that wouldn't read as smoke anyway |
| Laser scanning (Quality Inspection) | The stage's camera does a distinct rear-reveal shot with brighter, cooler lighting — no literal scan-line visualization |
| Volumetric fog | Real Three.js linear `<fog>` (genuine depth cueing) — not raymarched volumetric fog, which is a materially different (and much more expensive) technique |
| HDR lighting | Real `Environment` (image-based lighting) + real bloom post-processing (`@react-three/postprocessing`) — genuine techniques, just not full HDR tonemapping pipeline |
| Reflective floor | A static high-metalness plane relying on the environment map — not drei's `<Reflector>` (true real-time planar reflection), which would cost a second scene render every frame. Explicit trade-off given this phase's own 60fps target |
| Nine unique camera angles | Real — `HERO_STAGES[i].cameraPosition`, one per stage, matching the brief's own nine examples (wide/close-up/top-down/front reveal/wheel close-up/paint reflections/interior fly-through/rear reveal/final orbit) in order |
| Smooth, no-hard-cut transitions | Real — `ManufacturingStageRig` lerps camera + lighting every frame between whichever two stages the scroll position sits between |

Everything in the second column is real, working code, gated by device
performance tier, and reviewed below. Nothing is a mockup or a static
image pretending to be interactive.

---

## 1. Error Audit (before any new work)

Re-ran the full regression checklist used every prior phase: no broken
imports, no hook usage missing `"use client"`, no `metadata`/`"use
client"` conflicts, no duplicate default exports. All clean — no carry-
over errors from Phase 2 Revision to fix before starting.

## 2. What Was Built

**Stage data** (`lib/data/hero-stages.ts`) — updated to this phase's
exact nine stages (Raw Steel → Steel Chassis → Vehicle Frame → Body
Construction → Surface Preparation → Premium Painting → Interior
Assembly → Quality Inspection → Finished Luxury Coach), each with a short
premium `title` (drawn from the brief's own examples — Precision
Engineering, Advanced Fabrication, etc.), a `shot` type matching the
brief's nine camera-angle examples in order, and a camera
position/lighting mood.

**Camera & lighting** (`ManufacturingStageRig`, unchanged mechanism from
Phase 2 Revision, new per-stage values) — continuous per-frame lerp
between stages, reading a mutable ref rather than React state so scroll
doesn't trigger component re-renders.

**Progressive assembly** (`BusManufacturingMesh`) — reveal thresholds
retimed for the new stage boundaries (Body Construction now explicitly
owns the body-panel reveal window). Extracted the shared smoothstep/
stage-units math into `lib/three-utils.ts` so it isn't duplicated across
the mesh and the new particle components.

**New this phase:**
- `ParticleField` — ambient floating-dust points, count driven by
  `useThreePerformance().particleDensity`.
- `WeldingSparks` — a spark burst at the chassis, opacity following the
  same stage-reveal smoothstep as everything else (bright during Stage 2,
  genuinely fades outside that window rather than toggling visibility).
- `ReflectiveFloor` — static metallic plane (see trade-off above).
- `HeroPostFX` — real bloom via `@react-three/postprocessing`
  (`EffectComposer` + `Bloom`), high performance-tier only.
- Progress bar — a DOM element whose width is set directly inside the
  existing `ScrollTrigger.onUpdate` callback (same ref-based, no-React-
  state pattern already used for the camera rig), not a second scroll
  listener.
- Fading stage titles — a `key`-remount on stage change restarts a CSS
  fade-in keyframe (`.stage-title-enter`), respecting
  `prefers-reduced-motion`.
- Final-stage reveal — logo + "Rebuild With Trust" fade in only once
  `activeIndex` reaches the last stage.
- Stage rail reformatted to the brief's `01 RAW STEEL` two-digit style.

## 3. Performance Gating (`useThreePerformance`, extended)

Added explicit `particles` (bool), `particleDensity` (0/0.5/1), and
`postFX` (bool) fields per tier:

| Tier | Particles | Density | Bloom |
|---|---|---|---|
| Low | Off | — | Off |
| Medium | On | 0.5× | Off |
| High | On | 1× | On |

`postFX` is withheld outside the high tier deliberately — an
`EffectComposer` pass is the single most expensive toggle available here
(a second render pass), so per this phase's 60fps target it's tuned down
by being disabled entirely rather than left on at reduced quality.
Coarse-pointer devices (effectively all phones/tablets) cap at "medium"
regardless of core count in the existing tier logic, which already
satisfies "lightweight version, preserved storytelling" for mobile — the
stage readout text and camera/lighting motion are identical on every
tier; only the decorative particle/bloom layer scales down.

## 4. Remaining Recommendations

- As every prior phase: run `npm install && npm run typecheck && npm run lint && npm run build` and Lighthouse locally — no renderer or network access exists in this session to verify frame rate or bundle size directly.
- `postprocessing`/`@react-three/postprocessing` are new dependencies this phase — worth double-checking their resolved versions against the installed `@react-three/fiber`/`three` versions after `npm install`, since this ecosystem's version compatibility moves quickly.
- The particle systems and bloom are genuinely new GPU work — if a real device profiling session shows the "medium" tier isn't hitting 60fps on a representative mid-range phone, the next lever to pull is `particleDensity`, not re-adding tiers.
- If real modeled vehicle assets become available in a future phase, `BusManufacturingMesh`'s reveal-timing system (`lib/three-utils.ts`) is built to be swapped onto real geometry without needing to rebuild the choreography around it.
