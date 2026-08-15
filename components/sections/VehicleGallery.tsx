"use client";

import { useState, useMemo } from "react";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { GalleryFilter } from "@/components/ui/GalleryFilter";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { GALLERY_ITEMS, GALLERY_FILTERS } from "@/lib/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryCategory } from "@/lib/types/gallery";

interface VehicleGalleryProps {
  images?: typeof GALLERY_ITEMS;
}

export function VehicleGallery({ images = GALLERY_ITEMS }: VehicleGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [activeCategory, images]);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-white">Vehicle Gallery</h2>
        <p className="mt-4 text-lg text-steel-grey-light">
          Explore our portfolio of restored, customized, and specialty vehicles
        </p>
      </div>

      <GalleryFilter 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory}
        filters={GALLERY_FILTERS}
      />

      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <GalleryCard
              key={`${image.src}-${index}`}
              src={image.src}
              alt={image.alt}
              onClick={() => handleImageClick(index)}
              category={image.category.replace(/-/g, " ")}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/5 rounded-xl">
          <p className="text-lg text-steel-grey-light">No vehicles found in this category</p>
        </div>
      )}

      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={filteredImages.map((img) => ({ src: img.src, alt: img.alt }))}
        currentIndex={selectedIndex}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
