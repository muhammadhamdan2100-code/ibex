"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { X, ImageOff, Search, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface KfueitGalleryProps {
  /**
   * Base path for KFUEIT images (e.g., "/images/kfueit/buses")
   */
  basePath?: string;
}

/**
 * KFUEIT Gallery Component
 * 
 * Automatically scans and displays all images from the KFUEIT buses folder.
 * Uses a simple naming convention (bus-01.jpg, bus-02.jpg, etc.) to discover images.
 * 
 * Only displays KFUEIT images - no overlap with general gallery.
 */
export default function KfueitGallery({ basePath = "/images/kfueit/buses" }: KfueitGalleryProps) {
  const [images, setImages] = useState<{ id: string; src: string; alt: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [activeImage, setActiveImage] = useState<{ id: string; src: string; alt: string } | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const imageRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    // Scan for KFUEIT bus images (bus-01.jpg through bus-50.jpg)
    // This is a simple approach that doesn't require a server-side folder scan
    const scannedImages: { id: string; src: string; alt: string }[] = [];
    
    for (let i = 1; i <= 50; i++) {
      const num = i.toString().padStart(2, "0");
      const src = `${basePath}/bus-${num}.jpg`;
      scannedImages.push({
        id: `kfueit-bus-${num}`,
        src,
        alt: `KFUEIT Bus #${num}`,
      });
    }
    
    setImages(scannedImages);
  }, [basePath]);

  // Use IntersectionObserver to lazy-load images below the fold
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleImages((prev) => {
              const newSet = new Set(prev);
              if (entry.target instanceof HTMLElement) {
                newSet.add(entry.target.dataset?.id || "");
              }
              return newSet;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "200px" }
    );

    imageRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [images]);

  const filteredImages = useMemo(() => {
    if (!filter.trim()) return images;
    const q = filter.toLowerCase();
    return images.filter(img => img.alt.toLowerCase().includes(q));
  }, [images, filter]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500/10 to-red-500/5">
          <ImageOff className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-steel-grey-light">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-steel-grey-light" aria-hidden="true" />
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search buses..."
          aria-label="Search buses"
          className="glass w-full rounded-pill border border-white/15 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-fast focus:border-gold-500/70"
        />
      </div>

      {/* Image Grid with lazy loading */}
      {filteredImages.length === 0 ? (
        <p className="py-16 text-center text-sm text-steel-grey-light">No buses found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((img) => {
            const isVisible = visibleImages.has(img.id);
            return (
              <button
                key={img.id}
                type="button"
                data-id={img.id}
                ref={(el) => {
                  if (el) {
                    imageRefs.current.set(img.id, el);
                  }
                }}
                onClick={() => {
                  setActiveImage(img);
                  setZoomed(false);
                }}
                disabled={!isVisible}
                className="group block w-full break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-graphite text-left transition-opacity duration-300 ease-out hover:border-gold-500/40 disabled:cursor-wait"
                style={{ opacity: isVisible ? 1 : 0.5 }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    loading="lazy"
                    decoding="async"
                    onError={() => {
                      // Image doesn't exist yet, hide it
                      setImages(prev => prev.filter(i => i.id !== img.id));
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {activeImage && (
        <Lightbox image={activeImage} onClose={() => setActiveImage(null)} zoomed={zoomed} onToggleZoom={() => setZoomed(!zoomed)} />
      )}
    </div>
  );
}

/**
 * Lightbox component for image viewing
 */
function Lightbox({
  image,
  onClose,
  zoomed,
  onToggleZoom,
}: {
  image: { id: string; src: string; alt: string };
  onClose: () => void;
  zoomed: boolean;
  onToggleZoom: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 lg:right-8 lg:top-8"
        aria-label="Close image"
      >
        <X size={24} />
      </button>

      {/* Zoom toggle button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleZoom();
        }}
        className={cn(
          "absolute right-4 top-16 flex items-center justify-center rounded-lg border border-white/10 bg-black/40 text-steel-grey-light transition-all duration-base ease-standard hover:border-gold-500/40 hover:text-gold-500 lg:right-8 lg:top-16",
          zoomed ? "h-[60vh] w-full" : "h-10 w-10"
        )}
        aria-label={zoomed ? "Zoom out" : "Zoom in"}
      >
        <ZoomIn size={zoomed ? 32 : 16} aria-hidden="true" />
      </button>

      {/* Image */}
      <div
        className="flex max-h-full max-w-full flex-col items-center justify-center overflow-hidden rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {!imageError ? (
          <div className="flex max-h-[60vh] w-full items-center justify-center overflow-hidden rounded-lg bg-black">
            <Image
              src={image.src}
              alt={image.alt}
              className={cn(
                "max-h-full max-w-full object-contain",
                zoomed ? "h-[60vh] w-full" : ""
              )}
              width={1200}
              height={800}
              loading="eager"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="text-center text-steel-grey-light">
            <p>Unable to load image</p>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="mt-6 text-center">
        <p className="font-display text-2xl text-white">{image.alt}</p>
        <span className="font-mono text-xs uppercase tracking-widest text-steel-grey-light">
          {zoomed ? "Full preview — click image to zoom out" : "Click image to zoom in"}
        </span>
      </div>
    </div>
  );
}
