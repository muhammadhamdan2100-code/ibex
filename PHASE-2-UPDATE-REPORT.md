# IBEX VEHICLE RESTORATION — Phase 2 Update Report
## Premium Navbar, Loading & Bus Animation Refinement

---

## 1. Errors / Issues Found & Fixed

| # | Issue | Root cause | Fix |
|---|---|---|---|
| 1 | **Navbar felt crowded / misaligned even at wide viewports** — the actual root cause, not just raw viewport width. | The Navbar's row was wrapped in the shared `<Container>`, which caps at **1440px max-width regardless of viewport**. With 12 nav items + mega-menu chevrons + a CTA, the content needed well over 1440px, so it was always fighting the same ceiling no matter how wide the screen got. | Gave the Navbar's own `<Container>` usage a wider, navbar-specific override (`max-w-[1900px]`, tighter `px-5 lg:px-8` padding) instead of touching the shared `Container` component — page content sections keep their normal 1440px cap, only the nav row gets more room. |
| 2 | Fuel Calculator input text unreadable (black-on-dark). | The component-level class already said `text-white`, so the bug wasn't there — it's the classic cross-browser gap where native `<input>`/`<textarea>` rendering (especially autofill) can ignore an ancestor's dark theme without an explicit `color-scheme`, plus Chrome/Edge's autofill styling forces black text + a light background unless the `-webkit-autofill` pseudo-class is explicitly neutralized. | Set `color-scheme: dark` site-wide; added an unconditional `input, textarea, select { color; caret-color }` rule in the base layer (guarantees correctness independent of any per-component utility class); added a proper `-webkit-autofill` override. Fixed at the element level, not just patched in one component — so this can't recur on any future form field. |
| 3 | Duplicate `inputClass` string independently defined in both `FuelCalculator.tsx` and `ContactForm.tsx`. | Copy-pasted during Phase 1.1/2. | Extracted a shared `components/ui/Input.tsx` (`Input` + `Textarea`), refactored both forms to use it — one definition, glass surface + premium border + strong focus state, per this phase's explicit styling requirements. |
| 4 | Hero's placeholder mesh was an icosahedron — explicitly forbidden by this phase's "no abstract geometry, everything must revolve around bus manufacturing" requirement. | Reasonable placeholder choice at the time (Phase 2), superseded by this update's explicit constraint. | Replaced with `BusBlockoutMesh` — chassis rail, coach body, tinted window band, gold trim, headlights, and four wheels, all built from named vehicle parts, not abstract primitives. |
| 5 | `HERO_STAGES` was still the Phase 2 five-stage list (Steel→Frame→Chassis→Body→Luxury Coach) — the order and stage count changed in this update. | Brief evolved between phases. | Updated to the current six-stage order: Steel → Chassis → Frame → Body → Luxury Coach → Finished Vehicle. |
| 6 | Loading screen was static (logo + text only), not the cinematic bus-inspired experience this phase asks for. | Explicitly deferred in Phase 1 ("no animation yet"). | Rebuilt: an SVG bus silhouette that draws itself in (chassis outline → window band → wheels, staggered), a pulsing headlight, an industrial light sweep across the silhouette, and a metallic shimmer progress line — all CSS/SVG, no added JS bundle weight. Deliberately *indeterminate* rather than a fabricated percentage, since there's still no real asset weight to report progress against. |

## 2. Full Regression Sweep (after all changes above)

Re-ran the complete audit checklist used in prior phases against every file touched this round:
- Every `@/` import resolves to a real file — verified.
- No lingering references to the removed `HeroPlaceholderMesh` — verified (zero matches).
- No remaining duplicate `inputClass` definitions — verified (zero matches).
- No hook usage in a file lacking `"use client"` — verified, including the two new/changed client files (`Input.tsx` needed none — it's a plain forwardRef component; `BusBlockoutMesh.tsx` correctly has it for `useFrame`).
- `app/globals.css` — brace/paren balance verified after the new keyframe blocks.

## 3. Navbar

- **Left:** Logo + **"IBEX VEHICLE RESTORATION"** only — no `(Private) Limited`, no city/country — exactly as specified. `COMPANY.navDisplayName` added as a distinct constant from the full legal name, so this doesn't collide with where the legal name is correctly still shown in full (About page, Footer).
- **Center:** all 12 items on one line, no wrapping — fixed at the actual root cause (see #1 above), not just by hiding items at smaller widths. Spacing tightened (`gap-4`, dropped `tracking-wide` on the list) for a denser, more premium feel; still gated to the `2xl` (1728px) breakpoint below which the overlay menu takes over — with 12 items plus the now-longer company name, no realistic sub-2xl width fits everything without wrapping or clipping, so this remains the honest choice rather than forcing a cramped fit.
- **Right:** "Request Consultation" — unchanged from the prior premium variant (glass, gold gradient border, magnetic hover), still right-aligned via the same flex row.
- Fixed a real narrow-phone overflow risk in the mobile menu header: the longer company name is now `truncate`d with `min-w-0` on its flex row instead of being allowed to overflow on the smallest screens (this wasn't an issue with the old short "IBEX VR" label, but the new required name is long enough to matter).

## 4. Bus Animation Compliance

- Removed the only abstract-geometry mesh in the codebase (the Hero's icosahedron).
- `BusBlockoutMesh` is the sole 3D object mounted anywhere on the site, and it's built entirely from labeled vehicle parts (chassis, body, windows, wheels, headlights) — nothing that reads as a generic shape.
- `HERO_STAGES` now matches the specified six-stage journey. Per this and the prior phase's explicit instruction, only the *scaffold* (stage tracking, mesh mount point) is built — actual per-stage visual transformation is still future work, and remains so deliberately.

## 5. Fuel Calculator

- Inputs now render white text with a visible `white/35` placeholder, a glass surface, a visible `white/15` border, and a gold-tinted focus state (`focus:border-gold-500/70` + focus ring) — matches every requirement in this phase's list (readable, glass, premium border, proper focus state, high contrast).
- The underlying color-scheme/autofill fix (see #2) also covers this without needing per-field patches.

## 6. Loading Screen

- Cinematic, bus-themed, IBEX logo retained per brand-hierarchy rule (Logo 1 only).
- All animation is plain CSS/SVG — no GSAP/Three.js dependency for the loader itself, keeping the critical first-paint bundle light.
- Fully respects `prefers-reduced-motion`: the draw-in completes instantly, the sweep and headlight pulse are disabled, and the progress bar shows as a solid (not animated) fill.

## 7. Remaining Recommendations

- As with every prior phase: run `npm install && npm run typecheck && npm run lint && npm run build` locally, then Lighthouse against the production build — no network access was available in this session to verify the 90+ target directly.
- Visually spot-check the Navbar at exactly 1728–1900px viewport widths on a real display — the width math behind the `max-w-[1900px]` override is a careful estimate, not a browser-verified measurement, since this sandbox has no renderer.
- `BusBlockoutMesh` is still a blockout (unpainted, single idle rotation) — matches this phase's "prepare the foundation, don't complete the transformation" framing, but should be the first thing revisited once real staged models/materials are ready.
