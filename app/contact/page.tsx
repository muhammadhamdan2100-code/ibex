import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import ContactForm from "@/components/forms/ContactForm";
import ContactOptions from "@/components/sections/ContactOptions";
import LocationMap from "@/components/sections/LocationMap";
import { COMPANY, LEADERSHIP } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description: "Contact IBEX Vehicle Restoration (Private) Limited, Sadiqabad, Punjab, Pakistan.",
});

export default function ContactPage() {
  return (
    <>
      <Section tone="black">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} className="mb-10" />
        <SectionHeading
          eyebrow="Get In Touch"
          title="Request a Consultation"
          description="Call, WhatsApp, or email directly, or use the form below."
        />
        <div className="mt-10">
          <ContactOptions />
        </div>
      </Section>

      <Section tone="graphite">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <ContactForm />
          </Card>
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card className="flex flex-col gap-4">
              <h3 className="eyebrow">Head Office</h3>
              <p className="text-steel-grey-light leading-relaxed">
                {COMPANY.legalName}
                <br />
                {COMPANY.location.city}, District {COMPANY.location.district}
                <br />
                {COMPANY.location.province}, {COMPANY.location.country}
              </p>
              <div className="border-t border-white/10 pt-4 text-sm text-steel-grey-light">
                <p>CEO: {LEADERSHIP.ceo.name}</p>
                <p className="mt-1">{COMPANY.contact.mobile}</p>
                <p>{COMPANY.contact.additionalPhone1}</p>
                <p>{COMPANY.contact.additionalPhone2}</p>
                <p className="mt-1">{COMPANY.contact.primaryEmail}</p>
                <p>{COMPANY.contact.alternativeEmail}</p>
                <a
                  href={COMPANY.social.tikTok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-2 hover:text-gold-500 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.33-1.68 1.41-3.78 1.95-5.82 1.52-2.01-.43-3.84-1.63-5.04-3.3-1.4-1.89-1.43-4.3-.12-6.27 1.3-1.98 3.77-2.6 5.71-1.66.28.12.58.22.88.3v-5.3c0-.53-.04-1.06-.05-1.59 1.63-.12 3.25-.18 4.87-.07.06 1.64-.01 3.28.02 4.92z" />
                  </svg>
                  {COMPANY.social.tikTok.handle}
                </a>
              </div>
            </Card>
            <LocationMap />
          </div>
        </div>
      </Section>
    </>
  );
}
