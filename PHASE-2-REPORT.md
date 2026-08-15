# IBEX VEHICLE RESTORATION — Phase 2 Report
## Premium Navbar, Header & Hero Refinement

Architecture, approved logos, and existing components were not restarted
or replaced — this phase audited, then extended, the Phase 1.1 foundation.

---

## 1–2. Errors Found & Fixed (this session)

| # | Error | Fix |
|---|---|---|
| 1 | `lib/utils.ts` (no `"use client"`) contained `useIsomorphicLayoutEffect`, referencing React hooks. Since Server Components (`SectionHeading`, via `cn()`) import that file, Next's RSC compiler rejected the whole module: *"You're importing a component that needs useEffect..."* | Moved the hook into its own client-only file, `hooks/useIsomorphicLayoutEffect.ts`, and updated its two consumers (`useGsap.ts`, `useScrollReveal.ts`). `lib/utils.ts` is now hook-free and safely importable from both Server and Client Components. |
| 2 | `app/favicon.ico` failed to build: *"The PNG is not in RGBA format"*. Pillow had written the embedded ICO frame from an RGB-mode source image. | Regenerated `favicon.ico` from an explicitly RGBA-converted source, verified each embedded frame decodes as RGBA before shipping. |
| 3 | Navigation data was duplicated in three independent places: `NAV_LINKS` (constants.ts), the new `NAV_MENU` (nav-menu.ts), and a hand-written route array in `sitemap.ts` — a real "duplicate code" issue per this phase's own audit requirement, and a drift risk (editing one wouldn't update the others). | Removed `NAV_LINKS` entirely. `NAV_MENU` (`lib/data/nav-menu.ts`) is now the single source of truth; `Footer` and `sitemap.ts` both derive from it. |
| 4 | `Hero.tsx`'s first draft rendered an explicit `<Lighting />` *and* mounted it a second time implicitly via `<CanvasWrapper>` (which already includes `Lighting` internally) — duplicate lights/environment, wasted render cost. | Caught before shipping; removed the redundant explicit `Lighting` import/usage from `Hero.tsx`. |
| 5 | `PageWrapper`'s `<main>` had a hardcoded `pt-20`, sized for the old always-glass navbar. With the new transparent-at-top navbar, this pushed the full-bleed Hero down and double-padded it against Hero's own top offset. | Removed the global `pt-20`. Every `<Section>`-based page still clears the navbar correctly on its own (`py-section-mobile`/`desktop` = 5rem/8rem, ≥ the navbar's 5rem height); Hero manages its own offset directly. |
| 6 | Hero's outer `<Section>` stacked `min-h-screen` on both itself *and* its inner pinned container, plus Section's own bottom padding — would have left an unintended gap of extra height below the fold. | Kept `min-h-screen` only on the inner pinned container; outer `Section` keeps normal padding for clean spacing into the next section. |

## 3. Warnings Fixed / Explained (carried over + newly checked)

All Phase 1.1 fixes (missing `@eslint/eslintrc`, fragile `CanvasProps` type import, hook-naming lint violation, SSR `useLayoutEffect` warning, missing `next/image` `sizes` props, stale `baseline-browser-mapping`) remain in place and were re-verified against every file touched this phase. Re-ran the full check suite after Phase 2's changes specifically:

- Every `@/` import resolves to a real file — verified.
- No hook usage in a file lacking `"use client"` — verified (including all 5 new hooks/components this phase).
- No `metadata` export in a `"use client"` file — verified.
- `app/page.tsx` correctly stays a Server Component while rendering the Client Component `Hero` as a child — this is valid RSC composition, not a violation.
- No duplicate default-export component names — verified.
- No unused imports in any new/rewritten file (heuristic scan) — verified.
- Every external package import is covered by `package.json` — verified, no new dependencies were actually required for this phase (mega menu, scroll-direction, and Hero scaffolding all reuse existing `lucide-react`, `gsap`, `@react-three/*` packages already installed).

## 4. Components Updated / Added

**Updated:** `Navbar` (full rewrite), `Button` (new `premium` variant), `Section` (new `hero` tone), `WhatWeDoGrid` (slug filtering + anchor IDs, reused by Solutions/Manufacturing), `Footer` (now sources links from `NAV_MENU`), `PageWrapper` (padding fix), `lib/constants.ts` (logo notes + `NAV_LINKS` removed).

**Added:** `MegaMenu`, `Hero`, `HeroPlaceholderMesh`, `hooks/useScrollDirection`, `hooks/useHeroScrollStage`, `hooks/useIsomorphicLayoutEffect`, `lib/data/nav-menu.ts`, `lib/data/hero-stages.ts`.

## 5. Navbar Improvements

- **Scroll behaviour:** transparent at page top, glass (blur + border + shadow) once scrolled past 24px; auto-hides on scroll-down past 160px and reinstates on scroll-up — never hides near the top, so it doesn't flicker while someone's just arrived (`useScrollDirection`).
- **Mega menus:** Solutions, Manufacturing, and Government now open premium icon-card dropdowns on hover/focus (keyboard-accessible via `onFocus`/`onBlur`, `aria-haspopup`/`aria-expanded`). Every entry resolves to a real page or a real in-page anchor — Solutions/Manufacturing pages now render `<WhatWeDoGrid>` with matching `id`s, so these aren't decorative links.
- **Animated underline:** a gold gradient underline scales in from the left on hover per nav item (`group-hover:scale-x-100`), not a generic opacity fade.
- **CTA:** "Request Consultation" now uses the new `premium` Button variant — an animated conic-gradient border (gold → cyan, rotating via a CSS `@property` angle, no JS animation loop) plus an arrow icon that shifts right on hover, on top of the existing magnetic pointer-follow effect.
- **Logo:** Primary logo now renders with a genuine transparent background (see Part B below) at the navbar's scale, with a subtle hover scale micro-interaction.
- **Breakpoint (unchanged reasoning from Phase 1.1, re-verified):** the flat 12-item list + mega menus only render at `2xl` (1728px); everything below that — including ordinary desktop/laptop — uses the overlay menu, which now also carries the mega-menu sub-items as an indented accordion list so nothing is unreachable below ultra-wide.

## 6. Responsive Improvements

- Verified the navbar's overlay menu remains fully scrollable (`max-h-[calc(100vh-5rem)]`, not a fixed pixel cap) so all 12 items + mega-menu sub-items fit on short mobile viewports.
- Hero's 3D canvas and stage rail both sit inside the same responsive `Container`/flex layout as the rest of the site — no separate breakpoint system introduced.
- Removed the double-height stacking bug in Hero (#6 above), which specifically would have worsened on shorter laptop/tablet viewports.

## 7. Performance Improvements

- `CanvasWrapper` and `HeroPlaceholderMesh` are loaded via `next/dynamic` with `ssr: false` — the Three.js/R3F bundle is now split out of the main chunk and never evaluated on the server, where WebGL doesn't exist anyway.
- The mega-menu close uses a short debounce timer (`scheduleClose`) instead of closing instantly on `mouseleave`, avoiding flicker/re-render thrash when a pointer crosses a small gap between the trigger and the panel.
- `useScrollDirection` batches scroll reads behind `requestAnimationFrame` and only calls `setState` when `scrolled`/`hidden` actually change (not on every scroll tick), avoiding needless re-renders.
- Actual Lighthouse numbers were not measured — no build/runtime environment with network access was available in this session (see Remaining Recommendations).

## 8. Remaining Recommendations

- **Run the real toolchain locally**: `npm install && npm run typecheck && npm run lint && npm run build`, then Lighthouse against the production build, to get real Performance/Accessibility/Best-Practices/SEO scores against the 90+ target. Everything in this report is a static/manual review, not a compiler- or Lighthouse-verified one.
- The Primary logo's transparency is now a statistical/algorithmic cutout (see Part B), not a designer-supplied one — fine edges may not be pixel-perfect at very large sizes (e.g. a full-bleed hero lockup). Worth replacing with a true vector/PSD-sourced cutout when available.
- Hero's `useHeroScrollStage` currently computes the active stage but doesn't yet drive any visual change per stage — that's intentional per this phase's scope, but it means the stage rail is the only visible feedback right now. Flag this to whoever picks up the next phase so expectations are aligned before that work starts.
- Mega-menu entries under Government (`CSR`, `Request a Briefing`) link to already-existing flat nav pages rather than new sub-content — consider whether Government's mega menu should instead surface something Government-specific once real content exists, rather than reusing CSR/Contact.

---

## PART B — Logo Note (Phase 2)

Phase 1.1 kept the Primary logo as the original JPEG because its maroon background is a photographed texture, not a flat color, making an automatic cutout risky. This phase's brief explicitly requires a transparent navbar logo, so a statistical cutout was produced instead: every pixel's color distance from a *sampled background palette* (not a single flat color) determines its alpha, with edge feathering — visually verified before shipping. The original JPEG is preserved at `ibex-vr-primary-source.jpeg` for print/reference use or as the input if a true designer-supplied cutout is produced later.
