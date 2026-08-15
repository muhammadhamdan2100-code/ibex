import { CATALOG_DIVISIONS } from "@/lib/data/catalog";

export const PROJECT_TYPES = [
  "New Vehicle Manufacturing",
  "Vehicle Restoration",
  "Custom Engineering",
  "Fleet / Bulk Order",
  "Government Project",
  "Other",
];

export const VEHICLE_CATEGORIES = CATALOG_DIVISIONS.map((d) => d.title);

export const BUDGET_RANGES = [
  "Under PKR 5 Million",
  "PKR 5–15 Million",
  "PKR 15–50 Million",
  "PKR 50 Million+",
  "Prefer to discuss",
];

export const TIMELINES = [
  "Immediate (within 1 month)",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Flexible",
];

export const CONTACT_METHODS = ["Email", "Phone", "WhatsApp"];

export const INQUIRY_TYPES = [
  "General Inquiry",
  "Request Quotation",
  "Book Consultation",
  "Government Project",
  "Partnership / Collaboration",
  "Media / Press",
  "Support",
];
