import type { IconName } from "@/lib/icons";

export interface GlobalVisionArea {
  slug: string;
  title: string;
  icon: IconName;
}

/** Aspirational/future-facing categories — not a claim of current export operations or R&D facilities. */
export const EXPORT_MARKETS: GlobalVisionArea[] = [
  { slug: "middle-east", title: "Middle East", icon: "map-pin" },
  { slug: "gcc", title: "GCC", icon: "landmark" },
  { slug: "africa", title: "Africa", icon: "globe-2" },
  { slug: "central-asia", title: "Central Asia", icon: "compass" },
  { slug: "future-export-markets", title: "Future Export Markets", icon: "building-2" },
];

export const FUTURE_TECHNOLOGY: GlobalVisionArea[] = [
  { slug: "rd-center", title: "Research & Development Center", icon: "cpu" },
  { slug: "electric-mobility", title: "Electric Mobility", icon: "zap" },
  { slug: "hybrid-vehicles", title: "Hybrid Vehicles", icon: "radar" },
  { slug: "smart-vehicles", title: "Smart Vehicles", icon: "brain" },
  { slug: "ai-fleet-management", title: "AI Fleet Management", icon: "brain" },
  { slug: "future-technologies", title: "Future Technologies", icon: "rocket" },
];
