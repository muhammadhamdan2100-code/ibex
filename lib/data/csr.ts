import type { IconName } from "@/lib/icons";

export interface CsrProgramArea {
  slug: string;
  title: string;
  icon: IconName;
}

/**
 * CSR program AREAS named in the brief — category labels only. No
 * specific statistics (number of clinics run, funds disbursed, people
 * reached) are included since none were supplied; the two concrete facts
 * that WERE supplied (the Dar-ul-Amal partnership and the 40% profit
 * commitment) are stated directly in app/csr/page.tsx instead of here.
 */
export const CSR_PROGRAM_AREAS: CsrProgramArea[] = [
  { slug: "mobile-clinics", title: "Mobile Health Clinics", icon: "stethoscope" },
  { slug: "disaster-response", title: "Disaster Response", icon: "life-buoy" },
  { slug: "rescue-vehicles", title: "Rescue Vehicles", icon: "siren" },
  { slug: "shelter-homes", title: "Shelter Homes", icon: "home" },
  { slug: "flood-relief", title: "Flood Relief", icon: "waves" },
  { slug: "technical-training", title: "Technical Training", icon: "graduation-cap" },
  { slug: "employment-opportunities", title: "Employment Opportunities", icon: "briefcase" },
  { slug: "youth-skill-development", title: "Youth Skill Development", icon: "graduation-cap" },
  { slug: "women-empowerment", title: "Women Empowerment", icon: "users" },
  { slug: "green-technology", title: "Green Technology Research", icon: "leaf" },
  { slug: "community-development", title: "Community Development", icon: "building" },
  { slug: "environmental-responsibility", title: "Environmental Responsibility", icon: "tree-pine" },
];
