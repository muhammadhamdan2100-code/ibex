# IBEX VEHICLE RESTORATION — Phase 2 Revision Report
## Complete Navbar & Hero Redesign

---

## Honest Scope Note (read this first)

This revision asks for the 3D animation to "smoothly transform" a vehicle
through nine realistic stages with new camera angles, lighting, and
environments at each one. What's actually deliverable through code alone,
without real modeled/sculpted 3D assets or a texture/materials pipeline,
is: **a real, smooth, scroll-driven progressive assembly** — parts fade
and scale in on individual timelines, the body's material genuinely
grades from raw steel to a painted finish, and the camera + lighting
smoothly interpolate between nine distinct positions/moods, all reading
`scroll progress` every frame (not React state, not a discrete per-stage
jump). What it is **not** is a geometric morph between nine
photorealistic, fully-detailed vehicle models — that needs actual 3D
modeling work this project doesn't have inputs for. `BusManufacturingMesh`
and `ManufacturingStageRig`'s doc comments both say this explicitly, so
nobody downstream mistakes the blockout for a finished asset.

---

## 1. Navbar

- **Left:** Logo + two-line **"IBEX VEHICLE / RESTORATION"**, stacked (not compressed, not overlapping) via a `flex-col` span — matches the explicit line-break requirement.
- **Center — reduced to 6 top-level items** (Home, Company, Solutions, Projects, Gallery, Contact) + CTA, exactly as specified. This is a materially better fix for the crowding complaint than the width-override hack from the prior revision: with only 6 short items, the full row (logo + two-line name + nav + CTA) comfortably fits the **standard shared `Container`** (1440px cap) at a normal `lg` (1024px) breakpoint — no more special-casing the navbar's own max-width or padding. Reverted those overrides.
- **Company mega menu:** About, Vision & Mission, Manufacturing, Quality Standards, Government Registrations, CSR — exactly as specified. About/Manufacturing/Government/CSR link to existing pages; Vision & Mission and Quality Standards are new anchored sections added to the About page (`#vision-mission`, `#quality-standards`).
- **Solutions mega menu:** Commercial Vehicles, Luxury Coaches, Ambulances, Mobile Clinics, Motorhomes, Food Trucks, Refrigerated Vehicles, Electric Vehicles, Custom Engineering, Fuel Calculator — exactly as specified, now a 2-column panel (added a column-count switch in `MegaMenu` for menus over 6 items) so a 10-entry dropdown doesn't become an oversized single column. Fuel Calculator links straight to its existing page; the other nine are new anchored cards on a rebuilt `/solutions` page.
- Pages that are no longer in the top nav or either mega menu (What We Do, Collaborations) are still real, still indexed — surfaced through a rebuilt Footer instead of being orphaned.

## 2. Hero Section

- **Split layout:** left column (tagline, large heading, short honest description, two CTAs, and a live stage readout), right column (3D mount point). Matches the brief's explicit left/right structure.
- **3D always centered, never in a corner:** the mount point is its own grid column with `items-center` — not an absolutely-positioned full-bleed background layer behind the text anymore (that was the prior revision's approach, and reads as "model tucked in a corner" once there's a real text column beside it).
- **Camera always focused on the vehicle:** `ManufacturingStageRig` calls `camera.lookAt(0, 0.1, 0)` every frame, unconditionally.
- **Nine stages, correctly ordered and described** (`lib/data/hero-stages.ts`): Raw Steel → Steel Chassis → Vehicle Frame → Bus Skeleton → Body Panels → Painting → Interior → Luxury Coach → Finished Vehicle. Descriptions are generic, standard descriptions of what each named stage means in a manufacturing process — not specific claims about IBEX's own facility or capacity.
- **New camera angle + lighting + labels + description per stage, smoothly:** `ManufacturingStageRig` reads a mutable `progressRef` (not React state — see performance note below) inside `useFrame` and lerps the actual camera position and a dedicated light trio (ambient/key/rim, color + intensity) toward whichever two stages the scroll position sits between. `BusManufacturingMesh` does the equivalent for parts (smoothstep scale/opacity reveal per part) and for the body's material (steel-grey → painted graphite, gloss/metalness shift). Stage number/label/description in the left column update via `activeIndex`. Caught and fixed two real bugs while building this (see below).
- **Background:** existing `data-tone="hero"` layered gradient (soft cyan + magenta glows) plus the blueprint-grid texture, now also a genuine Three.js depth `<fog>` inside the Canvas for real (if modest — linear fog, not raymarched volumetrics) atmospheric depth. Described honestly as depth fog, not oversold as "volumetric."

## 3. Bugs Found & Fixed (this session, before shipping)

| # | Bug | Fix |
|---|---|---|
| 1 | Color-lerp bug in `ManufacturingStageRig`: `tmpColor.set(a).lerp(tmpColor.set(b), t)` mutates and reads the *same* object reference — by the time `.lerp()` runs, both sides already equal `b`, so the "interpolation" silently always resolved to the target color with zero blending. | Two distinct scratch `Color` objects (`tmpA`/`tmpB`), computed and lerped explicitly before being applied. |
| 2 | Ambient light intensity was bound to a plain mutable ref's nested value in JSX (`intensity={ambientRef.current.intensity}`) — React never re-reads a ref mutation, so the light would have silently never changed after first mount despite the interpolation math running every frame. | Used a proper ref to the actual `AmbientLight` Three.js instance (same pattern as the key/rim lights) and mutated `.intensity` directly inside `useFrame`. |
| 3 | `CanvasWrapper` unconditionally mounts the default `Lighting` (ambient + 2 directional + Environment) — adding `ManufacturingStageRig`'s own lights on top would have stacked both, likely washing out the scene rather than giving clean per-stage mood control. | Added a `lighting` opt-out prop to `CanvasWrapper`; Hero passes `lighting={false}` and `ManufacturingStageRig` is now the Hero's sole (complete, including its own `Environment`) lighting rig. |
| 4 | First draft of the Hero heading used a needlessly convoluted `.replace().split().reduce()` chain on the all-caps legal name — produced the wrong case (`IBEX VEHICLE RESTORATION` instead of the brief's `IBEX Vehicle Restoration`) and was harder to read than necessary. | Added a clean `COMPANY.displayName` constant with the correct title case; heading is now a direct reference. |
| 5 | Sitemap regression risk: deriving `sitemap.ts` from the now-6-item `NAV_MENU` (as the prior revision did) would have silently dropped real pages (About, Manufacturing, Government, CSR, etc. — now reached via mega menus, not the top-level array) from search indexing. | Restored an explicit route list in `sitemap.ts`, decoupled from nav structure — nav is about UX, sitemap is about every indexable URL, and conflating them was itself the bug. |

## 4. Regression Sweep (after all changes)

Re-ran the full audit checklist used every prior phase against every file touched this round: no broken imports, no leftover references to removed components (`WhatWeDoGrid`, `BusBlockoutMesh`), no hook usage missing `"use client"`, no `metadata`/`"use client"` conflicts, no duplicate default-export names, no unused imports (heuristic scan), every external package import still covered by `package.json` (no new dependencies were needed), sitemap routes verified against the actual `app/` route folders.

## 5. Other Changes

- **`CategoryGrid`** replaces `WhatWeDoGrid` — the same card-grid pattern generalized to accept any category list, now shared by What We Do (all 6), Manufacturing (a filtered subset), and Solutions (the new 9-category vehicle taxonomy) instead of three near-duplicate components.
- **Footer rewritten** to mirror the new nav structure: Company and Solutions columns show their mega-menu entries directly, plus an "Explore" column for What We Do/Collaborations/Projects/Gallery — nothing is left unreachable now that the top nav is slimmer.
- **`Section` now applies `scroll-mt-24` whenever it has an `id`** — a general fix (not a one-page patch) so every anchor link on the site (Company/Solutions mega menus, category-grid cards) lands below the fixed navbar instead of behind it.

## 6. Remaining Recommendations

- As always: run `npm install && npm run typecheck && npm run lint && npm run build` and Lighthouse locally — this review is static/manual, no renderer or network access exists in this session.
- The mega-menu panel widths/positions (`MegaMenu.tsx`) are sized from careful estimates, not a browser-verified measurement — worth a visual check at real 1024–1280px widths, particularly the 2-column Solutions panel.
- `BusManufacturingMesh` remains a blockout (primitive geometry), now with genuine progressive assembly and material grading — the natural next step, whenever real assets exist, is swapping individual primitives for modeled parts without needing to touch the reveal/timing system around them.
