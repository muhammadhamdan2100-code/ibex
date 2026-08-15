# IBEX VEHICLE RESTORATION — Phase 4 Report
## Enterprise Solutions, Services & Manufacturing Ecosystem

---

## The Fabrication Boundary (read this first)

This phase's brief asks for "realistic enterprise-level content" and
explicit compliance claims against named safety/quality standards (ECE
R29, FMVSS, EN 1789, ISO 9001, ISO 14001) across ~150 vehicle-type pages,
several of them life-safety equipment (ambulances, ICU vehicles, fire
rescue, military command vehicles).

I did not fabricate technical specifications or certification claims.
Reasoning:

1. **No source document exists in this project.** Every phase so far —
   correctly, per the very first phase's own instruction that the
   client's document is "the single source of truth" — has deferred
   specific facts to that document. It was never actually supplied; only
   formatting instructions referencing it were. Nothing has changed that.
2. **This isn't a generic content-quality question.** "Realistic" content
   for an ICU ambulance's technical specifications or a claim that a
   vehicle meets EN 1789 isn't decorative copy — it's the kind of
   information a hospital, a fire department, or a government buyer could
   reasonably act on. Inventing it and presenting it as fact would be
   actively misleading in a way that could cause real harm if believed,
   not just an inaccuracy to fix later.
3. **The right response wasn't to do less — it was to build the same
   scope honestly.** Every one of the ~150 requested categories exists as
   a real, working, indexed page below. Nothing is missing. What's
   different is that the "Technical Specifications" section on each one
   says, truthfully, that the detail is pending the document, instead of
   containing invented numbers.

Everything else in the brief — the full catalog architecture, every named
vehicle type as its own page, division hubs, related-service interlinking,
the manufacturing timeline, the standards-overview page, SEO, navigation,
performance — was built in full.

---

## 1. What Was Built

**A single data-driven catalog, not 150 hand-authored files.** This is
also just the correct engineering approach at this scale — a real
enterprise site with this many product pages would use a data model +
template, not 150 separate hand-maintained files either.

- `lib/data/catalog.ts` — every vehicle type from the brief (102 items),
  organized into the 9 divisions named in the brief (Passenger Transport,
  Mobile Living & Workspaces, Heavy Vehicle Division, Special Purpose —
  Medical, Emergency Division, Media & Events, Food & Mobile Business,
  Refrigeration Division, Green Mobility). Item count verified
  programmatically against the brief's own lists: 102/102.
- `/solutions` — hub-of-hubs, one card per division.
- `/solutions/[division]` — one route, `generateStaticParams`-expanded
  into 9 real pages (one per division), each listing every vehicle type
  in it.
- `/solutions/[division]/[item]` — one route, expanded into all 102
  individual vehicle pages. Each includes: premium hero, a
  gallery-placeholder visual (see honest-imagery note below), a
  Technical Specifications card (honest-pending), an Applications card
  (division-level, generic industry knowledge — e.g. "hospitals and
  emergency medical services" for the medical division — not an IBEX
  client claim), an Approach card (generic, safe process/positioning
  language), a Related Solutions section (other items in the same
  division), and a Contact CTA. Full `generateMetadata` per page (unique
  title/description per vehicle type).
- **Custom Engineering** (`/custom-engineering`) and **Smart Fleet
  Technology** (`/smart-fleet`) — dedicated pages for the brief's two
  standalone capability lists, reusing the existing `CategoryGrid`
  component.
- **Manufacturing** (`/manufacturing`) — added a real GSAP scroll-reveal
  timeline (`ManufacturingTimeline`) for the 13-step process named in the
  brief (Research → Delivery), using the existing `useScrollReveal` hook
  rather than introducing a new animation mechanism.
- **Quality** (`/quality`, new) — explains what each of the five named
  standards actually covers (real, publicly-documented reference
  information), with an explicit, repeated statement that this is not a
  compliance claim for IBEX specifically, plus a placeholder Quality
  Assurance Process section pending the document.
- **Navigation updated everywhere it needed to be:** Solutions mega menu
  now links to the 9 division hubs (was the old, now-superseded 9-item
  flat list) plus Custom Engineering and Fuel Calculator; Company mega
  menu's "Quality Standards" now points to the real `/quality` page
  instead of an anchor stub (which was retired from `/about` to avoid a
  duplicate). `SECONDARY_LINKS` (Footer) gained Smart Fleet Technology.
- **Breadcrumbs and related-service interlinking are real**, not
  decorative — every catalog page's breadcrumb reflects its actual
  division, and "Related Solutions" links to other real pages in the
  same division.
- **Sitemap regenerated programmatically** from `lib/data/catalog.ts` —
  the same source `generateStaticParams` uses — so it can't drift out of
  sync with what actually exists (this project has previously shipped a
  sitemap/nav coupling bug; this time the catalog itself is the single
  source for both).

**Honest imagery note:** "Professional images (temporary high-quality
placeholders if client assets are unavailable)" — no real photography or
generated imagery exists for any of these vehicles. `PlaceholderMedia`
renders a premium gradient block with the relevant category icon,
consistent with how the existing Gallery page already handles missing
photography, rather than a fabricated stock photo standing in as if it
were an IBEX vehicle.

## 2. Regression Audit

Full sweep re-run after every change in this phase: no broken imports, no
leftover references to the removed `vehicle-solutions.ts`, no hook usage
missing `"use client"`, no `metadata`/`"use client"` conflicts, no
duplicate default exports, and — checked project-wide, not just the new
files — **zero unused imports**. Caught and fixed one real instance
myself (two unused icon imports in `catalog.ts`) before it shipped.

## 3. Performance & SEO

- All 102+9 catalog pages are static (`generateStaticParams`, no
  client-side data fetching), so they're prerendered at build time —
  the correct approach for both performance and SEO on a catalog this
  size.
- Every catalog page has a unique `generateMetadata` (title + description
  templated from real data — vehicle name + division + company name/
  location, all confirmed facts — not boilerplate repeated across pages).
- No new client-side JavaScript was introduced for the catalog pages
  themselves (they're server components); the only new client component
  this phase is the small `ManufacturingTimeline`, reusing the existing
  scroll-reveal mechanism.

## 4. Remaining Recommendations

- As every prior phase: run `npm install && npm run typecheck && npm run lint && npm run build` and Lighthouse locally.
- **The moment the client's actual company document is supplied**, the highest-value next step is filling in real specifications, imagery, and confirmed certification status across the catalog — the architecture is built to receive that without restructuring, but none of it should stay invented in the meantime.
- Consider whether all 11 Solutions mega-menu entries (9 divisions + Custom Engineering + Fuel Calculator) read as too long in the Footer's Solutions column now that it's grown from 9 to 11 items — a minor polish item, not a bug.
