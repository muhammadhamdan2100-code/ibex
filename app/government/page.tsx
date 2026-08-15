import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { REGISTRATIONS } from "@/lib/data/government";
import { COMPANY, LEADERSHIP } from "@/lib/constants";
import { ICON_MAP } from "@/lib/icons";

export const metadata = buildMetadata({
  title: "Government",
  path: "/government",
  description: "Government registration status and corporate information for IBEX Vehicle Restoration (Private) Limited.",
});

/**
 * Government page. Registration numbers, CEO name, and contact details
 * below are the ones stated directly in the Phase 7 brief — treated as
 * confirmed fact, same as any client-provided information given in chat.
 * The two e-PAD entries still have no number supplied, so those stay
 * marked pending rather than guessed at.
 */
export default function GovernmentPage() {
  return (
    <>
      <Section tone="green">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Government" }]} className="mb-10" />
        <SectionHeading
          eyebrow="Company — Government"
          title="Government Registration & Capability"
          description={`${COMPANY.displayName} is registered for and positioned to work on federal, provincial, and local government vehicle projects — ambulances, mobile clinics, rescue and command vehicles, buses, coaches, vans, cargo vehicles, porta cabins, mobile offices, and custom engineering, with after-sales support.`}
        />
      </Section>

      <Section tone="black">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REGISTRATIONS.map(({ code, name, icon, number }) => {
            const Icon = ICON_MAP[icon] ?? ICON_MAP.default;
            return (
              <Card key={code} className="flex flex-col gap-3">
                <Icon size={22} className="text-gold-500" aria-hidden="true" />
                <h3 className="font-display text-lg text-white">{name}</h3>
                <span className="font-mono text-sm tracking-wide text-gold-500">
                  {number ?? "Pending confirmation"}
                </span>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section tone="graphite">
        <SectionHeading eyebrow="Corporate Information" title="Corporate Information" className="mb-10" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card className="flex flex-col gap-2">
            <h3 className="font-display text-base text-white">CEO</h3>
            <p className="text-sm text-steel-grey-light">{LEADERSHIP.ceo.name}</p>
          </Card>
          <Card className="flex flex-col gap-2">
            <h3 className="font-display text-base text-white">Head Office</h3>
            <p className="text-sm text-steel-grey-light">
              {COMPANY.location.city}, District {COMPANY.location.district},
              <br />
              {COMPANY.location.province}, {COMPANY.location.country}
            </p>
          </Card>
          <Card className="flex flex-col gap-2">
            <h3 className="font-display text-base text-white">Official Emails</h3>
            <p className="text-sm text-steel-grey-light">
              {COMPANY.contact.primaryEmail}
              <br />
              {COMPANY.contact.alternativeEmail}
            </p>
          </Card>
        </div>
      </Section>

      <EnterpriseCta
        title="Discuss a government project"
        description="Request a consultation to talk through eligibility, requirements, and scope for a public-sector project."
      />
    </>
  );
}
