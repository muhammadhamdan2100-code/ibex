/**
 * IBEX VR — DESIGN TOKENS (SINGLE SOURCE OF TRUTH)
 * ---------------------------------------------------
 * Every colour, type size, spacing step and timing value used across the
 * site must originate here (or from styles/tokens.css, which mirrors this
 * file as CSS custom properties for runtime/animation use).
 *
 * Palette derivation (updated Phase 1.1):
 * - Primary (Matte Black / Steel Grey / Graphite) -> the industrial base,
 *   echoing brushed-steel and matte-coated metal found in restored
 *   vehicle bodywork. Unchanged from Phase 1.
 * - Secondary (Cyan / Electric Blue) -> futuristic engineering accent,
 *   used sparingly for data/technical highlights, links, and interactive
 *   states — never as a dominant fill.
 * - Accent (Magenta / Metallic Gold) -> premium highlight pair. Gold is
 *   lifted directly from the IBEX VR wordmark + horns (Logo 1) and the
 *   badge's laurel/crest metalwork (Logo 2); Magenta is the new premium
 *   counterpoint, reserved for rare emphasis (a stat, a single CTA glow).
 * - Support (White / Light Grey) -> body text and quiet surfaces.
 * - Institutional Green -> lifted directly from the corporate badge
 *   (Logo 2) field. Kept separate from the brand accent pair — it is used
 *   only where the badge itself appears (About, Certifications, Footer),
 *   never as a general-purpose UI accent.
 *
 * Usage discipline: Cyan, Electric Blue and Magenta are accent-only. They
 * should never cover more than a small fraction of any viewport (a border,
 * an icon, a glow, a data point) — the base remains matte black / graphite
 * / steel grey throughout.
 *
 * Do not introduce new hues without updating this file first.
 */

export const colors = {
  // Primary — structural / background system
  matteBlack: "#0A0A0B",
  graphite: "#16171A",
  steelGrey: "#4A4E54",
  steelGreyLight: "#8B8F94",

  // Support — body text / quiet surfaces
  white: "#F6F6F4",
  lightGrey: "#C7C9CC",

  // Secondary — futuristic engineering accents (sparing use)
  cyan: {
    100: "#B8F2F7",
    300: "#6FE1EC",
    500: "#22D3E8", // base
    700: "#158C99",
    900: "#0C525C",
  },
  electricBlue: {
    100: "#C7D6FF",
    300: "#7FA0FF",
    500: "#2E6BFF", // base
    700: "#1B47B3",
    900: "#102C70",
  },

  // Accent — premium highlight pair
  magenta: {
    100: "#F6C6DE",
    300: "#E87BAF",
    500: "#D6317A", // base
    700: "#9C1F58",
    900: "#611236",
  },
  gold: {
    100: "#F3E3B8",
    300: "#E8C877",
    500: "#C9A24B", // base
    700: "#9C7A2E",
    900: "#6B5220",
  },

  // Institutional — dark green (from corporate badge field). Badge/
  // certification/footer contexts only — not a general accent.
  green: {
    500: "#123D2B", // base
    700: "#0B2A1D",
    900: "#061A12",
  },

  // Functional
  success: "#2E7D4F",
  warning: "#C9A24B",
  danger: "#8C2F2F",
  overlay: "rgba(10, 10, 11, 0.72)",
} as const;

export const typography = {
  fontDisplay: "var(--font-display)", // large headings — engineered, high-contrast serif/slab
  fontBody: "var(--font-body)", // body copy — neutral grotesk, high legibility
  fontMono: "var(--font-mono)", // data, specs, registration numbers, captions

  scale: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.953rem",
    "4xl": "2.441rem",
    "5xl": "3.052rem",
    "6xl": "3.815rem",
    "7xl": "4.768rem",
    "8xl": "5.96rem",
    "9xl": "7.451rem",
  },

  tracking: {
    tight: "-0.02em",
    normal: "0em",
    wide: "0.08em",
    widest: "0.24em", // used for eyebrow / badge-style labels
  },
} as const;

export const spacing = {
  unit: 4, // px, base grid unit
  section: {
    mobile: "5rem",
    desktop: "8rem",
  },
  container: {
    max: "1440px",
    padding: {
      mobile: "1.25rem",
      desktop: "3rem",
    },
  },
} as const;

export const radius = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "16px",
  xl: "24px",
  pill: "999px",
} as const;

export const shadow = {
  sm: "0 1px 2px rgba(0,0,0,0.4)",
  md: "0 8px 24px rgba(0,0,0,0.45)",
  lg: "0 24px 64px rgba(0,0,0,0.55)",
  gold: "0 0 32px rgba(201,162,75,0.25)",
  cyan: "0 0 32px rgba(34,211,232,0.2)",
  magenta: "0 0 32px rgba(214,49,122,0.2)",
  inset: "inset 0 1px 0 rgba(255,255,255,0.06)",
} as const;

export const glass = {
  navbar: "rgba(10,10,11,0.55)",
  card: "rgba(22,23,26,0.6)",
  border: "rgba(246,246,244,0.08)",
  blur: "16px",
} as const;

/**
 * Layered-background system. Every section background is composed from
 * these three ingredients (base gradient + accent glow + noise) rather
 * than a flat colour, per the Phase 1.1 background-design brief.
 */
export const backgroundLayers = {
  noiseOpacity: 0.035, // kept low — texture, not visual noise
  glowOpacity: 0.16,
} as const;

export const breakpoints = {
  mobile: "0px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  ultrawide: "1728px",
} as const;

export const motion = {
  duration: {
    instant: 0.15,
    fast: 0.3,
    base: 0.6,
    slow: 1.0,
    cinematic: 1.6,
  },
  ease: {
    standard: [0.16, 1, 0.3, 1], // expo-out — premium "settle"
    enter: [0.22, 1, 0.36, 1],
    exit: [0.7, 0, 0.84, 0],
  },
  lenis: {
    duration: 1.2,
    smoothWheel: true,
    touchMultiplier: 1.5,
  },
  // Reduced motion support for accessibility
  reducedMotion: {
    duration: {
      instant: 0.05,
      fast: 0.1,
      base: 0.2,
      slow: 0.4,
      cinematic: 0.8,
    },
  },
} as const;

export const zIndex = {
  base: 0,
  canvas: 10,
  content: 20,
  navbar: 50,
  overlay: 80,
  loader: 100,
  modal: 110,
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadow,
  glass,
  breakpoints,
  motion,
  zIndex,
} as const;

export type Theme = typeof theme;
export default theme;
