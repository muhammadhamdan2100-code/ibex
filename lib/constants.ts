/**
 * Company-level constants.
 *
 * IMPORTANT: this file only holds structural/brand facts that are already
 * confirmed (name, location, tagline, logo roles). Service lists, corporate
 * registrations, CSR content, and full company profile copy are NOT
 * fabricated here — they will be transcribed from the client's company
 * document when it is supplied as text, and organized (not trimmed) across
 * the relevant pages in later phases.
 */

export const LEADERSHIP = {
  ceo: {
    name: "Qamar Bilal Nasir Al-Rai",
    title: "CEO",
  },
  director: {
    name: "Naeem Azam",
    title: "Director",
  },
  businessDevelopmentManager: {
    name: "Mudassar Zunair Mohsan",
    title: "Business Development Manager",
  },
} as const;

export const COMPANY = {
  legalName: "IBEX VEHICLE RESTORATION (PRIVATE) LIMITED",
  /** Navbar-only display form: name without "(Private) Limited" and without any location. Explicit brief requirement. */
  navDisplayName: "IBEX VEHICLE RESTORATION (Pvt.) Ltd.",
  /** Title-case form for large display contexts (Hero heading), matching the brief's exact requested casing. */
  displayName: "IBEX Vehicle Restoration",
  shortName: "IBEX Vehicle Restoration (Pvt.) Ltd.",
  tagline: "REBUILD WITH TRUST",
  established: 2023,
  projectOf: "Dar Ul Amal Human Rights Organization Pakistan",
  location: {
    city: "Sadiqabad",
    district: "Rahim Yar Khan",
    province: "Punjab",
    country: "Pakistan",
  },
  contact: {
    mobile: "+92 336 0419777",
    additionalPhone1: "+92 335 0419777",
    additionalPhone2: "+92 309 2162162",
    primaryEmail: "ibexvr0246615@gmail.com",
    alternativeEmail: "ibexvr.sdk@gmail.com",
  },
  social: {
    tikTok: {
      handle: "@ibex.vr",
      url: "https://www.tiktok.com/@ibex.vr",
    },
  },
} as const;

/** @deprecated Use LEADERSHIP.ceo.name instead */
export const CEO_NAME = LEADERSHIP.ceo.name;

/**
 * Logo asset notes:
 * - Corporate Badge (Phase 1.1): background was flat white, so a genuine
 *   transparent PNG (`ibex-vr-corporate-badge.png`) was generated via
 *   colour-key + feathered-edge alpha — no redesign, same pixels, just an
 *   alpha channel.
 * - Primary (IBEX VR) logo (Phase 2): its background is a photographed
 *   maroon texture, not a flat colour. Phase 1.1 kept the original JPEG
 *   for that reason; Phase 2's brief requires a transparent navbar logo,
 *   so a statistical cutout was produced instead — every pixel's colour
 *   distance from a sampled background palette (not a single flat colour)
 *   determines its alpha, with edge feathering. This is a best-effort
 *   algorithmic extraction, not a designer-supplied transparent source —
 *   fine edges on the gold linework may not be pixel-perfect at very
 *   large display sizes. The original JPEG is kept at
 *   `ibex-vr-primary-source.jpeg` for print/reference use or as the input
 *   if a true vector/PSD cutout is produced later.
 */
export const LOGOS = {
  primary: {
    src: "/logos/ibex_vr_-removebg-preview.png",
    alt: "IBEX Vehicle Restoration (Pvt.) Ltd. — Rebuild With Trust",
    transparent: true,
    usage: ["loading-screen", "navbar", "hero", "mobile-menu", "cta"],
  },
  corporateBadge: {
    src: "/logos/ibex_vr_-removebg-preview.png",
    alt: "IBEX Vehicle Restoration (Pvt.) Ltd. — Official Corporate Badge, Sadiqabad",
    transparent: true,
    usage: [
      "about",
      "corporate-information",
      "company-profile",
      "government-registrations",
      "csr",
      "certifications",
      "footer",
    ],
  },
  favicon: {
    ico: "/favicon.ico",
    png192: "/icon-192.png",
    png512: "/icon-512.png",
  },
} as const;

// Navigation routes live in `lib/data/nav-menu.ts` (`NAV_MENU`) as of
// Phase 2 — that's the single source of truth for every nav-derived list
// (Navbar, Footer, sitemap), so route data isn't duplicated across files.
