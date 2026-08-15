"use client";

import Card from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ICON_MAP, type IconName } from "@/lib/icons";

interface Category {
  slug: string;
  title: string;
  icon: IconName;
}

interface CategoryGridProps {
  categories: Category[];
  /** Restrict to a subset of slugs (used where a page anchors only some categories, e.g. Manufacturing). Omit to show all. */
  slugs?: string[];
}

/**
 * Generic icon-card category grid — used by What We Do, Manufacturing,
 * Custom Engineering, CSR, Company Credentials, Global Vision, and
 * Solutions. Each card's `id` matches the slug so mega-menu anchor links
 * resolve to a real section, not a dead link.
 *
 * `categories[].icon` is a string key (see lib/icons.ts), resolved to a
 * component here via the shared registry — never received as an
 * already-resolved component prop. A resolved component reference isn't
 * a plain serializable value, so passing one as a prop from a Server
 * Component page into this Client Component would fail at runtime
 * ("Only plain objects can be passed to Client Components from Server
 * Components"). Keeping `icon` a string all the way from the data layer
 * through this prop avoids that regardless of which pages render this
 * component or how their server/client boundaries change later.
 */
export default function CategoryGrid({ categories, slugs }: CategoryGridProps) {
  const gridRef = useScrollReveal<HTMLDivElement>();
  const items = slugs ? categories.filter((c) => slugs.includes(c.slug)) : categories;

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ slug, title, icon }) => {
        const Icon = ICON_MAP[icon] ?? ICON_MAP.default;
        return (
          <Card
            key={slug}
            id={slug}
            interactive
            data-reveal
            className="flex flex-col gap-4 scroll-mt-28"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-gold text-matte-black">
              <Icon size={22} strokeWidth={2} aria-hidden="true" />
            </div>
            <h3 className="font-display text-xl text-white">{title}</h3>
          </Card>
        );
      })}
    </div>
  );
}
