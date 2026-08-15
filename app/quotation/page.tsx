import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import QuotationForm from "@/components/forms/QuotationForm";

export const metadata = buildMetadata({
  title: "Request a Quotation",
  path: "/quotation",
  description: "Request a project quotation from IBEX Vehicle Restoration (Private) Limited.",
});

export default function QuotationPage() {
  return (
    <Section tone="black">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Quotation" }]} className="mb-10" />
      <SectionHeading
        eyebrow="Quotation"
        title="Request a Quotation"
        description="Tell us about the vehicle and project — we'll follow up with next steps."
        className="mb-12"
      />
      <Card className="max-w-3xl">
        <QuotationForm />
      </Card>
    </Section>
  );
}
