import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import WorkflowStrip from "@/components/home/WorkflowStrip";
import { REGISTRATIONS } from "@/lib/data/government";
import { CORE_VALUES } from "@/lib/data/core-values";
import { ABOUT_CAPABILITIES } from "@/lib/data/about-what-we-do";
import { QUALITY_STANDARDS } from "@/lib/data/quality-standards";
import { FUTURE_TECHNOLOGY, EXPORT_MARKETS } from "@/lib/data/global-vision";
import { ICON_MAP } from "@/lib/icons";
import { COMPANY } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "About",
  path: "/about",
  description:
    "IBEX Vehicle Restoration (Private) Limited — company profile, vision, mission, core values, and government registrations.",
});

const ABOUT_QUALITY_STEPS = [
  { step: 1, title: "Raw Material Inspection" },
  { step: 2, title: "Fabrication Inspection" },
  { step: 3, title: "Painting & Dimensional Checks" },
  { step: 4, title: "Road, Brake & Electrical Testing" },
  { step: 5, title: "Final Quality Clearance" },
];

export default function AboutPage() {
  return (
    <Section tone="graphite">
      {/* Hero */}
      <div className="max-w-2xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} className="mb-10" />
        <span className="eyebrow">Company Profile</span>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
          IBEX Vehicle Restoration
        </h1>
        <p className="mt-2 font-display text-lg text-gold-500">Engineering Mobility. Rebuilding With Trust.</p>
        <p className="mt-5 text-base leading-relaxed text-steel-grey-light">
          {COMPANY.legalName} is a modern automotive engineering and special-purpose vehicle
          manufacturing company established in 2023 in {COMPANY.location.city}, {COMPANY.location.province},
          Pakistan, as a project of Dar Ul Amal Human Rights Organization Pakistan.
        </p>
      </div>

      {/* Who We Are */}
      <SectionHeading
        className="mt-16"
        eyebrow="Company"
        title="Who We Are"
        description={`${COMPANY.legalName} is a modern Pakistani automotive engineering and special-purpose vehicle manufacturing company, established in 2023 in ${COMPANY.location.city}, ${COMPANY.location.province}, as a project under Dar Ul Amal Human Rights Organization Pakistan. Our purpose is not merely vehicle repair or restoration — through advanced engineering, research, and local expertise, we build vehicles that meet the needs of government, industry, healthcare, education, tourism, agriculture, livestock farming, emergency services, business, and the general public.`}
      />

      {/* Company at a Glance */}
      <SectionHeading
        className="mt-16 mb-12"
        eyebrow="Overview"
        title="Company At A Glance"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col gap-1">
          <span className="eyebrow">Established</span>
          <span className="font-display text-lg text-white">2023</span>
        </Card>
        <Card className="flex flex-col gap-1 sm:col-span-2">
          <span className="eyebrow">Headquarters</span>
          <span className="font-display text-lg text-white">
            {COMPANY.location.city}, District {COMPANY.location.district}, {COMPANY.location.province}, {COMPANY.location.country}
          </span>
        </Card>
        {REGISTRATIONS.slice(0, 5).map(({ code, name, number }) => (
          <Card key={code} className="flex flex-col gap-1">
            <span className="eyebrow">{name}</span>
            <span className="font-mono text-sm text-gold-500">{number ?? "Pending confirmation"}</span>
          </Card>
        ))}
        <Card className="flex flex-col gap-1">
          <span className="eyebrow">Project Of</span>
          <span className="font-display text-base text-white">Dar Ul Amal Human Rights Organization Pakistan</span>
        </Card>
      </div>

      {/* Vision */}
      <SectionHeading
        className="mt-16 mb-12"
        eyebrow="Vision"
        title="Our Vision"
        description="To establish Pakistan as a regionally and globally recognized name in special-purpose vehicles, advanced mobility, electric and hybrid technology, and mobile infrastructure — so that 'Made in Pakistan' becomes a symbol of quality, innovation, and trust."
      />
      <div className="flex flex-wrap gap-3">
        {["Made in Pakistan", "Innovation", "Trust", "Advanced Mobility"].map((tag) => (
          <span key={tag} className="rounded-pill border border-gold-500/30 bg-gold-500/5 px-4 py-2 text-sm text-gold-500">
            {tag}
          </span>
        ))}
      </div>

      {/* Mission */}
      <SectionHeading
        className="mt-16"
        eyebrow="Mission"
        title="Our Mission"
        description="Through high standards, research, customer trust, and continuous innovation, we deliver safe, durable, environmentally responsible, and fully customized vehicles and mobile solutions. We bring government, private, welfare, and business organizations together on a single platform, offering world-class engineering solutions."
      />

      {/* Core Values */}
      <SectionHeading
        className="mt-16 mb-12"
        eyebrow="Values"
        title="Core Values"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CORE_VALUES.map(({ number, title, description, icon }) => {
          const Icon = ICON_MAP[icon] ?? ICON_MAP.default;
          return (
            <Card key={number} interactive className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gold-500">{String(number).padStart(2, "0")}</span>
                <Icon size={20} className="text-gold-500" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-steel-grey-light">{description}</p>
            </Card>
          );
        })}
      </div>

      {/* What We Do */}
      <SectionHeading
        className="mt-16 mb-12"
        eyebrow="Capabilities"
        title="What We Do"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ABOUT_CAPABILITIES.map(({ number, title, href, icon }) => {
          const Icon = ICON_MAP[icon] ?? ICON_MAP.default;
          return (
            <a key={number} href={href} className="flex flex-col gap-3">
              <Card interactive className="flex h-full flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gold-500">{String(number).padStart(2, "0")}</span>
                  <Icon size={20} className="text-gold-500" aria-hidden="true" />
                </div>
                <h3 className="font-display text-base text-white">{title}</h3>
              </Card>
            </a>
          );
        })}
      </div>

      {/* Dar Ul Amal Relationship */}
      <SectionHeading
        className="mt-16 mb-10"
        eyebrow="Parent Organization"
        title="A Project Of Dar Ul Amal Human Rights Organization Pakistan"
        description="As IBEX Vehicle Restoration (Pvt) Limited is itself an integrated project of Dar Ul Amal Human Rights Organization Pakistan, this is not an external partnership, but an organic institutional relationship."
      />
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="font-display text-sm uppercase tracking-widest text-white">
          Dar Ul Amal Human Rights Organization Pakistan
        </span>
        <span className="font-display text-lg text-gold-500">IBEX Vehicle Restoration</span>
        <span className="text-sm text-steel-grey-light">Engineering + Mobility + Social Impact</span>
      </div>

      {/* Social Impact / CSR */}
      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            className="mb-6"
            eyebrow="Social Impact"
            title="Engineering With Social Purpose"
            description="IBEX is committed to dedicating 40% of its annual net profit to Dar Ul Amal Human Rights Organization Pakistan's welfare, humanitarian service, and sustainable development projects — including disaster response vehicles, mobile healthcare, mobile clinics, emergency vehicles, technical training, employment opportunities, green technology, and community development."
          />
          <Button href="/csr" variant="premium" className="mt-6">
            Explore Our CSR
          </Button>
        </div>
        <Card className="flex flex-col items-center justify-center gap-2 p-10 text-center">
          <span className="font-display text-5xl text-gold-500">40%</span>
          <span className="text-sm text-steel-grey-light">of annual net profit dedicated to welfare and humanitarian programs</span>
        </Card>
      </div>

      {/* Government & Public Procurement */}
      <SectionHeading
        className="mt-16 mb-8"
        eyebrow="Credibility"
        title="Government & Public Procurement"
        description="IBEX Vehicle Restoration is registered with PPRA and the relevant e-PAD systems for public-sector procurement eligibility."
      />
      <details className="glass rounded-lg p-5">
        <summary className="cursor-pointer font-display text-sm text-white">Official Registration Information</summary>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {REGISTRATIONS.filter((r) => ["PPRA", "e-PAD-PB", "e-PAD-FED"].includes(r.code)).map(({ code, name, number }) => (
            <div key={code} className="flex flex-col gap-1 border-t border-white/10 pt-3 first:border-0 first:pt-0">
              <span className="eyebrow">{name}</span>
              <span className="font-mono text-sm text-gold-500 break-all">{number ?? "Pending confirmation"}</span>
            </div>
          ))}
        </div>
      </details>

      {/* Quality & Safety */}
      <SectionHeading
        className="mt-16 mb-10"
        eyebrow="Discipline"
        title="Quality. Safety. Engineering Discipline."
      />
      <WorkflowStrip steps={ABOUT_QUALITY_STEPS} />
      <div className="mt-8 flex flex-wrap gap-3">
        {QUALITY_STANDARDS.map((std) => (
          <span
            key={std.code}
            className="flex items-center gap-2 rounded-pill border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wide text-steel-grey-light"
          >
            {std.code}
            {std.status && <span className="text-cyan-400">— {std.status}</span>}
          </span>
        ))}
      </div>

      {/* R&D / Future Vision + Global Export Vision */}
      <SectionHeading
        className="mt-16 mb-8"
        eyebrow="Future"
        title="Future Vision & R&D"
      />
      <div className="mb-12 flex flex-wrap gap-3">
        {FUTURE_TECHNOLOGY.map((t) => (
          <span key={t.slug} className="rounded-pill border border-white/10 bg-white/5 px-4 py-2 text-sm text-steel-grey-light">
            {t.title}
          </span>
        ))}
      </div>
      <SectionHeading
        eyebrow="Long-Term Vision"
        title="Global Export Vision"
        description="A long-term goal, not a current export claim — intended markets include the GCC / Middle East, Central Asia, and Africa."
        className="mb-8"
      />
      <div className="flex flex-wrap gap-3">
        {EXPORT_MARKETS.slice(0, 3).map((m) => (
          <span key={m.slug} className="rounded-pill border border-gold-500/30 bg-gold-500/5 px-4 py-2 text-sm text-gold-500">
            {m.title}
          </span>
        ))}
      </div>

      {/* Contact / Executive Information */}
      <SectionHeading
        className="mt-16 mb-10"
        eyebrow="Contact"
        title="Contact Information"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col gap-1">
          <span className="eyebrow">Phone</span>
          <a href={`tel:${COMPANY.contact.mobile.replace(/\s/g, "")}`} className="font-display text-base text-gold-500 hover:text-gold-300">
            {COMPANY.contact.mobile}
          </a>
        </Card>
        <Card className="flex flex-col gap-1 sm:col-span-2 lg:col-span-3">
          <span className="eyebrow">Headquarters</span>
          <span className="font-display text-base text-white">
            {COMPANY.location.city}, District {COMPANY.location.district}, {COMPANY.location.province}, {COMPANY.location.country}
          </span>
        </Card>
        <Card className="flex flex-col gap-1">
          <span className="eyebrow">Primary Email</span>
          <a href={`mailto:${COMPANY.contact.primaryEmail}`} className="font-display text-base text-gold-500 hover:text-gold-300 break-all">
            {COMPANY.contact.primaryEmail}
          </a>
        </Card>
        <Card className="flex flex-col gap-1">
          <span className="eyebrow">Alternative Email</span>
          <a href={`mailto:${COMPANY.contact.alternativeEmail}`} className="font-display text-base text-gold-500 hover:text-gold-300 break-all">
            {COMPANY.contact.alternativeEmail}
          </a>
        </Card>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/contact" variant="premium">
          Request A Consultation
        </Button>
        <Button href="/contact" variant="outline">
          Contact IBEX
        </Button>
      </div>
    </Section>
  );
}
