import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FaqList from "@/components/sections/FaqList";
import { CUSTOM_ENGINEERING_AREAS } from "@/lib/data/capabilities";
import { COMPANY } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Custom Engineering",
  path: "/custom-engineering",
  description:
    "Custom vehicle engineering by IBEX Vehicle Restoration — restoration, fabrication, chassis modification, 3D engineering, prototyping, testing, and commissioning.",
});

const INDUSTRIES_SERVED = [
  "Public and private transport operators",
  "Healthcare and emergency services",
  "Government and defense",
  "Hospitality and tourism",
  "Industrial and logistics",
  "Media and events",
];

const FAQ = [
  {
    question: "Do you work from an existing vehicle or build from scratch?",
    answer:
      "Both — custom engineering here covers restoring and modifying an existing vehicle as well as building a new one to a custom specification. Which applies depends on the project, and is confirmed during consultation.",
  },
  {
    question: "How does a custom engineering project start?",
    answer:
      "With a consultation to understand the requirement — use case, configuration, and constraints — before any engineering or fabrication work begins.",
  },
  {
    question: "How long does a custom project take?",
    answer:
      "Timelines vary by scope and are confirmed during consultation rather than quoted generically here.",
  },
];

export default function CustomEngineeringPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="black">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Custom Engineering" }]} className="mb-10" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Custom Engineering</span>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
              Engineered To Order
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-steel-grey-light">
              Custom vehicle engineering by {COMPANY.displayName}, from initial concept through
              commissioning — based in {COMPANY.location.city}, {COMPANY.location.province}.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="premium">
                Request Consultation
                <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
              </Button>
              <Button href="/manufacturing" variant="outline">
                See Manufacturing Process
              </Button>
            </div>
          </div>
          <PlaceholderMedia iconName="building-2" label="Custom Engineering" className="aspect-[4/3]" />
        </div>
      </Section>

      {/* Overview */}
      <Section tone="graphite">
        <SectionHeading
          eyebrow="Overview"
          title="Concept To Commissioning"
          description="Custom engineering covers every stage between an initial requirement and a finished, tested vehicle — the eleven capability areas below are the building blocks of that process, not a fixed package. Detail on each is organized as it's confirmed from the official company document."
        />
      </Section>

      {/* Engineering Process */}
      <Section tone="black">
        <SectionHeading eyebrow="Capability Areas" title="Engineering Process" className="mb-12" />
        <CategoryGrid categories={CUSTOM_ENGINEERING_AREAS} />
      </Section>

      {/* Gallery placeholder */}
      <Section tone="graphite">
        <SectionHeading eyebrow="Gallery" title="Project Gallery" className="mb-10" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CUSTOM_ENGINEERING_AREAS.slice(0, 3).map((area) => (
            <PlaceholderMedia key={area.slug} iconName={area.icon} label={area.title} className="aspect-video" />
          ))}
        </div>
      </Section>

      {/* Technical Specifications + Industries Served */}
      <Section tone="black">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="flex flex-col gap-3">
            <h2 className="font-display text-lg text-white">Technical Specifications</h2>
            <p className="text-sm leading-relaxed text-steel-grey-light">
              Specification detail is project-specific by nature — for custom engineering work
              there is no single fixed spec sheet. Confirmed capability parameters will be
              published here once available from the official company document.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <h2 className="font-display text-lg text-white">Industries Served</h2>
            <ul className="grid grid-cols-1 gap-1.5 text-sm leading-relaxed text-steel-grey-light sm:grid-cols-2">
              {INDUSTRIES_SERVED.map((industry) => (
                <li key={industry}>{industry}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="graphite">
        <SectionHeading eyebrow="FAQ" title="Common Questions" className="mb-10" />
        <div className="max-w-2xl">
          <FaqList items={FAQ} />
        </div>
      </Section>

      {/* Related Services */}
      <Section tone="black">
        <SectionHeading eyebrow="Related" title="Related Services" className="mb-10" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <RelatedServiceTile href="/manufacturing" title="Manufacturing" />
          <RelatedServiceTile href="/solutions" title="Solutions Ecosystem" />
          <RelatedServiceTile href="/quality" title="Quality Standards" />
        </div>
      </Section>

      {/* CTA */}
      <Section tone="green">
        <div className="flex flex-col items-start gap-4">
          <h2 className="font-display text-2xl text-white sm:text-3xl">Start a custom project</h2>
          <Button href="/contact" variant="premium">
            Request Consultation
            <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
          </Button>
        </div>
      </Section>
    </>
  );
}

// Small local helper for the three one-line related-service tiles.
function RelatedServiceTile({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="block">
      <Card interactive className="flex items-center justify-between">
        <span className="font-display text-base text-white">{title}</span>
        <ArrowRight size={16} className="text-gold-500" aria-hidden="true" />
      </Card>
    </Link>
  );
}
