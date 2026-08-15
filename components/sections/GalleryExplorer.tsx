"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { X, ImageOff, Search, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { GALLERY_FILTERS, GALLERY_ITEMS, type GalleryCategory, type GalleryItem } from "@/lib/data/gallery";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const aspectClass: Record<Exclude<GalleryItem["aspect"], undefined>, string> = {
  square: "aspect-square",
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
};

/** Gallery tile with optimized image loading using IntersectionObserver for lazy loading. */
function GalleryTile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const [imageError, setImageError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const tileRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!tileRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "200px" }
    );

    observer.observe(tileRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={tileRef}
      type="button"
      data-reveal
      onClick={onOpen}
      disabled={!isVisible}
      className={cn(
        "group mb-6 block w-full break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-graphite text-left transition-opacity duration-300 ease-out hover:border-gold-500/40 disabled:cursor-wait",
        item.aspect && aspectClass[item.aspect]
      )}
      style={{ opacity: isVisible ? 1 : 0.5 }}
    >
      {!imageError ? (
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={item.src}
            alt={item.alt}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105",
              loaded ? "opacity-100" : "opacity-0"
            )}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-graphite via-matte-black to-graphite p-6">
          <ImageOff className="text-steel-grey-light transition-colors duration-200 group-hover:text-gold-500" size={28} aria-hidden="true" />
          <span className="text-center text-sm text-steel-grey-light">{item.title}</span>
        </div>
      )}
    </button>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-modal flex items-center justify-center bg-matte-black/90 backdrop-blur-glass p-6"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 text-white hover:text-gold-500"
      >
        <X size={28} />
      </button>
      <div
        className={cn(
          "flex max-h-[85vh] w-full flex-col items-center justify-center gap-4 overflow-auto rounded-lg border border-white/10 bg-graphite transition-all duration-base ease-standard",
          zoomed ? "max-w-5xl p-8" : "max-w-3xl p-16"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setZoomed((z) => !z)}
          aria-pressed={zoomed}
          aria-label={zoomed ? "Zoom out" : "Zoom in"}
          className={cn(
            "flex items-center justify-center rounded-lg border border-white/10 bg-matte-black/40 text-steel-grey-light transition-all duration-base ease-standard hover:border-gold-500/40 hover:text-gold-500",
            zoomed ? "h-[60vh] w-full" : "h-40 w-full"
          )}
        >
          <ZoomIn size={zoomed ? 64 : 40} aria-hidden="true" />
        </button>
        {imageError ? (
          <div className="text-center text-steel-grey-light">
            <p>Unable to load image</p>
          </div>
        ) : (
          <div className="flex max-h-[60vh] w-full items-center justify-center overflow-hidden rounded-lg bg-black">
            <Image
              src={item.src}
              alt={item.alt}
              className="max-h-full max-w-full object-contain"
              width={1200}
              height={800}
              loading="eager"
              onError={() => setImageError(true)}
            />
          </div>
        )}
        <p className="font-display text-2xl text-white">{item.title || "Gallery Image"}</p>
        <span className="font-mono text-xs uppercase tracking-widest text-steel-grey-light">
          {zoomed ? "Full preview — click image to zoom out" : "Click image to zoom in"}
        </span>
      </div>
    </div>
  );
}

export default function GalleryExplorer() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<GalleryItem | null>(null);
  const gridRef = useScrollReveal<HTMLDivElement>({ selector: "[data-reveal]" });

  const filtered = useMemo(() => {
    const byCategory = filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === filter);
    const q = query.trim().toLowerCase();
    return q ? byCategory.filter((item) => item.title?.toLowerCase().includes(q)) : byCategory;
  }, [filter, query]);

  return (
    <div>
      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-steel-grey-light" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search gallery..."
          aria-label="Search gallery"
          className="glass w-full rounded-pill border border-white/15 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-fast focus:border-gold-500/70"
        />
      </div>
      <div className="mb-10 flex flex-wrap gap-3" role="tablist" aria-label="Gallery filters">
        {GALLERY_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-pill border px-5 py-2 text-sm tracking-wide transition-colors duration-fast",
              filter === f.value
                ? "border-gold-500 bg-gold-500/10 text-gold-500"
                : "border-white/15 text-steel-grey-light hover:border-white/30 hover:text-white"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-steel-grey-light">No results for that search.</p>
      ) : (
        <div ref={gridRef} className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {filtered.map((item) => (
            <GalleryTile key={item.id} item={item} onOpen={() => setActive(item)} />
          ))}
        </div>
      )}

      {active && <Lightbox item={active} onClose={() => setActive(null)} />}
    </div>
  );
}
