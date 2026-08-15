# IBEX VEHICLE RESTORATION — Dependency Fix Report

---

## Important caveat, upfront

This sandbox has no network access, so I could not literally run
`npm install` here to get a runtime-verified confirmation. What follows
is based on directly inspecting the published package metadata for the
exact versions involved (fetched `@react-three/postprocessing@3.0.4`'s
real `package.json` from its GitHub source, and cross-checked against a
third-party package's `peerDependencies` block that pins the same
ecosystem combination) — not a guess, but also not something I ran
myself. **Please run `npm install` locally and report back exactly what
happens** — that's the only way to get a truly verified "yes, this
installs cleanly."

---

## 1. Root Cause

`@react-three/postprocessing` has a hard version split:

- **v2.x** — built for `@react-three/fiber` v8 / React 18. Peer-depends on `@react-three/fiber@^8`.
- **v3.x** — dropped React 18 support entirely; requires `@react-three/fiber` v9 / React 19.

The project's `package.json` had `"@react-three/postprocessing": "^2.16.3"` (a version range that resolves to a v2.x release) alongside `"@react-three/fiber": "^9.6.1"`. npm's resolver correctly refused to reconcile a package that peer-requires fiber v8 with a project that has fiber v9 installed — that's exactly the reported ERESOLVE error, and it's a genuine version mismatch, not something `--force`/`--legacy-peer-deps` should paper over.

**This was introduced in the Phase 3 pass that added bloom post-processing** — I pinned the wrong major version range at the time.

While fixing it, inspecting `@react-three/postprocessing@3.0.4`'s own published `package.json` surfaced a second, related issue: it depends on `postprocessing@^6.36.6`, and a verified peer-dependency set for this exact ecosystem combination (fiber ^9.0.4 / postprocessing wrapper ^3.0.4 / postprocessing ^6.36.4 / react >=19.0) requires **`three@>=0.170.0`**. The project had `three@^0.169.0` — one minor version below that floor. Not the cause of the reported ERESOLVE error itself, but a latent conflict that would have surfaced immediately after fixing the first one.

## 2–4. Packages Changed

| Package | Old | New | Reason |
|---|---|---|---|
| `@react-three/postprocessing` | `^2.16.3` | `^3.0.4` | v2.x requires fiber v8; only v3.x supports fiber v9/React 19, which every other R3F package in this project already requires |
| `postprocessing` | `^6.36.4` | `^6.36.6` | Matches the exact floor `@react-three/postprocessing@3.0.4` itself depends on (confirmed from its published `package.json`) |
| `three` | `^0.169.0` | `^0.170.0` | Verified floor for this fiber v9 / postprocessing v3 combination — `^0.169.0` was one minor version short |
| `@types/three` | `^0.169.0` | `^0.170.0` | Kept in lockstep with `three` itself |

No packages were removed — the conflict was a version-range problem, not a package that needed dropping. `react`, `react-dom`, `next`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `framer-motion`, `@studio-freight/lenis`, and every non-3D package were audited and are not implicated in this conflict (see table below) — left unchanged.

## 5. Why These Versions Are Compatible

- Fetched `@react-three/postprocessing@3.0.4`'s actual `package.json` from its GitHub source: its own `devDependencies` list `"@react-three/fiber": "^9.0.4"` and its `dependencies` list `"postprocessing": "^6.36.6"` — directly confirms it's built for the fiber v9 line and pins its own `postprocessing` floor to exactly what this project now specifies.
- Cross-checked against `@takram/three-geospatial-effects`, a real published package whose `peerDependencies` pin this exact combination: `"@react-three/fiber": ">=9.0.4"`, `"@react-three/postprocessing": ">=3.0.4"`, `"postprocessing": ">=6.36.4"`, `"react": ">=19.0"`, `"three": ">=0.170.0"` — independent confirmation of the same floor from a different maintainer.
- `@react-three/fiber@^9.6.1` and `@react-three/drei@^10.7.7` (both unchanged) already satisfy the `>=9.0.4` requirement above — no further changes needed there.

## 6. Final Dependency Table

| Package | Version | Role |
|---|---|---|
| `next` | `16.0.0` | Framework |
| `react` / `react-dom` | `19.0.0` | Required by Next 16 and by `@react-three/fiber@9` |
| `three` | `^0.170.0` | Core 3D engine |
| `@react-three/fiber` | `^9.6.1` | React renderer for Three.js (v9 line = React 19) |
| `@react-three/drei` | `^10.7.7` | R3F helpers (v10 line = fiber v9) |
| `@react-three/postprocessing` | `^3.0.4` | Bloom/post-processing wrapper (v3 line = fiber v9) |
| `postprocessing` | `^6.36.6` | Underlying post-processing engine |
| `gsap` | `^3.12.7` | Animation (framework-agnostic, no peer conflict possible) |
| `framer-motion` | `^11.11.17` | UI motion (broad React peer range, compatible with React 19) |
| `@studio-freight/lenis` | `^1.0.42` | Smooth scroll (no React peer dependency) |
| `typescript` | `^5.6.3` | — |
| `tailwindcss` | `^3.4.14` | — |
| `eslint` / `eslint-config-next` | `^9.14.0` / `16.0.0` | — |

Every row is either unchanged from before (and was never implicated in this conflict) or one of the four fixes above.

## 7. Confirmation

**Not yet independently verified by actually running `npm install`** — no network access in this sandbox, as noted at the top. What I can confirm: the specific version combination now in `package.json` matches, field-for-field, the real published dependency declarations of `@react-three/postprocessing@3.0.4` itself and an independent third-party package's peer requirements for the same ecosystem — the strongest verification available without executing the install.

**Please run, and paste back the output of, each of these in order:**
```
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```
If `npm install` still reports a conflict, paste the exact error — at that point it'd most likely be a downstream transitive peer dependency I don't have visibility into from static package.json inspection alone, and I'll trace it from the actual resolver output rather than guessing again.
