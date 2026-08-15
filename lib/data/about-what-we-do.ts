import type { IconName } from "@/lib/icons";

export interface AboutCapability {
  number: number;
  title: string;
  href: string;
  icon: IconName;
}

/**
 * The six consolidated capability categories named specifically in the
 * About-page brief — distinct wording from the homepage's own 8-category
 * "What We Do" list (lib/data/home-sections.ts). Each links to the
 * closest existing detailed page, per the brief's own instruction not to
 * duplicate full product descriptions here.
 */
export const ABOUT_CAPABILITIES: AboutCapability[] = [
  { number: 1, title: "Commercial, Passenger & Tourism Vehicles", href: "/solutions/passenger-transport", icon: "bus" },
  { number: 2, title: "Emergency, Healthcare, Disaster & Security Solutions", href: "/solutions/emergency-response", icon: "shield-alert" },
  { number: 3, title: "Mobile Units for Events, Media, Education & Business", href: "/solutions/media-events", icon: "radio" },
  { number: 4, title: "Cold Chain, Livestock & Green Mobility", href: "/solutions/refrigeration", icon: "snowflake" },
  { number: 5, title: "Custom Engineering & Special Projects", href: "/custom-engineering", icon: "cog" },
  { number: 6, title: "Research, Smart Mobility & Future Vehicle Technologies", href: "/global-vision", icon: "cpu" },
];
