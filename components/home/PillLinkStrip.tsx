import Link from "next/link";
import { ICON_MAP } from "@/lib/icons";
import type { HomeLinkCard } from "@/lib/data/home-sections";

interface PillLinkStripProps {
  items: HomeLinkCard[];
}

/** Compact wrapping strip of icon + label pills, each a real link — for highlight lists that don't need a full card treatment. */
export default function PillLinkStrip({ items }: PillLinkStripProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map(({ title, href, icon }) => {
        const Icon = ICON_MAP[icon] ?? ICON_MAP.default;
        return (
          <Link
            key={href + title}
            href={href}
            className="group flex items-center gap-2 rounded-pill border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition-colors duration-fast hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-500"
          >
            <Icon size={15} aria-hidden="true" />
            {title}
          </Link>
        );
      })}
    </div>
  );
}
