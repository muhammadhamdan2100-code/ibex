"use client";

import Image from "next/image";
import { LOGOS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * Logo variant - "primary" for most locations, "corporateBadge" for footer
   * Both use the same transparent logo asset but can be sized differently
   */
  variant?: "primary" | "corporateBadge";
  /**
   * Custom width in pixels (overrides default sizes)
   */
  width?: number;
  /**
   * Custom height in pixels (overrides default sizes)
   */
  height?: number;
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Image alt text override
   */
  alt?: string;
  /**
   * Priority loading for critical logos (Hero, Navbar)
   */
  priority?: boolean;
}

/**
 * Premium IBEX logo with subtle shine effect.
 * 
 * The shine effect uses a CSS linear-gradient overlay with a slow, smooth
 * sweep animation. It adds just enough illumination to make the logo
 * stand out against dark backgrounds without being flashy or distracting.
 * 
 * Uses the same transparent logo asset everywhere: ibex_vr_-removebg-preview.png
 */
export default function Logo({
  variant = "primary",
  width,
  height,
  className,
  alt,
  priority = false,
}: LogoProps) {
  // Get logo config from constants
  const logoConfig = variant === "corporateBadge" 
    ? LOGOS.corporateBadge 
    : LOGOS.primary;

  // Default sizes based on variant
  const defaultSize = variant === "corporateBadge" 
    ? { width: 80, height: 80 } 
    : { width: 44, height: 44 }; // Navbar size (11 * 4)

  const finalWidth = width || defaultSize.width;
  const finalHeight = height || defaultSize.height;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        "bg-gradient-to-br from-white/5 to-transparent",
        className
      )}
      style={{
        width: finalWidth,
        height: finalHeight,
      }}
    >
      {/* Main logo image with transparent background */}
      <Image
        src={logoConfig.src}
        alt={alt || logoConfig.alt}
        width={finalWidth}
        height={finalHeight}
        priority={priority}
        className={cn(
          "h-full w-full object-contain object-center",
          "transition-opacity duration-500 ease-in-out"
        )}
      />

      {/* Premium shine effect - subtle light sweep across logo */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Animated shine sweep - slow and refined, not flashy */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-logo-shine" />
        
        {/* Soft inner glow for subtle premium feel */}
        <div className="absolute inset-0 bg-inner-glow" />
      </div>
    </div>
  );
}
