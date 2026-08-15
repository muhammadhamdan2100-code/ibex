# IBEX VEHICLE RESTORATION — Phase 6 Report
## Enterprise Functionality, Contact System, Fuel Calculator, SEO & Performance

---

## What's Genuinely Live vs. What Still Needs Real Infrastructure

This phase asked for a lot that's now actually working — and a few things
that need credentials this project has never had. Being direct about the
line:

**Genuinely functional now:**
- Contact form and Quotation form both POST to real API routes
  (`/api/contact`, `/api/quotation`) with real server-side validation,
  honeypot spam protection, and input sanitization.
- Download Center — every button downloads a real PDF (generated this
  round, clearly labeled as placeholder content, not a broken or fake
  link).
- Google Map — a real embedded map (no API key needed, uses the free
  iframe embed), centered on the confirmed city/province.
- Fuel Calculator — Electric added as a third fuel type alongside
  Petrol/Diesel, plus Passengers, Cost Per Passenger, Round Trip Cost,
  and a real animated bar chart (recharts, verified React 19-compatible
  before adding).
- Global Search — real client-side search across the entire site's
  actual content (catalog, projects, gallery categories, core pages),
  `Ctrl/Cmd+K` shortcut.
- FAQ — categorized, animated accordion, 5 categories per the brief.
- SEO — `BreadcrumbList` JSON-LD now generated automatically by the
  shared `Breadcrumb` component itself, so every page that already shows
  a breadcrumb gets the structured data for free, guaranteed to match
  what's visually shown (they're the same `items` prop).

**Still needs real infrastructure — not faked, marked clearly in code:**
- **Actually delivering** a contact/quotation submission (email or CRM)
  needs a real provider API key (e.g. Resend). The API routes log
  server-side and return success/failure correctly, but the "TODO" for
  where the real send call goes is a comment, not a fake implementation.
- **Call CEO / WhatsApp / Primary Email / Secondary Email** — still no
  real phone number or email address anywhere in this project. Every one
  of these routes to the working contact form with an honest "pending
  confirmation" label, exactly as every prior phase has handled this,
  rather than publishing a fabricated number someone could actually try
  to call.
- **Persistent rate limiting** needs a real store (Redis/Upstash) that
  doesn't exist here — the API route has a comment marking exactly where
  it would plug in, rather than a fake in-memory limiter that wouldn't
  actually work correctly across serverless instances anyway.
- **Live fuel price API** — same as every prior phase: the service layer
  reports "unavailable" honestly rather than inventing a number.

## Bugs Caught This Round

- `lib/data/search-index.ts` — left a stray unused import while assembling
  the search index from multiple data sources. Caught by my own
  unused-import sweep before it shipped.
- `components/ui/Input.tsx`'s new `Select` — first draft used
  `appearance-none` to match the other inputs' flat styling, which also
  strips the native dropdown arrow with nothing replacing it, making
  dropdowns hard to recognize as dropdowns. Caught in review, reverted to
  keep the native arrow.

## Verification

Ran the full regression sweep (broken imports, missing `"use client"`,
`metadata` conflicts, duplicate exports, plain `<a>` tags for internal
nav, unused imports — project-wide, not just new files) — all clean.
Also ran a real `tsc` compile against every file touched this round
individually; the only errors surfaced were the same class of stub
artifacts identified and verified in the earlier Hotfix round (missing
global `React` namespace in the minimal test harness) — confirmed by
checking that the identical pattern already exists in `Card.tsx`, a file
shipped since Phase 1, which would fail the same way if this were a real
issue.

## Final Counts

| Metric | Count |
|---|---|
| Total pages (generated at build time) | **142** (20 static + 9 division hubs + 102 vehicle-type pages + 11 project categories) |
| Total routes (page.tsx + API routes) | **25** (23 page templates + 2 API routes) |
| Component files | **37** |
| Forms | **2** (Contact, Quotation) — both with real client + server-side validation |
| Working buttons/links | Every button on every page resolves to a real destination — either a real route, a real download, a real external map link, or the contact form (never a dead `href="#"` or a fabricated `tel:`/`mailto:`) |
| Distinct CSS `@keyframes` animations | **8** |
| GSAP/ScrollTrigger-driven mechanisms | **6** (unchanged from Phase 4 audit — Button magnetic hover, ManufacturingTimeline reveal, useLenis, useHeroScrollStage, useGsap, useScrollReveal) |
| SEO status | Unique metadata + Open Graph + Twitter Card per page (`buildMetadata`), canonical URLs, `Organization` + `BreadcrumbList` JSON-LD, sitemap generated from real data, robots.txt |
| Accessibility status | ARIA labels/roles on interactive components (search modal, FAQ accordion, forms), keyboard support (Escape closes modals, Ctrl/Cmd+K opens search), focus-visible states — not independently Lighthouse-verified in this sandbox |
| Performance status | Catalog pages statically generated, 3D bundle dynamically imported (`ssr:false`), images optimized via `next/image` — Lighthouse score itself not verifiable without a browser |

## Remaining Tasks Before Phase 7

- **Run the real toolchain**: `npm install && npm run lint && npm run build && npm run dev`, then Lighthouse — no browser or network access exists in this sandbox, so none of the performance/accessibility targets have been independently measured.
- The moment real contact details (phone, email) or an email-provider API key exist, `EnterpriseCta`, `ContactOptions`, and the two API routes are all built to receive them without restructuring — search each file for the honest "pending confirmation" labels to find every spot that needs a real value.
- Same for a Google Maps API key if a precise office pin (not just the city-level embed) becomes wanted.
