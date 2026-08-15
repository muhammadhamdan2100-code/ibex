"use client";

import { useState, useEffect, type ComponentProps } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Building } from "lucide-react";

interface IBEXImageProps extends Omit<ComponentProps<typeof Image>, "src" | "alt" | "onError"> {
  src: string;
  alt: string;
  fallback?: "initials" | "icon" | "none";
  initials?: string;
  className?: string;
}

export function IBEXImage({
  src,
  alt,
  fallback = "icon",
  initials,
  className,
  ...props
}: IBEXImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Generate initials from alt text if not provided
  const generatedInitials = initials || alt
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // Determine if we should show the fallback
  const showFallback = hasError && fallback !== "none";

  if (showFallback) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-white/5",
          className,
          props.width ? `h-[${props.height || 200}px] w-[${props.width}px]` : "h-32 w-32"
        )}
      >
        {fallback === "icon" && (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-gold-500">
            <Building size={32} />
          </div>
        )}
        {fallback === "initials" && (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-gold-500 font-display text-2xl">
            {generatedInitials}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} style={{ overflow: "hidden" }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500/30 border-t-gold-500" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        {...props}
      />
    </div>
  );
}
