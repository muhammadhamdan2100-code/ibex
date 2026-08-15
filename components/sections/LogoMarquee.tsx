import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoMarqueeProps {
  count: number;
  reverse?: boolean;
  label: string;
}

/**
 * Infinite-scroll strip of placeholder partner tiles. The track is
 * rendered twice back to back so the CSS translateX(-50%) loop is
 * seamless — real logos (as SVG/PNG) can replace the placeholder tiles
 * without changing this structure.
 */
export default function LogoMarquee({ count, reverse = false, label }: LogoMarqueeProps) {
  const tiles = Array.from({ length: count }, (_, i) => i);

  const track = (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {tiles.map((i) => (
        <div
          key={i}
          className="flex h-20 w-40 shrink-0 items-center justify-center gap-2 rounded-md border border-dashed border-white/15 bg-graphite/60 text-steel-grey-light"
          aria-hidden="true"
        >
          <Building2 size={18} />
          <span className="text-xs tracking-wide">Logo Placeholder</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="marquee-viewport overflow-hidden" role="group" aria-label={label}>
      <div className={cn("flex w-max", reverse ? "marquee-track-reverse" : "marquee-track")}>
        {track}
        {track}
      </div>
    </div>
  );
}
