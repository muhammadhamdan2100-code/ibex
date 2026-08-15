import type { IconName } from "@/lib/icons";

export interface MegaMenuEntry {
  label: string;
  href: string;
  icon: IconName;
}

export interface NavItem {
  label: string;
  href: string;
  megaMenu?: MegaMenuEntry[];
}

/**
 * Top-level navigation — deliberately minimal (6 items + CTA), per the
 * Phase 2 Revision instruction not to place every page directly in the
 * navbar. Every page that isn't here still exists and is still reachable
 * — either through the Company/Solutions mega menus below, or through the
 * Footer (see Footer.tsx), which intentionally surfaces the rest.
 */
export const NAV_MENU: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "/about",
    megaMenu: [
      { label: "About", href: "/about", icon: "info" },
      { label: "Vision & Mission", href: "/about#vision", icon: "compass" },
      { label: "Manufacturing", href: "/manufacturing", icon: "factory" },
      { label: "Quality Standards", href: "/quality", icon: "badge-check" },
      { label: "Government Registrations", href: "/government", icon: "landmark" },
      { label: "CSR", href: "/csr", icon: "heart-handshake" },
      { label: "Company Credentials", href: "/company-credentials", icon: "award" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    /**
     * Phase 4: the Solutions mega menu links to the nine division hubs
     * (lib/data/catalog.ts) rather than individual vehicle-type anchors
     * — each hub in turn lists every vehicle type in that division as
     * its own real page. Custom Engineering, Smart Fleet, and Fuel
     * Calculator remain standalone links (not catalog divisions).
     */
    megaMenu: [
      { label: "Passenger Transport", href: "/solutions/passenger-transport", icon: "bus" },
      { label: "Heavy Vehicle Division", href: "/solutions/heavy-vehicles", icon: "truck" },
      { label: "Mobile Living & Workspaces", href: "/solutions/mobile-living", icon: "caravan" },
      { label: "Special Purpose — Medical", href: "/solutions/special-purpose-medical", icon: "flask-conical" },
      { label: "Emergency Division", href: "/solutions/emergency-response", icon: "shield-alert" },
      { label: "Media & Events", href: "/solutions/media-events", icon: "radio" },
      { label: "Food & Mobile Business", href: "/solutions/food-business", icon: "utensils-crossed" },
      { label: "Refrigeration Division", href: "/solutions/refrigeration", icon: "snowflake" },
      { label: "Green Mobility", href: "/solutions/green-mobility", icon: "zap" },
      { label: "Custom Engineering", href: "/custom-engineering", icon: "cog" },
      { label: "Fuel Calculator", href: "/fuel-calculator", icon: "fuel" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Founder", href: "/founder" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

/**
 * Pages that exist but are intentionally NOT in the top-level nav or
 * either mega menu (kept lean per the Phase 2 Revision brief). Still
 * real, still indexable — surfaced via the Footer and included in the
 * sitemap. See Footer.tsx's "Explore" column.
 */
export const SECONDARY_LINKS: MegaMenuEntry[] = [
  { label: "What We Do", href: "/what-we-do", icon: "compass" },
  { label: "Collaborations", href: "/collaborations", icon: "heart-handshake" },
  { label: "Smart Fleet Technology", href: "/smart-fleet", icon: "radio" },
  { label: "Global Vision", href: "/global-vision", icon: "globe-2" },
  { label: "Download Center", href: "/downloads", icon: "download" },
  { label: "FAQ", href: "/faq", icon: "info" },
  { label: "Request a Quotation", href: "/quotation", icon: "badge-check" },
  { label: "Investors & Partners", href: "/investors-partners", icon: "briefcase" },
];
