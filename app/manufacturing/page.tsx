import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import CategoryGrid from "@/components/sections/CategoryGrid";
import ManufacturingTimeline from "@/components/sections/ManufacturingTimeline";
import { WHAT_WE_DO_CATEGORIES } from "@/lib/data/what-we-do";
import { MANUFACTURING_CAPABILITIES } from "@/lib/data/manufacturing-capabilities";
import { COMPANY } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Manufacturing",
  path: "/manufacturing",
  description: "Special Purpose Vehicle (SPV) manufacturing capabilities and process of IBEX Vehicle Restoration (Private) Limited.",
});

export default function ManufacturingPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="graphite">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Manufacturing" }]} className="mb-10" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Company — Manufacturing</span>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
              Special Purpose Vehicle Manufacturing
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-steel-grey-light">
              {COMPANY.displayName} manufactures and restores vehicles in {COMPANY.location.city},{" "}
              {COMPANY.location.province}. Capability and capacity detail is organized here as it's
              confirmed from the official company document.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="premium">
                Request Consultation
                <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
              </Button>
              <Button href="/custom-engineering" variant="outline">
                Custom Engineering
              </Button>
            </div>
          </div>
          <PlaceholderMedia iconName="factory" label="Manufacturing Facility" className="aspect-[4/3]" />
        </div>
      </Section>

      {/* Overview / capability categories */}
      <Section tone="black">
        <SectionHeading
          eyebrow="Overview"
          title="Manufacturing Overview"
          description="Three core capability areas underpin manufacturing work here — detail on facility, equipment, and capacity is organized as it's confirmed from the official company document."
          className="mb-12"
        />
        <CategoryGrid categories={WHAT_WE_DO_CATEGORIES} slugs={["vehicle-manufacturing", "special-purpose-vehicles", "restoration"]} />
      </Section>

      {/* Detailed capability areas */}
      <Section tone="black">
        <SectionHeading
          eyebrow="Capabilities"
          title="Manufacturing Capabilities"
          description="From structural fabrication through finishing and onboard technology — detail on capacity and equipment per area is organized as it's confirmed from the official company document."
          className="mb-12"
        />
        <CategoryGrid categories={MANUFACTURING_CAPABILITIES} />
      </Section>

      {/* Interactive process timeline */}
      <Section tone="graphite">
        <SectionHeading
          eyebrow="Process"
          title="Manufacturing Process"
          description="The general stages a vehicle passes through, from initial research to delivery. Facility-specific detail (equipment, timelines, capacity) is organized here as it's confirmed from the official company document."
          className="mb-12"
        />
        <ManufacturingTimeline />
      </Section>

      {/* Gallery placeholder */}
      <Section tone="black">
        <SectionHeading eyebrow="Gallery" title="Facility & Process" className="mb-10" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <PlaceholderMedia iconName="factory" label="Fabrication Floor" className="aspect-video" />
          <PlaceholderMedia iconName="factory" label="Assembly Line" className="aspect-video" />
          <PlaceholderMedia iconName="factory" label="Quality Inspection" className="aspect-video" />
        </div>
      </Section>

      {/* CTA */}
      <Section tone="green">
        <div className="flex flex-col items-start gap-4">
          <h2 className="font-display text-2xl text-white sm:text-3xl">Discuss a manufacturing project</h2>
          <p className="max-w-md text-sm text-steel-grey-light">
            Request a consultation to talk through requirements, timeline, and specification.
          </p>
          <Button href="/contact" variant="premium">
            Request Consultation
            <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
          </Button>
        </div>
      </Section>
    </>
  );
}
