import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import type { HomeLinkCard } from "@/lib/data/home-sections";

interface HomeCardGridProps {
  items: HomeLinkCard[];
}

/** Card grid with a real image placeholder, title, optional description, and a working Explore link — used wherever the brief asks for "card + description + Explore button + correct route." */
export default function HomeCardGrid({ items }: HomeCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ title, description, href, icon }) => (
        <Link key={href + title} href={href}>
          <Card interactive className="flex h-full flex-col gap-4">
            <PlaceholderMedia iconName={icon} label={title} className="aspect-video" />
            <div className="flex flex-1 flex-col gap-2">
              <h3 className="font-display text-base text-white">{title}</h3>
              {description && <p className="text-sm text-steel-grey-light">{description}</p>}
            </div>
            <span className="mt-auto flex items-center gap-1.5 text-xs font-medium text-gold-500">
              Explore
              <ArrowRight size={13} aria-hidden="true" />
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
