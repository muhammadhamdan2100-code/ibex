import type { IconName } from "@/lib/icons";

export interface ManufacturingCapability {
  slug: string;
  title: string;
  icon: IconName;
}

/**
 * Manufacturing-specific capability areas named directly in the Phase 7
 * brief — distinct from the six foundational WHAT_WE_DO_CATEGORIES
 * (Phase 1.1), which stay unchanged. Category labels only; capacity,
 * equipment, and specification detail per area is still organized as
 * confirmed from the official company document, not invented here.
 */
export const MANUFACTURING_CAPABILITIES: ManufacturingCapability[] = [
  { slug: "body-fabrication", title: "Body Fabrication", icon: "layers" },
  { slug: "chassis-integration", title: "Heavy-Duty Chassis Integration", icon: "truck" },
  { slug: "structural-engineering", title: "Structural Engineering", icon: "ruler" },
  { slug: "painting", title: "Painting", icon: "paint-bucket" },
  { slug: "anti-rust-treatment", title: "Anti-Rust Treatment", icon: "shield-check" },
  { slug: "electrical-systems", title: "Electrical Systems", icon: "zap" },
  { slug: "solar-integration", title: "Solar Integration", icon: "sun" },
  { slug: "gps", title: "GPS", icon: "map-pin" },
  { slug: "cctv", title: "CCTV", icon: "camera" },
  { slug: "iot", title: "IoT", icon: "radio" },
  { slug: "quality-assurance", title: "Quality Assurance", icon: "badge-check" },
  { slug: "testing", title: "Testing", icon: "clipboard-check" },
];
