import Image from "next/image";
import { IBEXImage } from "@/components/ui/Image";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { useState } from "react";

interface GalleryCardProps {
  src: string;
  alt: string;
  onClick: () => void;
  title?: string;
  category?: string;
}

export function GalleryCard({ src, alt, onClick, title, category }: GalleryCardProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden bg-white/5">
        <IBEXImage
          src={src}
          alt={alt}
          width={600}
          height={450}
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <span className="text-xs font-medium text-gold-500 uppercase tracking-wider mb-2">
          {category}
        </span>
        {title && <h3 className="text-lg font-display text-white mb-2">{title}</h3>}
        <div className="flex items-center gap-2 text-white/80">
          <Eye size={16} />
          <span className="text-sm">View</span>
        </div>
      </div>
    </div>
  );
}
