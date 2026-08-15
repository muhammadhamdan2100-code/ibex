import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { InvestorPartnerContactForm } from "@/components/forms/InvestorPartnerContactForm";
import { ICON_MAP } from "@/lib/icons";
import { COMPANY } from "@/lib/constants";
import { ArrowRight, Activity, Briefcase, Building2, Bus, Factory, Fuel, Globe2, MapPin, Radar, Rocket, Stethoscope, Truck, Zap, Target, Users, Brain, HeartHandshake } from "lucide-react";

export const metadata = buildMetadata({
  title: "Investors & Partners",
  path: "/investors-partners",
  description: "Investment opportunities and strategic partnerships at IBEX Vehicle Restoration (Private) Limited.",
});

const INVESTMENT_OPPORTUNITIES = [
  {
    title: "Special-Purpose Vehicle Manufacturing",
    description: "Custom engineering and production of vehicles for government, emergency services, healthcare, and industrial applications.",
    icon: "truck",
  },
  {
    title: "Automotive Engineering & Restoration",
    description: "Advanced vehicle restoration, modification, and customization for commercial and public sector clients.",
    icon: "wrench",
  },
  {
    title: "Electric & Hybrid Mobility",
    description: "Development of electric buses, hybrid emergency vehicles, and sustainable mobility solutions.",
    icon: "zap",
  },
  {
    title: "Smart Fleet Management",
    description: "IoT-enabled fleet monitoring, GPS tracking, and maintenance optimization systems.",
    icon: "radar",
  },
  {
    title: "Healthcare Mobility",
    description: "Mobile clinics, ambulance conversion, and healthcare transport vehicles for remote and underserved areas.",
    icon: "stethoscope",
  },
  {
    title: "Cold Chain Transportation",
    description: "Refrigerated transport solutions for pharmaceuticals, food, and perishable goods.",
    icon: "snowflake",
  },
  {
    title: "Emergency & Disaster Response",
    description: "Rapid deployment vehicles for disaster relief, medical emergencies, and humanitarian aid.",
    icon: "activity",
  },
  {
    title: "R&D & Future Technology",
    description: "Research in autonomous mobility, alternative fuels, and next-generation vehicle platforms.",
    icon: "brain",
  },
];

const STRATEGIC_PARTNERSHIPS = [
  {
    title: "Automotive & Chassis Technology",
    description: "Collaboration on vehicle platforms, chassis development, and powertrain integration.",
    icon: "building-2",
  },
  {
    title: "Mobility Technology",
    description: "Partnerships for smart transportation solutions and urban mobility innovation.",
    icon: "bus",
  },
  {
    title: "EV & Battery Technology",
    description: "Joint development of electric vehicle systems and battery management solutions.",
    icon: "zap",
  },
  {
    title: "Fleet Technology",
    description: "Fleet management software, telematics, and maintenance optimization partners.",
    icon: "calendar-check",
  },
  {
    title: "Healthcare Equipment",
    description: "Integration of medical equipment into mobile healthcare vehicles and ambulances.",
    icon: "heart-handshake",
  },
  {
    title: "Cold Chain Technology",
    description: "Refrigeration systems and temperature-controlled transport solutions.",
    icon: "snowflake",
  },
  {
    title: "Government & Institutional Projects",
    description: "Partnerships for public-sector procurement and infrastructure development.",
    icon: "building",
  },
  {
    title: "Engineering & Manufacturing",
    description: "Collaborative manufacturing, component supply, and precision engineering.",
    icon: "factory",
  },
  {
    title: "Research & Development",
    description: "Joint R&D initiatives for mobility innovation and technology advancement.",
    icon: "flask-conical",
  },
  {
    title: "International Distribution",
    description: "Export partnerships for GCC, Central Asia, Africa, and emerging markets.",
    icon: "globe-2",
  },
];

const FUTURE_TECHNOLOGY = [
  { title: "Electric Vehicles", description: "EV platform development and battery integration" },
  { title: "Hybrid Systems", description: "Hybrid powertrain optimization for heavy vehicles" },
  { title: "Smart Fleet", description: "IoT-enabled fleet monitoring and analytics" },
  { title: "Autonomous Mobility", description: "Research into self-driving vehicle technology" },
  { title: "Alternative Fuels", description: "CNG, hydrogen, and biofuel vehicle conversions" },
  { title: "Mobile Infrastructure", description: "Mobile labs, clinics, and field units" },
];

export default function InvestorsPartnersPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="black">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Investors & Partners" }]} className="mb-10" />
        <div className="max-w-3xl">
          <span className="eyebrow">Strategic Investment Opportunity</span>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
            Invest in the Future of Mobility
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-steel-grey-light">
            IBEX Vehicle Restoration (Private) Limited presents a unique investment opportunity in Pakistan's automotive engineering and special-purpose vehicle manufacturing sector. Backed by Dar Ul Amal Human Rights Organization Pakistan, we combine commercial excellence with social impact.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="premium">
              Explore a Partnership
              <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
            </Button>
            <Button href="#investment" variant="outline">
              Investment Opportunities
            </Button>
          </div>
        </div>
      </Section>

      {/* Why IBEX */}
      <Section id="why" tone="graphite">
        <SectionHeading
          eyebrow="Why Invest"
          title="Why IBEX?"
          description="A unique convergence of automotive engineering expertise, institutional backing, and social impact potential in Pakistan's growing mobility market."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-500/10 text-gold-500">
              <Target size={20} />
            </div>
            <span className="eyebrow">Specialized Niche</span>
            <p className="text-sm text-steel-grey-light">Focus on special-purpose vehicles with limited competition and high-value contracts.</p>
          </Card>
          <Card className="flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-500/10 text-gold-500">
              <Building2 size={20} />
            </div>
            <span className="eyebrow">Institutional Backing</span>
            <p className="text-sm text-steel-grey-light">Integrated project of Dar Ul Amal Human Rights Organization Pakistan.</p>
          </Card>
          <Card className="flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-500/10 text-gold-500">
              <Activity size={20} />
            </div>
            <span className="eyebrow">Diverse Applications</span>
            <p className="text-sm text-steel-grey-light">Solutions across healthcare, emergency services, transportation, and industry.</p>
          </Card>
          <Card className="flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-500/10 text-gold-500">
              <Globe2 size={20} />
            </div>
            <span className="eyebrow">Export Potential</span>
            <p className="text-sm text-steel-grey-light">Target markets in GCC, Central Asia, and Africa for long-term growth.</p>
          </Card>
        </div>
      </Section>

      {/* Investment Opportunity Areas */}
      <Section id="investment" tone="black">
        <SectionHeading
          eyebrow="Opportunities"
          title="Investment Opportunity Areas"
          description="Diverse sectors where your investment can drive innovation and growth in Pakistan's mobility ecosystem."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INVESTMENT_OPPORTUNITIES.map(({ title, description, icon }) => {
            const Icon = ICON_MAP[icon as keyof typeof ICON_MAP] ?? ICON_MAP.default;
            return (
              <Card key={title} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold-500/10 text-gold-500">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-base text-white">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-steel-grey-light">{description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Strategic Partnership Areas */}
      <Section id="partners" tone="graphite">
        <SectionHeading
          eyebrow="Collaboration"
          title="Strategic Partnership Areas"
          description="Potential collaboration categories across the mobility and manufacturing value chain. IBEX seeks partners who share our commitment to quality, innovation, and social impact."
        />
        <div className="grid grid-cols-1 gap-4">
          {STRATEGIC_PARTNERSHIPS.map(({ title, description, icon }) => {
            const Icon = ICON_MAP[icon as keyof typeof ICON_MAP] ?? ICON_MAP.default;
            return (
              <Card key={title} className="flex flex-col gap-3 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold-500/10 text-gold-500">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-white">{title}</h3>
                    <p className="mt-1 text-sm text-steel-grey-light">{description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* R&D & Future Mobility */}
      <Section id="rd" tone="black">
        <SectionHeading
          eyebrow="Innovation"
          title="R&D & Future Mobility"
          description="Commitment to advancing mobility technology through research, development, and strategic partnerships."
        />
        <div className="mb-12 flex flex-wrap gap-3">
          {FUTURE_TECHNOLOGY.map((t) => (
            <span key={t.title} className="rounded-pill border border-gold-500/30 bg-gold-500/5 px-4 py-2 text-sm text-gold-500">
              {t.title}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card className="flex flex-col gap-3 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-gold text-matte-black">
              <Rocket size={24} />
            </div>
            <h3 className="font-display text-lg text-white">Electric Vehicles</h3>
            <p className="text-sm text-steel-grey-light">{FUTURE_TECHNOLOGY.find(t => t.title === "Electric Vehicles")?.description}</p>
          </Card>
          <Card className="flex flex-col gap-3 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-gold text-matte-black">
              <Fuel size={24} />
            </div>
            <h3 className="font-display text-lg text-white">Hybrid Systems</h3>
            <p className="text-sm text-steel-grey-light">{FUTURE_TECHNOLOGY.find(t => t.title === "Hybrid Systems")?.description}</p>
          </Card>
          <Card className="flex flex-col gap-3 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-gold text-matte-black">
              <Radar size={24} />
            </div>
            <h3 className="font-display text-lg text-white">Smart Fleet</h3>
            <p className="text-sm text-steel-grey-light">{FUTURE_TECHNOLOGY.find(t => t.title === "Smart Fleet")?.description}</p>
          </Card>
        </div>
      </Section>

      {/* Export Vision */}
      <Section id="export" tone="graphite">
        <SectionHeading
          eyebrow="Global Reach"
          title="Export Vision"
          description="Long-term strategy to establish IBEX as a recognized brand in special-purpose vehicles across international markets."
        />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-gold-500">
              <Globe2 size={32} />
            </div>
            <h3 className="font-display text-lg text-white">GCC / Middle East</h3>
            <p className="text-sm text-steel-grey-light">Target markets for premium special-purpose vehicles and mobile infrastructure solutions.</p>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-gold-500">
              <MapPin size={32} />
            </div>
            <h3 className="font-display text-lg text-white">Central Asia</h3>
            <p className="text-sm text-steel-grey-light">Opportunities for transportation solutions in diverse geographical and climatic conditions.</p>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-gold-500">
              <Truck size={32} />
            </div>
            <h3 className="font-display text-lg text-white">Africa</h3>
            <p className="text-sm text-steel-grey-light">Growing demand for durable, purpose-built vehicles for various applications.</p>
          </Card>
        </div>
      </Section>

      {/* Dar Ul Amal Institutional Relationship */}
      <Section id="institutional" tone="black">
        <SectionHeading
          eyebrow="Institutional Background"
          title="Dar Ul Amal Human Rights Organization Pakistan"
          description="IBEX Vehicle Restoration (Private) Limited is an integrated project of Dar Ul Amal Human Rights Organization Pakistan — not an external partnership, but an organic institutional relationship."
        />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col gap-3 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500 text-matte-black">
              <Users size={24} />
            </div>
            <h3 className="font-display text-lg text-white">Social Impact Focus</h3>
            <p className="text-sm text-steel-grey-light">40% of annual net profit dedicated to welfare, humanitarian, and sustainable development programs.</p>
          </Card>
          <Card className="flex flex-col gap-3 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500 text-matte-black">
              <HeartHandshake size={24} />
            </div>
            <h3 className="font-display text-lg text-white">Humanitarian Infrastructure</h3>
            <p className="text-sm text-steel-grey-light">Disaster response vehicles, mobile healthcare units, and emergency mobility solutions.</p>
          </Card>
          <Card className="flex flex-col gap-3 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500 text-matte-black">
              <Brain size={24} />
            </div>
            <h3 className="font-display text-lg text-white">Technical Training</h3>
            <p className="text-sm text-steel-grey-light">Skill development programs and employment opportunities through the IBEX ecosystem.</p>
          </Card>
        </div>
      </Section>

      {/* Contact Form */}
      <Section id="contact" tone="graphite">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Start Your Partnership Journey"
          description="Ready to explore investment opportunities or partnership possibilities? Fill out the form below and our team will get back to you shortly."
          className="mb-10"
        />
        <div className="max-w-3xl mx-auto">
          <InvestorPartnerContactForm />
        </div>
      </Section>
    </>
  );
}
