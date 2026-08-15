import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CategoryGrid from "@/components/sections/CategoryGrid";
import { WHAT_WE_DO_CATEGORIES } from "@/lib/data/what-we-do";

export const metadata = buildMetadata({
  title: "What We Do",
  path: "/what-we-do",
  description:
    "Engineering Solutions, Vehicle Manufacturing, Restoration, Special Purpose Vehicles, Government Projects, and Innovation — IBEX Vehicle Restoration (Private) Limited.",
});

export default function WhatWeDoPage() {
  return (
    <Section tone="black">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "What We Do" }]} className="mb-10" />
      <SectionHeading
        eyebrow="Capabilities"
        title="What We Do"
        description="Six core capability areas. Detailed scope, process, and case studies for each will be added from the official company document once supplied."
      />
      <div className="mt-12">
        <CategoryGrid categories={WHAT_WE_DO_CATEGORIES} />
      </div>
    </Section>
  );
}
