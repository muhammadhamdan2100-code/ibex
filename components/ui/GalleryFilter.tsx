import { cn } from "@/lib/utils";
import type { GalleryCategory } from "@/lib/types/gallery";

interface GalleryFilterProps {
  activeCategory: GalleryCategory;
  onCategoryChange: (category: GalleryCategory) => void;
  filters?: Array<{ label: string; value: GalleryCategory }>;
}

export function GalleryFilter({ activeCategory, onCategoryChange, filters }: GalleryFilterProps) {
  // Normalize filters to have 'id' property for backward compatibility
  const categories = filters?.map(f => ({ id: f.value, label: f.label })) || [
    { id: "all", label: "All Vehicles" },
    { id: "commercial-buses", label: "AC Luxury Coaches" },
    { id: "luxury-coaches", label: "Luxury Coaches" },
    { id: "non-ac-buses", label: "Non-AC Buses" },
    { id: "heavy-vehicles", label: "Heavy Vehicles" },
    { id: "trucks-trailers", label: "Trucks & Trailers" },
    { id: "special-purpose-vehicles", label: "Special Purpose" },
    { id: "emergency-vehicles", label: "Emergency Vehicles" },
    { id: "restored-vehicles", label: "Restored Vehicles" },
    { id: "other-vehicles", label: "Other Vehicles" },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            activeCategory === category.id
              ? "bg-gold-500 text-black shadow-lg shadow-gold-500/20"
              : "bg-white/5 text-white hover:bg-white/10 hover:text-gold-500"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
