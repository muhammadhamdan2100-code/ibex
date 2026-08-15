# IBEX VEHICLE RESTORATION (PRIVATE) LIMITED
## Phase 1 — Enterprise Foundation & Project Architecture

Status: **Foundation only.** No homepage, no page-level design, no
animation timelines, and no 3D models are implemented, per Phase 1 scope.
Everything below is the reusable substrate that Phases 2+ build on.

---

## 1. Folder Structure

```
ibex-vr/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, JSON-LD, PageWrapper
│   ├── page.tsx            # PLACEHOLDER route — smoke-test only
│   ├── loading.tsx         # Route-level loading state (uses Loader)
│   ├── globals.css         # Tailwind layers + token imports + base resets
│   ├── sitemap.ts          # Dynamic sitemap (grows as routes are added)
│   ├── robots.ts           # robots.txt route
│   └── manifest.ts         # Web app manifest
├── components/
│   ├── ui/                 # Button, Container, Section, SectionHeading,
│   │                       # Card, Loader, Breadcrumb, ScrollIndicator
│   ├── layout/              # Navbar, Footer, PageWrapper
│   └── three/               # CanvasWrapper, Lighting, Scene (empty)
├── lib/
│   ├── utils.ts             # cn(), clamp, lerp, mapRange, slugify, a11y checks
│   ├── gsap.ts              # GSAP + ScrollTrigger registration & utilities
│   ├── lenis.ts             # Lenis factory (reduced-motion aware)
│   ├── seo.ts               # buildMetadata() + Organization JSON-LD
│   └── constants.ts         # COMPANY, LOGOS, NAV_LINKS (confirmed facts only)
├── hooks/
│   ├── useLenis.ts
│   ├── useGsap.ts
│   ├── useMediaQuery.ts
│   ├── useScrollProgress.ts
│   └── useThreePerformance.ts
├── config/
│   ├── theme.ts             # Design tokens — single source of truth (TS)
│   └── site.ts               # siteConfig for metadata generation
├── styles/
│   └── tokens.css            # Design tokens mirrored as CSS custom properties
├── types/
│   └── index.ts               # NavLink, ServiceEntry, CertificationEntry, ProjectEntry
├── public/
│   ├── logos/
│   │   ├── ibex-vr-primary.jpeg           # LOGO 1 — final, untouched
│   │   └── ibex-vr-corporate-badge.jpeg   # LOGO 2 — final, untouched
│   ├── images/
│   └── fonts/
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.js
├── tsconfig.json
├── eslint.config.mjs
├── package.json
└── README.md (this report)
```

Path aliases are configured in `tsconfig.json`: `@/components/*`, `@/lib/*`,
`@/hooks/*`, `@/config/*`, `@/types/*`, `@/styles/*`.

---

## 2. Installed Packages

| Package | Purpose |
|---|---|
| next@16, react@19, react-dom@19 | Core framework |
| typescript | Type safety |
| tailwindcss, postcss, autoprefixer | Styling engine |
| gsap | Animation engine (ScrollTrigger registered) |
| framer-motion | Declarative UI motion (menus, transitions) |
| three, @react-three/fiber, @react-three/drei | 3D engine + React renderer + helpers |
| @studio-freight/lenis | Smooth/cinematic scrolling |
| react-icons, lucide-react | Icon systems |
| clsx, tailwind-merge | Conditional class merging (`cn()`) |
| eslint, eslint-config-next | Linting |

---

## 3. Design System

Single source of truth: **`config/theme.ts`** (TypeScript, for JS/GSAP/Three
consumers) mirrored in **`styles/tokens.css`** (CSS custom properties, for
Tailwind/pure-CSS consumers). Covers:

- **Colour** — Matte Black `#0A0A0B`, Graphite `#16171A`, Steel Grey
  `#4A4E54` (+ light variant), White `#F6F6F4`; Metallic Gold scale
  (100/300/500/700/900, base `#C9A24B`) sampled from the IBEX VR wordmark
  and badge metalwork; Dark Green scale (500/700/900, base `#123D2B`)
  sampled from the corporate badge field.
- **Typography** — `--font-display` (large premium headings),
  `--font-body` (readable body copy), `--font-mono` (specs/registration/
  captions), modular type scale (xs → 9xl), tracking scale for
  eyebrow-style labels.
- **Spacing** — 4px base unit, section padding (mobile/desktop), container
  max-width (1440px) with responsive gutters.
- **Radius, Shadow, Glass** — including a dedicated `shadow-gold` and glass
  tokens (`--glass-navbar`, `--glass-card`, `--glass-border`, blur amount).
- **Motion** — duration scale (instant → cinematic) and eases
  (standard/enter/exit) shared by GSAP and CSS transitions, plus Lenis
  defaults. All durations collapse under `prefers-reduced-motion`.
- **Z-index scale** — canvas/content/navbar/overlay/loader/modal, so
  future 3D layers never fight UI chrome.

---

## 4. Component Library

**UI primitives** (`components/ui`): `Button` (variant + size system,
polymorphic link/button), `Container`, `Section` (tone variants incl.
black/graphite/green), `SectionHeading`, `Card` (glass, optional
interactive hover), `Loader` (static structure, Logo 1 only), `Breadcrumb`,
`ScrollIndicator`.

**Layout** (`components/layout`): `Navbar` (glass, sticky, responsive,
mobile menu, Logo 1 only), `Footer` (Company Info / Contact / Quick Links /
Government Registration / Corporate Badge, Logo 2 only), `PageWrapper`
(mounts Lenis + GSAP registration, assembles Loader/Navbar/main/Footer).

**Three.js** (`components/three`): `CanvasWrapper` (configured R3F Canvas:
camera, gl settings, performance-tiered dpr/antialias/shadows, Suspense +
Preload), `Lighting` (three-point studio rig + Environment), `Scene`
(intentionally empty — pipeline smoke-test only).

Brand-hierarchy rule is enforced structurally: only `Navbar`/`Loader`
import `LOGOS.primary`; only `Footer` imports `LOGOS.corporateBadge`. No
component mixes both.

---

## 5. Responsive Strategy

Tailwind breakpoints mirror `config/theme.ts` breakpoints exactly:

| Token | Width | Device |
|---|---|---|
| `sm` | 480px | Large phone |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1728px | Ultra-wide |

`Container` caps content at 1440px with fluid gutters (1.25rem mobile →
3rem desktop) so ultra-wide screens never stretch text/CTAs edge to edge.
`useMediaQuery` gives components SSR-safe access to the same breakpoint
tokens for logic that CSS alone can't express (e.g. swapping a 3D scene's
camera framing).

---

## 6. Animation Architecture

- **GSAP** registered once (`lib/gsap.ts`) with shared `duration`/`ease`
  defaults pulled from design tokens. `fadeInUp()` and `createScrollPin()`
  are ready-to-use utilities — not yet invoked anywhere.
- **ScrollTrigger** is registered and synced to Lenis's `scroll` event
  (`useLenis`) so pinning/scrubbing will be frame-accurate once real
  timelines are authored in Phase 2.
- **Lenis** is reduced-motion aware — `createLenis()` returns `null` (native
  scroll) when the user has `prefers-reduced-motion` set.
- **`useGsap` hook** wraps `gsap.context` per-component so every future
  section's tweens/triggers are scoped and auto-reverted on unmount —
  prevents animation leaks across client-side navigation.
- No entrance/scroll/hover animation is wired to real content yet — that
  begins with the Hero in Phase 2.

---

## 7. Three.js Architecture

- `CanvasWrapper` is the single mounting point for every future 3D scene:
  configured camera (`PerspectiveCamera`), studio `Lighting` rig, Suspense
  boundary, and `Preload`.
- `useThreePerformance` gives a coarse low/medium/high tier (based on
  `hardwareConcurrency`, pointer coarseness, and `navigator.connection.
  saveData`) that gates `dpr`, shadows, and antialiasing — so a phone never
  renders at desktop fidelity.
- `Lighting.tsx` uses a three-point rig (key/fill/rim) tuned toward the
  brand's matte-black/steel/gold materials, plus a `city` HDRI environment
  for realistic metal reflections.
- `Scene.tsx` is deliberately empty and exports a typed `preloadAsset()`
  helper for future `.glb`/`.gltf` restoration/SPV models — no geometry is
  invented in Phase 1.
- `next.config.ts` already resolves `.glb/.gltf/.hdr/.exr` as webpack assets
  so model files can be dropped in without config changes later.

---

## 8. Performance Strategy

- `next.config.ts`: AVIF/WebP image formats, tuned device/image size
  arrays, `optimizePackageImports` for `lucide-react`/`react-icons`/`three`,
  compression on, security headers.
- Device-tiered 3D rendering via `useThreePerformance` (see above).
- `PageWrapper`/`Loader` structure is built to support real
  asset-progress reporting once 3D/texture payloads exist (Phase 3),
  rather than an arbitrary spinner.
- Component-level code splitting is implicit via the App Router; heavy
  3D/animation modules are isolated in `components/three` and `lib/gsap.ts`
  so they can be dynamically imported (`next/dynamic`) from page code once
  real scenes are built.

---

## 9. SEO Strategy

- `lib/seo.ts` centralizes metadata generation (`buildMetadata()`) and
  Organization JSON-LD — every route calls this instead of hand-rolling
  `<Metadata>`, guaranteeing consistent Open Graph/Twitter card coverage.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` are live routes,
  ready to extend as pages are added.
- `config/site.ts` holds canonical name/description/keywords/theme colour
  — update the placeholder production URL before Phase 4 launch.

---

## 10. Accessibility Checklist

- [x] Semantic landmarks: `<header>`, `<nav aria-label="Primary">`,
      `<main>`, `<footer>`.
- [x] Custom `:focus-visible` ring (gold, offset) — never removes default
      focus without replacing it.
- [x] `Loader` uses `role="status"` + `aria-live="polite"`.
- [x] `ScrollIndicator` uses `role="progressbar"` with value attributes.
- [x] `Breadcrumb` uses `<nav aria-label="Breadcrumb">` and
      `aria-current="page"` on the active crumb.
- [x] Mobile menu button has `aria-expanded`/`aria-controls`/dynamic
      `aria-label`.
- [x] All motion (GSAP durations, Lenis) collapses under
      `prefers-reduced-motion: reduce`.
- [ ] Full keyboard-trap testing of mobile menu — scheduled once real
      content/interactions exist (Phase 2).
- [ ] Colour-contrast audit against final imagery/backgrounds (Phase 2/3).

---

## 11. Phase 2 Readiness Report

**Ready:**
- Design tokens, Tailwind wiring, and global styles are locked and
  consistent across CSS and JS/TS consumers.
- Navbar/Footer/Loader shell renders with the correct, unaltered logos in
  their approved roles.
- GSAP + ScrollTrigger + Lenis are registered and synced; ready for real
  timelines.
- R3F Canvas/Lighting pipeline is configured and performance-tiered; ready
  for a first model.
- SEO plumbing (metadata, sitemap, robots, manifest, JSON-LD) is live.

**Blocked on client input for Phase 2+:**
- The full company profile document (services, SPV manufacturing detail,
  government registrations, CSR copy, certifications, project history) has
  not yet been supplied as machine-readable text — only formatting
  instructions were provided in this phase. `lib/constants.ts` and
  `types/index.ts` are shaped to receive this content without restructuring,
  but no copy has been invented or assumed.
- Production domain/social handles for `config/site.ts`.

**Recommended next step:** supply the company document's text content so
Phase 2 (Homepage: Hero, About preview, Services preview, real Loader/Navbar
animation) can proceed without placeholder copy.
