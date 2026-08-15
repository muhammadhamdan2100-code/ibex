# IBEX VEHICLE RESTORATION — PHASE 1.1
## Foundation Refinement, Design System Update & Bug/Code-Quality Audit

This report covers two things done together in this pass: (A) the
bug/code-quality audit requested as high priority, and (B) the Phase 1.1
feature/design additions. The audit was performed first, on the Phase 1
codebase, before any new feature code was added.

---

## A. BUG / CODE-QUALITY AUDIT

### 1. Errors Found

| # | Error | File(s) |
|---|---|---|
| E1 | `npm install` fails with `ERESOLVE` — `@react-three/fiber@^8` and `@react-three/drei@^9` only support React 18, project uses React 19 | `package.json` |
| E2 | Turbopack build error: *"This build is using Turbopack, with a `webpack` config and no `turbopack` config"* | `next.config.ts` |
| E3 | `CssSyntaxError`: `@apply border-white/10` fails inside `@layer base` | `app/globals.css` |
| E4 | `eslint.config.mjs` imports `@eslint/eslintrc`, which was never added as a dependency — lint would fail to even load its config | `package.json` |
| E5 | `components/three/CanvasWrapper.tsx` imported a named type `CanvasProps` from `@react-three/fiber` that is not part of the v9 type exports (only existed in the v8 line pinned in the original `package.json`, which itself was the cause of E1) | `components/three/CanvasWrapper.tsx` |

*(E1–E3 were reported live during setup on the client's machine and fixed in the same session; E4–E5 were found during this audit before they could surface.)*

### 2. Warnings Found

| # | Warning | File(s) |
|---|---|---|
| W1 | `react-hooks/rules-of-hooks`: `useGLTF.preload(...)` called inside a function (`preloadAsset`) whose name doesn't start with `use`, which the hooks linter flags as hook-shaped and misused | `components/three/Scene.tsx` |
| W2 | React SSR console warning: *"useLayoutEffect does nothing on the server"* | `hooks/useGsap.ts` |
| W3 | Next.js image warning: `<Image fill>` without a `sizes` prop | `components/ui/Loader.tsx`, `components/layout/Navbar.tsx` (×2), `components/layout/Footer.tsx` |
| W4 | Next.js startup warning: `baseline-browser-mapping` data is stale | build output (not a source file) |
| W5 | Mount-order race: `ScrollTrigger.batch()` (used by the new `useScrollReveal` hook) could run before `registerGsap()` had registered the plugin, because React fires a child component's mount effects before its parent's — `PageWrapper` (parent) called `registerGsap()` inside `useEffect`, while a page's own client component (child) could call a hook depending on `ScrollTrigger` in its own effect first | `lib/gsap.ts`, `components/layout/PageWrapper.tsx` |
| W6 | 12-item flat nav list would visually overflow/wrap at laptop widths (1024–1279px) once the Phase 1.1 nav map was applied | `components/layout/Navbar.tsx` |

### 3. Root Cause & 4. Solution Implemented

- **E1** — Root cause: `package.json` pinned `@react-three/fiber@^8.17.10` / `@react-three/drei@^9.114.3`, both React-18-only. Solution: bumped to `@react-three/fiber@^9.6.1` and `@react-three/drei@^10.7.7`, the first major versions with React 19 peer support.
- **E2** — Root cause: Next.js 16 defaults to Turbopack; a custom `webpack()` function with no matching `turbopack` key makes Next assume a possibly-stale config. Solution: replaced the `webpack()` asset-loader stub with an explicit `turbopack: {}` (no `.glb` loader was in use yet anyway — real model-loading rules will be added as Turbopack `rules` in Phase 3 when actual `.glb` files exist).
- **E3** — Root cause: the opacity-modifier utility `border-white/10` used via `@apply` on a universal selector (`*`) did not resolve correctly against the installed Tailwind/PostCSS toolchain. Solution: replaced with the equivalent plain CSS (`border-color: rgba(246,246,244,0.1)`), removing the fragile `@apply` pattern entirely rather than chasing a version-specific workaround.
- **E4** — Root cause: `eslint.config.mjs` was written using `FlatCompat` from `@eslint/eslintrc` but that package was never listed in `package.json`. Solution: added `@eslint/eslintrc` to `devDependencies`.
- **E5** — Root cause: fixed as a side effect of E1's version bump; the type import was updated in the same pass. Solution: replaced the named `CanvasProps` import with `ComponentProps<typeof Canvas>`, which is derived directly from whatever the installed `Canvas` component actually accepts — immune to that type being renamed/removed in a future version.
- **W1** — Root cause: ESLint's `react-hooks` plugin flags any call matching `use[A-Z]...` (including a namespaced call like `useGLTF.preload`) as hook-shaped, regardless of whether it's a real hook; the wrapping function must itself follow hook naming. Solution: renamed `preloadAsset` → `usePreloadAsset`.
- **W2** — Root cause: `useLayoutEffect` executing during a server render (even a no-op) triggers a React console warning specifically because layout effects can't run on the server. Solution: added `useIsomorphicLayoutEffect` to `lib/utils.ts` (resolves to `useLayoutEffect` client-side, `useEffect` server-side) and switched `useGsap` to use it — the standard, permanent fix for this warning rather than suppressing it.
- **W3** — Root cause: Next.js requires `sizes` on any `fill`-mode image so it can compute correct responsive `srcset` weighting; omitting it is flagged because the image would otherwise be over-fetched. Solution: added an appropriately-scoped `sizes` value to every `fill` usage (logo images are small and fixed-size, so each got a tight `sizes` matching its rendered box).
- **W4** — Root cause: the pinned Node/Next toolchain ships a `baseline-browser-mapping` snapshot that ages out. Solution: added `baseline-browser-mapping@latest` to `devDependencies` so `npm install` pulls a current snapshot.
- **W5** — Root cause: relying on a parent component's `useEffect` to guarantee a library is registered before any child's `useEffect` runs is backwards — React commits/fires effects child-first. Solution: moved `registerGsap()` to also run at **module-evaluation time** in `lib/gsap.ts` (guarded for SSR via `typeof window === "undefined"`), so the plugin is registered the moment any client component imports the module — before any component's effects execute, regardless of tree position. `PageWrapper`'s explicit call remains as a harmless, idempotent no-op for clarity.
- **W6** — Root cause: the Phase 1.1 nav map has 12 items, which was never going to fit the Phase 1 navbar's `lg:flex` flat-list layout. Solution: moved the flat list (and the inline "Request Consultation" button) to the `2xl` breakpoint only; every width below that uses the overlay menu, which was also changed from a fixed `max-h-96` to a viewport-relative, scrollable `max-h-[calc(100vh-5rem)]` so all 12 items are reachable on short viewports. Documented in-code as a recommendation to group items behind a dropdown in Phase 2.

### 5. Files Modified (audit portion only)

```
package.json                          — dependency version fixes (E1, E4, W4)
next.config.ts                        — turbopack config (E2)
app/globals.css                       — @apply fix (E3)
components/three/CanvasWrapper.tsx    — type import fix (E5)
components/three/Scene.tsx            — hook-naming fix (W1)
lib/utils.ts                          — added useIsomorphicLayoutEffect (W2)
hooks/useGsap.ts                      — use isomorphic effect (W2)
components/ui/Loader.tsx              — sizes prop (W3)
components/layout/Navbar.tsx          — sizes props + breakpoint rework (W3, W6)
components/layout/Footer.tsx          — sizes prop (W3)
lib/gsap.ts                           — module-level registration (W5)
```

### 6. Verification Performed

- Re-read every modified file after editing to confirm the change matches the diagnosed root cause (no speculative edits left unverified).
- Cross-checked `@react-three/fiber@9` / `@react-three/drei@10` React-19 peer support via their published release notes before pinning.
- Traced the effect-ordering issue (W5) against React's documented commit-phase ordering (children before parents) rather than assuming; fixed at the module level so it can't recur as more `useEffect`-based GSAP hooks are added in later phases.
- Confirmed via `grep` that no other `next/image fill` usage was missed (W3) and that no other `@apply` directive in `globals.css` uses an opacity-modifier utility that could hit the same failure as E3.
- This was **not** run through an actual `npm install && npm run build` in this environment (no network egress here) — the client's terminal is the source of truth for E1–E3, which were confirmed fixed live. **The client should run `npm install && npm run build && npm run lint` after pulling this update and report back if anything below the line resurfaces.**

### 7. Remaining Recommendations

- Run `npm run typecheck` and `npm run lint` locally once dependencies are installed — this environment cannot execute those commands, so E4/E5/W1/W2 fixes are verified by code inspection, not by a green CI run.
- The 12-item navbar (W6) is functional but not final IA — recommend grouping into a dropdown (e.g. "What We Do" as a parent with Solutions/Manufacturing as children) once real content exists in Phase 2.
- Accessibility: the Gallery filter tabs use `role="tab"`/`role="tablist"` visually but don't yet implement full ARIA tab keyboard navigation (arrow-key roving focus) or a linked `tabpanel` — acceptable for this phase's placeholder content, should be completed once real gallery content exists.
- `ContactForm`'s submit handler is a stub (see file comment) — needs a real backend/email-provider endpoint before launch.

---

## B. PHASE 1.1 FEATURE / DESIGN DELIVERY SUMMARY

### Design system
- Palette extended per brief: Secondary (Cyan, Electric Blue), Accent (Magenta, Metallic Gold), Support (White, Light Grey) — all added to `config/theme.ts`, `styles/tokens.css`, `tailwind.config.ts`.
- Institutional Green (from the corporate badge) kept as a separate, badge-only group rather than folded into the general accent set — documented in `theme.ts`.
- New layered-background system: every non-transparent `Section` tone now composes a base gradient + 1–2 low-opacity accent glows + a shared SVG fractal-noise texture (`app/globals.css`, `[data-tone]` rules + `.bg-noise`). A matching noise overlay was added at the `<body>` level for pages/areas outside a toned `Section`.
- Glass surfaces got a subtle inset top-edge highlight for a "reflection" feel.

### Logos
- Corporate Badge: generated a true transparent PNG (`ibex-vr-corporate-badge.png`) via colour-key + feathered-edge alpha against its white background (verified source pixel values before processing) — pixels unchanged, only an alpha channel added.
- Primary logo: kept as the original JPEG — its background is a photographed/textured maroon surface, not a flat colour, so an automatic cutout risked unevenly clipping the gold linework. Documented in `lib/constants.ts` as needing a true vector/PSD source for a safe transparent version.
- Generated `favicon.ico`, `icon-192.png`, `icon-512.png` by cropping the emblem (horns/head only) from the Primary logo and padding to a square with the logo's own sampled background colour — wired into `app/manifest.ts`.

### New sections / pages
- **What We Do** (`/what-we-do`) — six category cards (as named in the brief), GSAP scroll-reveal.
- **Gallery** (`/gallery`) — masonry layout (CSS columns), category filtering, accessible lightbox modal (Esc to close, backdrop click). Tiles are structural placeholders — no client photography/video has been supplied yet.
- **Collaborations** (`/collaborations`) — seven category groups, animated infinite-scroll logo marquee (pure CSS, pauses on hover, disabled under reduced-motion). Tiles are explicitly labeled placeholders, not real partner names/counts.
- **Fuel Calculator** (`/fuel-calculator`) — real, working calculator (trip/monthly/annual cost from price, mileage, distance, trip frequency), backed by a typed service layer (`lib/services/fuel-price-service.ts`) that currently reports prices as "unavailable" rather than fabricating a live number, so it's safe to connect a real pricing API later without any UI changes.
- Structural placeholders (content pending the company document): `/about`, `/solutions`, `/manufacturing`, `/projects`, `/government`, `/csr`.
- **Contact** (`/contact`) — working form UI with client-side validation; submit handler is an explicitly-labeled stub pending a real backend/email endpoint. No phone/email contact channels were invented.

### Navigation
- `NAV_LINKS` updated to the full 12-item Phase 1.1 map; `app/sitemap.ts` updated to match.

### Animations / micro-interactions
- `useScrollReveal` — batched `ScrollTrigger` fade-up reveal, used across What We Do and Gallery.
- `Button`'s primary variant now has a subtle GSAP "magnetic" pointer-follow tween (desktop-pointer only, respects `prefers-reduced-motion` live, not just on mount).
- Marquee hover-pause, card lift-on-hover (already present, unchanged), glass reflection highlight.

### Not done in this pass (flagged, not silently skipped)
- No real photography, video, partner logos, service descriptions, registration numbers, or contact details were invented anywhere — every such spot is explicitly labeled as pending the company document/assets.
- Homepage design is still out of scope (per the original Phase 1 "do not build homepage" instruction, never rescinded).
