import type { IconName } from "@/lib/icons";

export interface CapabilityArea {
  slug: string;
  title: string;
  icon: IconName;
}

/**
 * Sub-topic areas for the Custom Engineering and Smart Fleet pages, named
 * directly in the brief. These are capability *category* labels, not
 * specific technical claims — each renders as a structural card, honest
 * about detail being pending the official company document, same
 * discipline as every other catalog/category list in this project.
 */
export const CUSTOM_ENGINEERING_AREAS: CapabilityArea[] = [
  { slug: "vehicle-restoration", title: "Vehicle Restoration", icon: "hammer" },
  { slug: "vehicle-upgrades", title: "Vehicle Upgrades", icon: "settings" },
  { slug: "engine-modernization", title: "Engine Modernization", icon: "cog" },
  { slug: "electrical-modernization", title: "Electrical Modernization", icon: "zap" },
  { slug: "body-fabrication", title: "Body Fabrication", icon: "layers" },
  { slug: "chassis-modification", title: "Chassis Modification", icon: "settings" },
  { slug: "interior-design", title: "Interior Design", icon: "sofa" },
  { slug: "exterior-design", title: "Exterior Design", icon: "paint-bucket" },
  { slug: "engineering-drawings", title: "Engineering Drawings", icon: "ruler" },
  { slug: "3d-engineering", title: "3D Engineering", icon: "box" },
  { slug: "structural-analysis", title: "Structural Analysis", icon: "ruler" },
  { slug: "prototype-development", title: "Prototype Development", icon: "flask-conical" },
  { slug: "special-purpose-engineering", title: "Special-Purpose Engineering", icon: "shield" },
  { slug: "custom-manufacturing", title: "Custom Manufacturing", icon: "factory" },
  { slug: "testing", title: "Testing", icon: "clipboard-check" },
  { slug: "commissioning", title: "Commissioning", icon: "package-check" },
];

export const SMART_FLEET_AREAS: CapabilityArea[] = [
  { slug: "gps-tracking", title: "GPS Tracking", icon: "map-pin" },
  { slug: "iot-monitoring", title: "IoT Monitoring", icon: "radio" },
  { slug: "driver-analytics", title: "Driver Analytics", icon: "bar-chart" },
  { slug: "fuel-monitoring", title: "Fuel Monitoring", icon: "fuel" },
  { slug: "fleet-dashboard", title: "Fleet Dashboard", icon: "layout-dashboard" },
  { slug: "remote-diagnostics", title: "Remote Diagnostics", icon: "wrench" },
  { slug: "ai-fleet-management", title: "AI Fleet Management", icon: "brain" },
  { slug: "predictive-maintenance", title: "Predictive Maintenance", icon: "activity" },
];
