import type { IconName } from "@/lib/icons";

export interface WhatWeDoCategory {
  slug: string;
  title: string;
  icon: IconName;
}

/**
 * The six top-level categories are named directly in the Phase 1.1 brief.
 * No sub-copy/description is added per category — that depends on the
 * client's company document and is not invented here.
 *
 * `icon` is a string key into the shared registry (lib/icons.ts), not a
 * component reference — see that file for why.
 */
export const WHAT_WE_DO_CATEGORIES: WhatWeDoCategory[] = [
  { slug: "engineering-solutions", title: "Engineering Solutions", icon: "wrench" },
  { slug: "vehicle-manufacturing", title: "Vehicle Manufacturing", icon: "factory" },
  { slug: "restoration", title: "Restoration", icon: "hammer" },
  { slug: "special-purpose-vehicles", title: "Special Purpose Vehicles", icon: "shield" },
  { slug: "government-projects", title: "Government Projects", icon: "landmark" },
  { slug: "innovation", title: "Innovation", icon: "lightbulb" },
];
