import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CategoryGrid from "@/components/sections/CategoryGrid";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { EXPORT_MARKETS, FUTURE_TECHNOLOGY } from "@/lib/data/global-vision";

export const metadata = buildMetadata({
  title: "Global Vision",
  path: "/global-vision",
  description: "Future export markets and technology roadmap — IBEX Vehicle Restoration (Private) Limited.",
});

/**
 * Global Vision page. Explicitly framed as aspirational/future-facing —
 * these are stated goals, not a claim of current export operations,
 * an existing R&D facility, or shipped smart-vehicle products.
 */
export default function GlobalVisionPage() {
  return (
    <>
      <Section tone="black">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Global Vision" }]} className="mb-10" />
        <SectionHeading
          eyebrow="Vision"
          title="Global Vision"
          description="Future export markets and technology directions. These are stated goals, not a claim of current operations in these markets or existing facilities — confirmed status is organized here as it becomes available."
        />
      </Section>

      <Section tone="graphite">
        <SectionHeading eyebrow="Future Export Markets" title="Where We're Looking" className="mb-12" />
        <CategoryGrid categories={EXPORT_MARKETS} />
      </Section>

      <Section tone="black">
        <SectionHeading eyebrow="Technology Roadmap" title="Future Technologies" className="mb-12" />
        <CategoryGrid categories={FUTURE_TECHNOLOGY} />
      </Section>

      <EnterpriseCta title="Interested in a future partnership?" />
    </>
  );
}
