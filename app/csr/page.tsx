import { HeartHandshake, ShieldQuestion } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import CategoryGrid from "@/components/sections/CategoryGrid";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { CSR_PROGRAM_AREAS } from "@/lib/data/csr";
import { COMPANY } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "CSR",
  path: "/csr",
  description: "Corporate Social Responsibility — IBEX Vehicle Restoration is an integrated project of Dar Ul Amal Human Rights Organization Pakistan, with 40% of annual net profit dedicated to welfare and humanitarian programs.",
});

/**
 * CSR page. The Dar Ul Amal relationship (IBEX is an integrated project
 * of the parent organization, per Phase 7) and the 40% annual net profit
 * commitment are stated directly as fact — client-provided information,
 * same as anything else given directly in chat. Every other section
 * (program areas, timeline, annual impact, transparency) stays honestly
 * structural: no specific figures, beneficiary counts, or dates are
 * invented beyond what was actually given.
 */
export default function CsrPage() {
  return (
    <>
      <Section tone="green">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "CSR" }]} className="mb-10" />
        <SectionHeading
          eyebrow="Company — CSR"
          title="Corporate Social Responsibility"
          description={`${COMPANY.displayName} is an integrated project of Dar Ul Amal Human Rights Organization Pakistan, its parent organization, and maintains a formal social responsibility commitment.`}
        />
      </Section>

      {/* The two confirmed facts, front and center */}
      <Section tone="black">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="flex flex-col gap-3">
            <HeartHandshake size={26} className="text-gold-500" aria-hidden="true" />
            <h2 className="font-display text-xl text-white">Dar Ul Amal Human Rights Organization</h2>
            <p className="text-sm leading-relaxed text-steel-grey-light">
              IBEX Vehicle Restoration is an integrated project of Dar Ul Amal Human Rights
              Organization Pakistan, its parent organization.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <span className="font-display text-4xl text-gold-500">40%</span>
            <h2 className="font-display text-xl text-white">Annual Net Profit Commitment</h2>
            <p className="text-sm leading-relaxed text-steel-grey-light">
              40% of annual net profit is dedicated to welfare, humanitarian service, and
              sustainable development projects.
            </p>
          </Card>
        </div>
      </Section>

      {/* Program areas — structural only */}
      <Section tone="graphite">
        <SectionHeading
          eyebrow="Program Areas"
          title="Where The Commitment Is Directed"
          description="Program-level detail — reach, beneficiaries, and specific initiatives under each area — will be published here once confirmed from the official company document."
          className="mb-12"
        />
        <CategoryGrid categories={CSR_PROGRAM_AREAS} />
      </Section>

      {/* Timeline / Impact / Philosophy / Transparency — honest placeholders */}
      <Section tone="black">
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-gold-500/30 bg-gold-500/5 p-5">
          <ShieldQuestion size={22} className="mt-0.5 shrink-0 text-gold-500" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-steel-grey-light">
            The Dar Ul Amal relationship and the 40% profit commitment above are stated as
            confirmed. The sections below are structural placeholders pending further detail from
            the official company document — no dates, figures, or specific initiatives are invented.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col gap-2">
            <h3 className="font-display text-base text-white">CSR Timeline</h3>
            <p className="text-sm text-steel-grey-light">Milestones pending confirmation.</p>
          </Card>
          <Card className="flex flex-col gap-2">
            <h3 className="font-display text-base text-white">Annual Impact</h3>
            <p className="text-sm text-steel-grey-light">Figures pending confirmation.</p>
          </Card>
          <Card className="flex flex-col gap-2">
            <h3 className="font-display text-base text-white">Donation Philosophy</h3>
            <p className="text-sm text-steel-grey-light">Statement pending confirmation.</p>
          </Card>
          <Card className="flex flex-col gap-2">
            <h3 className="font-display text-base text-white">Transparency</h3>
            <p className="text-sm text-steel-grey-light">Reporting approach pending confirmation.</p>
          </Card>
        </div>
      </Section>

      <EnterpriseCta
        title="Learn more about our CSR commitment"
        description="Get in touch to discuss the Dar Ul Amal relationship or a community program."
      />
    </>
  );
}
