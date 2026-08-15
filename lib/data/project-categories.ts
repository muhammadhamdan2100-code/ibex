import type { IconName } from "@/lib/icons";

export interface ProjectCategory {
  slug: string;
  title: string;
  icon: IconName;
}

/**
 * Project SHOWCASE categories named in the brief. No individual project
 * case studies (client names, delivery dates, before/after photos) exist
 * in this project — inventing them would misrepresent real delivered
 * work, which is a materially different and more serious problem than a
 * generic placeholder. Each category page below is built to receive real
 * case studies once documented, not populated with fabricated ones.
 */
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { slug: "featured", title: "Featured Projects", icon: "star" },
  { slug: "kfueit", title: "KFUEIT Projects", icon: "graduation-cap" },
  { slug: "luxury-coach", title: "Luxury Coach Projects", icon: "bus-front" },
  { slug: "vehicle-restoration", title: "Vehicle Restoration Projects", icon: "hammer" },
  { slug: "bus-body-building", title: "Bus Body Building Projects", icon: "wrench" },
  { slug: "ambulance", title: "Ambulance Projects", icon: "siren" },
  { slug: "mobile-clinic", title: "Mobile Clinic Projects", icon: "stethoscope" },
  { slug: "mobile-laboratory", title: "Mobile Laboratory Projects", icon: "flask-conical" },
  { slug: "government-vehicle", title: "Government Vehicle Projects", icon: "landmark" },
  { slug: "heavy-vehicle", title: "Heavy Vehicle Projects", icon: "truck" },
  { slug: "food-truck", title: "Food Truck Projects", icon: "utensils-crossed" },
  { slug: "custom-engineering", title: "Custom Engineering Projects", icon: "cog" },
];

export function getProjectCategory(slug: string) {
  return PROJECT_CATEGORIES.find((c) => c.slug === slug);
}
