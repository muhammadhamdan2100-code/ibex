import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CATALOG_DIVISIONS, getItemsByDivision } from "@/lib/data/catalog";
import { ICON_MAP } from "@/lib/icons";

export const metadata = buildMetadata({
  title: "Solutions",
  path: "/solutions",
  description:
    "The complete IBEX Vehicle Restoration solutions ecosystem — passenger transport, heavy vehicles, special purpose medical, emergency response, media & events, refrigeration, and green mobility.",
});

/**
 * Solutions Hub — the top of the Phase 4 catalog. Lists all nine
 * divisions; each links to its own hub page
 * (`/solutions/[division]`), which lists every individual vehicle type
 * in that division as its own real, indexable page
 * (`/solutions/[division]/[item]`).
 */
export default function SolutionsPage() {
  return (
    <Section tone="black">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Solutions" }]} className="mb-10" />
      <SectionHeading
        eyebrow="Solutions Ecosystem"
        title="Every Division, One Engineering Platform"
        description="Nine divisions covering the full range of vehicle types IBEX works across. Each division page lists every vehicle type within it as its own dedicated page — specification and capability detail is organized as it's confirmed from the official company document; nothing here is a fabricated technical claim."
        className="mb-12"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATALOG_DIVISIONS.map(({ slug, title, summary, icon }) => {
          const count = getItemsByDivision(slug).length;
          const Icon = ICON_MAP[icon] ?? ICON_MAP.default;
          return (
            <Link key={slug} href={`/solutions/${slug}`}>
              <Card interactive className="flex h-full flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-gold text-matte-black">
                  <Icon size={22} strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-grey-light">{summary}</p>
                </div>
                <span className="mt-auto font-mono text-xs uppercase tracking-widest text-gold-500">
                  {count} vehicle types
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
      <div className="mt-12 flex flex-col items-start gap-3 border-t border-white/10 pt-8">
        <p className="text-sm text-steel-grey-light">
          Looking for engineering/fabrication capability instead of a specific vehicle type?
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/custom-engineering" variant="secondary" size="sm">
            Custom Engineering
          </Button>
          <Button href="/fuel-calculator" variant="secondary" size="sm">
            Fuel Calculator
          </Button>
        </div>
      </div>
    </Section>
  );
}
