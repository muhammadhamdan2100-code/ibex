export type GalleryCategory =
  | "all"
  | "commercial-buses"
  | "luxury-coaches"
  | "non-ac-buses"
  | "heavy-vehicles"
  | "trucks-trailers"
  | "special-purpose-vehicles"
  | "emergency-vehicles"
  | "restored-vehicles"
  | "other-vehicles";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title?: string;
  description?: string;
}

export interface GalleryCategoryInfo {
  id: GalleryCategory;
  label: string;
  icon?: React.ReactNode;
  imageCount?: number;
}
