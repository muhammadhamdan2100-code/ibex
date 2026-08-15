/**
 * Image scanner utility for the IBEX Gallery.
 * Scans the public/images/gallery directory and creates gallery data.
 */

import fs from "fs";
import path from "path";

interface GalleryImageInfo {
  src: string;
  alt: string;
  category: string;
  filename: string;
}

interface GalleryCategory {
  name: string;
  slug: string;
  images: GalleryImageInfo[];
}

const GALLERY_BASE_PATH = "/images/gallery";
const GALLERY_CATEGORIES = [
  "commercial-buses",
  "luxury-coaches",
  "non-ac-buses",
  "heavy-vehicles",
  "trucks-trailers",
  "special-purpose-vehicles",
  "emergency-vehicles",
  "restored-vehicles",
  "other-vehicles",
];

/**
 * Scans the gallery folder for images and returns structured data.
 * This function should be called during build time to generate static data.
 */
export async function scanGalleryImages(): Promise<GalleryImageInfo[]> {
  const images: GalleryImageInfo[] = [];
  
  try {
    for (const category of GALLERY_CATEGORIES) {
      const categoryPath = path.join(process.cwd(), "public", "gallery", category);
      
      if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath);
        
        files.forEach((file) => {
          // Only include image files
          if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file)) {
            const imageInfo: GalleryImageInfo = {
              src: `/gallery/${category}/${file}`,
              alt: `IBEX ${category.replace(/-/g, " ")} - ${file.replace(/\.[^/.]+$/, "")}`,
              category,
              filename: file,
            };
            images.push(imageInfo);
          }
        });
      }
    }
  } catch (error) {
    console.error("Error scanning gallery images:", error);
  }
  
  return images;
}

/**
 * Get a category by slug
 */
export function getCategoryBySlug(slug: string): string | undefined {
  return GALLERY_CATEGORIES.find((cat) => cat === slug);
}
