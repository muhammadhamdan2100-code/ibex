import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import CategoryGrid from "@/components/sections/CategoryGrid";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { CREDENTIAL_AREAS } from "@/lib/data/credentials";
import { COMPANY, LEADERSHIP } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Company Credentials",
  path: "/company-credentials",
  description: "Company credentials, corporate philosophy, and standards — IBEX Vehicle Restoration (Private) Limited.",
});

export default function CompanyCredentialsPage() {
  return (
    <>
      <Section tone="graphite">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Company Credentials" }]} className="mb-10" />
        <SectionHeading
          eyebrow="Company"
          title="Company Credentials"
          description={`An overview of ${COMPANY.displayName}'s corporate standing. Statement text for each area — the CEO message, mission wording, and stated values — will be published here once confirmed from the official company document, not drafted generically in the meantime.`}
          className="mb-12"
        />
        <Card className="mb-12 flex flex-col gap-2 sm:max-w-sm">
          <span className="eyebrow">Chief Executive Officer</span>
          <span className="font-display text-xl text-white">{LEADERSHIP.ceo.name}</span>
        </Card>
        <CategoryGrid categories={CREDENTIAL_AREAS} />
      </Section>
      <EnterpriseCta />
    </>
  );
}
