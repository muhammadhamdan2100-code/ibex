import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Accessible breadcrumb trail for interior pages, plus the matching
 * BreadcrumbList JSON-LD — every page passes the same `items` it renders
 * visually, so the structured data can never drift from what's shown.
 */
export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(items)) }}
      />
      <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
        <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wide text-steel-grey-light">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-gold-500 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-white" : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast && <ChevronRight size={12} aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
