import type { IconName } from "@/lib/icons";

export interface HomeLinkCard {
  title: string;
  description?: string;
  href: string;
  icon: IconName;
}

/** Section 7 — "What We Do" home page overview, 8 categories exactly as named in the brief, each mapped to its closest real Solutions page. */
export const HOME_WHAT_WE_DO: HomeLinkCard[] = [
  { title: "Commercial & Passenger Vehicles", href: "/solutions/passenger-transport", icon: "bus" },
  { title: "Special-Purpose Vehicles", href: "/solutions/special-purpose-medical", icon: "shield" },
  { title: "Emergency & Healthcare Solutions", href: "/solutions/emergency-response", icon: "shield-alert" },
  { title: "Mobile Infrastructure", href: "/solutions/mobile-living", icon: "caravan" },
  { title: "Heavy & Commercial Vehicles", href: "/solutions/heavy-vehicles", icon: "truck" },
  { title: "Cold Chain & Livestock Solutions", href: "/solutions/refrigeration", icon: "snowflake" },
  { title: "Electric & Hybrid Mobility", href: "/solutions/green-mobility", icon: "zap" },
  { title: "Custom Engineering", href: "/custom-engineering", icon: "cog" },
];

/** Section 9 — Solutions highlight strip, 12 items exactly as named, each linked to its real page. */
export const HOME_SOLUTIONS_HIGHLIGHTS: HomeLinkCard[] = [
  { title: "Ambulance", href: "/solutions/special-purpose-medical/ambulances", icon: "siren" },
  { title: "Mobile Health", href: "/solutions/special-purpose-medical/mobile-clinic", icon: "stethoscope" },
  { title: "Disaster Response", href: "/solutions/emergency-response/disaster-response-vehicle", icon: "life-buoy" },
  { title: "Command & Control", href: "/solutions/emergency-response/command-control-vehicle", icon: "radio" },
  { title: "Media & Broadcast", href: "/solutions/media-events/broadcast-van", icon: "radio" },
  { title: "Education", href: "/solutions/mobile-living/mobile-classrooms", icon: "graduation-cap" },
  { title: "Mobile Business", href: "/solutions/food-business", icon: "utensils-crossed" },
  { title: "Cold Chain", href: "/solutions/refrigeration", icon: "snowflake" },
  { title: "Livestock", href: "/solutions/heavy-vehicles/livestock-carriers", icon: "truck" },
  { title: "Electric & Hybrid", href: "/solutions/green-mobility", icon: "zap" },
  { title: "Smart Fleet", href: "/smart-fleet", icon: "brain" },
  { title: "Special Purpose Vehicles", href: "/solutions/special-purpose-medical", icon: "shield" },
];

/** Section 8 — Heavy Vehicles, 7 items covering the brief's named list. */
export const HOME_HEAVY_VEHICLES: HomeLinkCard[] = [
  { title: "Heavy Trucks", href: "/solutions/heavy-vehicles/heavy-trucks", icon: "truck" },
  { title: "Trailers", href: "/solutions/heavy-vehicles/container-trailers", icon: "truck" },
  { title: "24-Wheeler / Multi-Axle Vehicles", href: "/solutions/heavy-vehicles/24-wheel-trailers", icon: "truck" },
  { title: "Cargo Vehicles", href: "/solutions/heavy-vehicles/cargo-trucks", icon: "truck" },
  { title: "Non-AC Buses", href: "/solutions/passenger-transport/non-ac-coaches", icon: "bus" },
  { title: "AC Luxury Coaches", href: "/solutions/passenger-transport/ac-coaches", icon: "bus" },
];

/** Section 12 — Special-Purpose Vehicles highlight. */
export const HOME_SPECIAL_PURPOSE: HomeLinkCard[] = [
  { title: "Mobile Clinics", href: "/solutions/special-purpose-medical/mobile-clinic", icon: "stethoscope" },
  { title: "Mobile Laboratories", href: "/solutions/special-purpose-medical/mobile-laboratory", icon: "flask-conical" },
  { title: "Rescue Vehicles", href: "/solutions/emergency-response/fire-rescue-vehicle", icon: "siren" },
  { title: "Command Vehicles", href: "/solutions/emergency-response/command-control-vehicle", icon: "radio" },
  { title: "Mobile Offices", href: "/solutions/mobile-living/container-offices", icon: "building" },
  { title: "Mobile Classrooms", href: "/solutions/mobile-living/mobile-classrooms", icon: "graduation-cap" },
  { title: "Mobile Retail Units", href: "/solutions/food-business/retail-truck", icon: "utensils-crossed" },
  { title: "Motorhomes", href: "/solutions/mobile-living/motorhomes", icon: "caravan" },
  { title: "Adventure Caravans", href: "/solutions/mobile-living/camper-trailers", icon: "caravan" },
];

export interface WorkflowStep {
  step: number;
  title: string;
}

/** Section 10 — condensed 7-step engineering workflow, distinct from the detailed 13-step Manufacturing page timeline. */
export const ENGINEERING_WORKFLOW: WorkflowStep[] = [
  { step: 1, title: "Design" },
  { step: 2, title: "Engineering" },
  { step: 3, title: "Prototype" },
  { step: 4, title: "Fabrication" },
  { step: 5, title: "Assembly" },
  { step: 6, title: "Testing" },
  { step: 7, title: "Commissioning" },
];

/** Section 13 — the client's 8-step quality process. */
export const QUALITY_PROCESS_STEPS: WorkflowStep[] = [
  { step: 1, title: "Raw Material Inspection" },
  { step: 2, title: "Fabrication Inspection" },
  { step: 3, title: "Painting & Finishing Inspection" },
  { step: 4, title: "Assembly Inspection" },
  { step: 5, title: "Road Testing" },
  { step: 6, title: "Brake Testing" },
  { step: 7, title: "Electrical Testing" },
  { step: 8, title: "Final Quality Clearance" },
];
