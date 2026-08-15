export interface HeroStageLight {
  ambientIntensity: number;
  keyColor: string;
  keyIntensity: number;
  rimColor: string;
}

export interface HeroStage {
  slug: string;
  number: number;
  label: string;
  /** Short premium title, fades in/out with the stage — not a paragraph. */
  title: string;
  description: string;
  cameraPosition: [number, number, number];
  light: HeroStageLight;
}

/**
 * The six-phase transformation story, per the Phase 2 (Home Page) brief
 * — supersedes the prior nine-stage list. Title/description text is
 * given verbatim in the brief and used as-is; camera/lighting values are
 * carried over from the closest-matching stage in the prior nine-stage
 * rig (proven-good numbers, not reinvented from scratch) — Body and
 * Luxury Coach each absorb two of the old stages' framing.
 */
export const HERO_STAGES: HeroStage[] = [
  {
    slug: "steel",
    number: 1,
    label: "Steel",
    title: "Steel",
    description: "Precision material selection and preparation.",
    cameraPosition: [4.5, 1.8, 6],
    light: { ambientIntensity: 0.14, keyColor: "#8B8F94", keyIntensity: 1.0, rimColor: "#4A4E54" },
  },
  {
    slug: "chassis",
    number: 2,
    label: "Chassis",
    title: "Chassis",
    description: "Heavy-duty structural foundation engineered for durability.",
    cameraPosition: [1.0, -0.1, 1.8],
    light: { ambientIntensity: 0.18, keyColor: "#8B8F94", keyIntensity: 1.3, rimColor: "#E8823D" },
  },
  {
    slug: "frame",
    number: 3,
    label: "Frame",
    title: "Frame",
    description: "High-strength framework designed for safety and stability.",
    cameraPosition: [0.3, 4.5, 1.5],
    light: { ambientIntensity: 0.21, keyColor: "#B8BCC2", keyIntensity: 1.3, rimColor: "#22D3E8" },
  },
  {
    slug: "body",
    number: 4,
    label: "Body",
    title: "Body",
    description: "Advanced body fabrication and finishing.",
    cameraPosition: [4.4, 0.5, 0.3],
    light: { ambientIntensity: 0.25, keyColor: "#E8E8E6", keyIntensity: 1.45, rimColor: "#C9A24B" },
  },
  {
    slug: "luxury-coach",
    number: 5,
    label: "Luxury Coach",
    title: "Luxury Coach",
    description: "Interior engineering, comfort and intelligent systems.",
    cameraPosition: [0.2, 0.7, 1.3],
    light: { ambientIntensity: 0.3, keyColor: "#F6F6F4", keyIntensity: 1.6, rimColor: "#D6317A" },
  },
  {
    slug: "finished-vehicle",
    number: 6,
    label: "Finished Vehicle",
    title: "Finished Vehicle",
    description: "Complete engineered vehicle ready for deployment.",
    cameraPosition: [3.2, 1.1, 6.4],
    light: { ambientIntensity: 0.38, keyColor: "#F6F6F4", keyIntensity: 1.8, rimColor: "#C9A24B" },
  },
];
