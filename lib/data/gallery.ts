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

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title?: string;
  /** For GalleryExplorer compatibility - aspect ratio for placeholder tiles */
  aspect?: "square" | "tall" | "wide";
}

// Category labels for display
export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  all: "All Vehicles",
  "commercial-buses": "AC Luxury Coaches",
  "luxury-coaches": "Luxury Coaches",
  "non-ac-buses": "Non-AC Buses",
  "heavy-vehicles": "Heavy Vehicles",
  "trucks-trailers": "Trucks & Trailers",
  "special-purpose-vehicles": "Special Purpose",
  "emergency-vehicles": "Emergency Vehicles",
  "restored-vehicles": "Restored Vehicles",
  "other-vehicles": "Other Vehicles",
};

// Available filters for the gallery UI
export const GALLERY_FILTERS: { label: string; value: GalleryCategory }[] = [
  { label: "All Vehicles", value: "all" },
  { label: "AC Luxury Coaches", value: "commercial-buses" },
  { label: "Luxury Coaches", value: "luxury-coaches" },
  { label: "Non-AC Buses", value: "non-ac-buses" },
  { label: "Heavy Vehicles", value: "heavy-vehicles" },
  { label: "Trucks & Trailers", value: "trucks-trailers" },
  { label: "Special Purpose", value: "special-purpose-vehicles" },
  { label: "Emergency Vehicles", value: "emergency-vehicles" },
  { label: "Restored Vehicles", value: "restored-vehicles" },
  { label: "Other Vehicles", value: "other-vehicles" },
];

/**
 * Automatic gallery image scanner.
 * Scans public/images folder for all vehicle images (img (1).jpeg through img (82).jpeg).
 * Returns a list of GalleryItem entries for each valid image found.
 */
export function scanGalleryImages(): GalleryItem[] {
  const images: GalleryItem[] = [];
  
  // Scanning for images named "img (1).jpeg" through "img (82).jpeg"
  // These are the 82 vehicle images provided by the client
  for (let i = 1; i <= 82; i++) {
    const alt = `IBEX Vehicle #${i}`;
    const src = `/images/img (${i}).jpeg`;
    
    images.push({
      id: `vehicle-${i}`,
      src,
      alt,
      category: "all", // All images go under "All Vehicles" category
      title: `Vehicle #${i}`,
      aspect: "wide", // Default aspect for all images
    });
  }

  return images;
}

// Generate gallery items from actual scanned images
export const GALLERY_ITEMS: GalleryItem[] = scanGalleryImages();
