import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FuelCalculator from "@/components/sections/FuelCalculator";

export const metadata = buildMetadata({
  title: "Fuel Calculator",
  path: "/fuel-calculator",
  description: "Estimate trip, monthly, and annual fuel costs — IBEX Vehicle Restoration (Private) Limited.",
});

export default function FuelCalculatorPage() {
  return (
    <Section tone="graphite">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Fuel Calculator" }]} className="mb-10" />
      <SectionHeading
        eyebrow="Operator Tool"
        title="Fuel Cost Calculator"
        description="Estimate trip, monthly, and annual fuel costs for petrol or diesel vehicles. A live fuel-price feed is not connected yet, so enter the current local price manually — see the note on the price field."
      />
      <div className="mt-12">
        <FuelCalculator />
      </div>
    </Section>
  );
}
