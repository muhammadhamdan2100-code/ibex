import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import CategoryGrid from "@/components/sections/CategoryGrid";
import { SMART_FLEET_AREAS } from "@/lib/data/capabilities";

export const metadata = buildMetadata({
  title: "Smart Fleet Technology",
  path: "/smart-fleet",
  description:
    "Smart fleet technology by IBEX Vehicle Restoration — GPS tracking, IoT monitoring, driver analytics, and predictive maintenance.",
});

export default function SmartFleetPage() {
  return (
    <>
      <Section tone="graphite">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Smart Fleet Technology" }]} className="mb-10" />
        <SectionHeading
          eyebrow="Smart Technology"
          title="Smart Fleet Technology"
          description="Connected fleet capability areas — detail on which are available and how they integrate will be organized here as it's confirmed from the official company document."
          className="mb-12"
        />
        <CategoryGrid categories={SMART_FLEET_AREAS} />
      </Section>
      <Section tone="black">
        <div className="flex flex-col items-start gap-4">
          <h2 className="font-display text-2xl text-white sm:text-3xl">Ask about fleet technology</h2>
          <Button href="/contact" variant="premium">
            Request Consultation
          </Button>
        </div>
      </Section>
    </>
  );
}
