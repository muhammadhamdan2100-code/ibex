import type { IconName } from "@/lib/icons";

export interface CatalogDivision {
  slug: string;
  title: string;
  /** Generic, industry-level description of the category itself — not a claim about IBEX's specific capability in it. */
  summary: string;
  /** Generic "who typically uses this category of vehicle" context — industry-general knowledge, not an IBEX client claim. */
  typicalApplications: string[];
  icon: IconName;
}

export interface CatalogItem {
  slug: string;
  title: string;
  division: string; // CatalogDivision slug
}

export const CATALOG_DIVISIONS: CatalogDivision[] = [
  {
    slug: "passenger-transport",
    title: "Passenger Transport",
    summary: "Coaches, buses, and vans built around moving people — from daily commuting to long-distance touring.",
    typicalApplications: ["Public and private transport operators", "Schools and universities", "Corporate staff transport", "Tourism operators"],
    icon: "bus",
  },
  {
    slug: "mobile-living",
    title: "Mobile Living & Workspaces",
    summary: "Vehicles and portable structures built for living, working, or meeting on the move.",
    typicalApplications: ["Leisure and travel", "Remote site offices", "Temporary education facilities", "Mobile meeting/conference use"],
    icon: "caravan",
  },
  {
    slug: "heavy-vehicles",
    title: "Heavy Vehicle Division",
    summary: "Heavy trucks, tankers, and trailers engineered for industrial, construction, and bulk-haulage work.",
    typicalApplications: ["Logistics and freight operators", "Construction and mining", "Municipal services", "Industrial transport contractors"],
    icon: "truck",
  },
  {
    slug: "special-purpose-medical",
    title: "Special Purpose — Medical",
    summary: "Ambulances, mobile clinics, and mobile laboratory vehicles supporting healthcare delivery outside a fixed facility.",
    typicalApplications: ["Hospitals and emergency medical services", "Public health and vaccination programs", "Diagnostic and laboratory services", "Veterinary services"],
    icon: "flask-conical",
  },
  {
    slug: "emergency-response",
    title: "Emergency Division",
    summary: "Vehicles built around emergency response, disaster relief, and command/control coordination.",
    typicalApplications: ["Fire and rescue services", "Disaster management agencies", "Police and military units", "Civil defense organizations"],
    icon: "shield-alert",
  },
  {
    slug: "media-events",
    title: "Media & Events",
    summary: "Broadcast, staging, and event-support vehicles for media production, campaigns, and exhibitions.",
    typicalApplications: ["Broadcasters and production companies", "Political and public campaigns", "Exhibition and events organizers", "Wedding and event services"],
    icon: "radio",
  },
  {
    slug: "food-business",
    title: "Food & Mobile Business",
    summary: "Vehicles built around mobile retail and food service.",
    typicalApplications: ["Food and beverage entrepreneurs", "Mobile retail operators", "Pharmacies and healthcare retail"],
    icon: "utensils-crossed",
  },
  {
    slug: "refrigeration",
    title: "Refrigeration Division",
    summary: "Temperature-controlled vehicles for cold-chain transport of perishable and sensitive goods.",
    typicalApplications: ["Pharmaceutical and vaccine logistics", "Food distribution", "Agricultural and dairy supply chains"],
    icon: "snowflake",
  },
  {
    slug: "green-mobility",
    title: "Green Mobility",
    summary: "Electric and hybrid vehicle solutions, plus the supporting battery and charging technology.",
    typicalApplications: ["Transit operators transitioning to EV fleets", "Corporate sustainability programs", "Municipal fleets"],
    icon: "zap",
  },
];

export const CATALOG_ITEMS: CatalogItem[] = [
  // Passenger Transport
  ...[
    "Commercial Vehicles", "Luxury Coaches", "AC Coaches", "Non-AC Coaches", "VIP Coaches",
    "Sleeper Coaches", "Tourist Coaches", "School Buses", "University Buses", "Staff Buses",
    "City Buses", "Mini Buses", "Passenger Vans", "Cargo Vans", "Family Vans",
  ].map((title) => ({ title, division: "passenger-transport", slug: slugify(title) })),

  // Mobile Living & Workspaces
  ...[
    "Motorhomes", "Luxury Motorhomes", "Camper Trailers", "Portable Cabins",
    "Container Offices", "Mobile Classrooms", "Conference Vehicles",
  ].map((title) => ({ title, division: "mobile-living", slug: slugify(title) })),

  // Heavy Vehicle Division
  ...[
    "Heavy Trucks", "Cargo Trucks", "Dump Trucks", "Water Tankers", "Oil Tankers", "Fuel Tankers",
    "Garbage Trucks", "Recovery Vehicles", "Tow Trucks", "24-Wheel Trailers", "18-Wheel Trailers",
    "Container Trailers", "Flatbed Trailers", "Low Bed Trailers", "Livestock Carriers",
    "Heavy Duty Transport Vehicles", "Industrial Transport Vehicles", "Construction Vehicles",
    "Mining Support Vehicles",
  ].map((title) => ({ title, division: "heavy-vehicles", slug: slugify(title) })),

  // Special Purpose — Medical
  ...[
    "Ambulances", "BLS Ambulance", "ALS Ambulance", "ICU Ambulance", "Cardiac Ambulance",
    "Military Ambulance", "Neonatal Ambulance", "Mobile Hospital", "Mobile Clinic", "Dental Clinic",
    "Eye Clinic", "Vaccination Vehicle", "Blood Collection Vehicle", "Mobile Laboratory",
    "Veterinary Laboratory", "Water Testing Lab", "Food Testing Lab", "Environmental Lab",
  ].map((title) => ({ title, division: "special-purpose-medical", slug: slugify(title) })),

  // Emergency Division
  ...[
    "Fire Rescue Vehicle", "Disaster Response Vehicle", "Search & Rescue", "Mobile Shelter",
    "Command Control Vehicle", "Police Command Unit", "Military Command Vehicle",
    "Emergency Communication Vehicle",
  ].map((title) => ({ title, division: "emergency-response", slug: slugify(title) })),

  // Media & Events
  ...[
    "Broadcast Van", "TV Studio Van", "Radio Van", "Live Streaming Vehicle",
    "Election Campaign Vehicle", "LED Display Vehicle", "Mobile Stage", "Exhibition Vehicle",
    "Museum Vehicle", "Bridal Coach", "Luxury Wedding Coach",
  ].map((title) => ({ title, division: "media-events", slug: slugify(title) })),

  // Food & Business
  ...[
    "Food Truck", "Coffee Truck", "Ice Cream Truck", "BBQ Truck", "Bakery Truck",
    "Mobile Pharmacy", "Retail Truck", "Book Store Vehicle",
  ].map((title) => ({ title, division: "food-business", slug: slugify(title) })),

  // Refrigeration Division
  ...[
    "Cold Chain Truck", "Medicine Transport", "Vaccine Transport", "Meat Transport",
    "Fish Transport", "Milk Transport", "Fruit Transport", "Vegetable Transport",
  ].map((title) => ({ title, division: "refrigeration", slug: slugify(title) })),

  // Green Mobility
  ...[
    "Electric Bus", "Electric Van", "Electric Delivery Vehicle", "Hybrid Bus",
    "Hybrid Commercial Vehicle", "Future EV Solutions", "Battery Technology",
    "Charging Infrastructure",
  ].map((title) => ({ title, division: "green-mobility", slug: slugify(title) })),
];

export function getDivision(slug: string) {
  return CATALOG_DIVISIONS.find((d) => d.slug === slug);
}

export function getItemsByDivision(divisionSlug: string) {
  return CATALOG_ITEMS.filter((i) => i.division === divisionSlug);
}

export function getItem(divisionSlug: string, itemSlug: string) {
  return CATALOG_ITEMS.find((i) => i.division === divisionSlug && i.slug === itemSlug);
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
