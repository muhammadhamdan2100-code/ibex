import type { IconName } from "@/lib/icons";

export interface CredentialArea {
  slug: string;
  title: string;
  icon: IconName;
}

/** Structural categories only — statement text (CEO message, mission wording, etc.) is not invented. */
export const CREDENTIAL_AREAS: CredentialArea[] = [
  { slug: "legal-registrations", title: "Legal Registrations", icon: "file-check" },
  { slug: "business-licenses", title: "Business Licenses", icon: "scroll-text" },
  { slug: "company-profile", title: "Company Profile", icon: "building-2" },
  { slug: "ceo-message", title: "CEO Message", icon: "user-circle" },
  { slug: "corporate-philosophy", title: "Corporate Philosophy", icon: "compass" },
  { slug: "vision", title: "Vision", icon: "target" },
  { slug: "mission", title: "Mission", icon: "gem" },
  { slug: "core-values", title: "Core Values", icon: "award" },
  { slug: "engineering-standards", title: "Engineering Standards", icon: "shield-check" },
  { slug: "quality-commitment", title: "Quality Commitment", icon: "shield-check" },
  { slug: "future-vision", title: "Future Vision", icon: "sparkles" },
];
