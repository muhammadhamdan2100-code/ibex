import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { LEADERSHIP } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Founders & Leadership",
  path: "/founder",
  description:
    "Meet the leadership team behind IBEX Vehicle Restoration — guiding excellence, innovation, and trust in Pakistan's automotive engineering sector.",
});

export default function FounderPage() {
  return (
    <Section tone="graphite">
      {/* Hero Section */}
      <div className="max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Founders & Leadership" }]} className="mb-10" />
        <span className="eyebrow">FOUNDER & LEADERSHIP</span>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
          Leadership Behind IBEX
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-steel-grey-light">
          IBEX Vehicle Restoration is guided by experienced leadership committed to engineering excellence,
          innovation, trust, and long-term development. Together, we build the future of mobility with
          purpose and precision.
        </p>
      </div>

      {/* CEO / Founder Feature Section */}
      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            className="mb-4"
            eyebrow="Chief Executive Officer"
            title="Qamar Bilal Nasir Al-Rai"
          />
          <p className="text-lg leading-relaxed text-steel-grey-light">
            As the Chief Executive Officer, Qamar Bilal Nasir Al-Rai provides strategic direction and
            leadership to IBEX Vehicle Restoration. With a deep commitment to engineering excellence and
            quality standards, he guides the company's mission to rebuild trust in Pakistan's automotive
            engineering sector.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="premium">
              Start a Conversation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2 h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-white/10 p-2 ring-1 ring-white/10">
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-white/5">
              <img
                src="/team/ceo/ceo.jpg"
                alt="Qamar Bilal Nasir Al-Rai"
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <SectionHeading
        className="mt-24 mb-12"
        eyebrow="Executive Team"
        title="Dedicated to Engineering Excellence"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Director Card */}
        <Card className="flex flex-col items-center text-center gap-4 p-6 transition-all hover:shadow-lg hover:shadow-gold-500/5">
          <div className="relative h-48 w-48 overflow-hidden rounded-full ring-2 ring-white/10 transition-all hover:ring-gold-500/30">
            <img
              src="/team/director/director.jpg"
              alt="Naeem Azam"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="font-display text-xl text-white">Naeem Azam</h3>
            <p className="mt-1 text-sm font-medium text-gold-500">Director</p>
          </div>
        </Card>

        {/* Business Development Manager Card */}
        <Card className="flex flex-col items-center text-center gap-4 p-6 transition-all hover:shadow-lg hover:shadow-gold-500/5">
          <div className="relative h-48 w-48 overflow-hidden rounded-full ring-2 ring-white/10 transition-all hover:ring-gold-500/30">
            <img
              src="/team/business-development-manager/business development manager.jpg"
              alt="Mudassar Zunair Mohsan"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="font-display text-xl text-white">Mudassar Zunair Mohsan</h3>
            <p className="mt-1 text-sm font-medium text-gold-500">Business Development Manager</p>
          </div>
        </Card>
      </div>

      {/* Trusted Partners Section */}
      <SectionHeading
        className="mt-24 mb-12"
        eyebrow="Trusted Partners"
        title="Trusted by Leading Organizations"
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* Partner 1 - Engr. Talha Akram */}
        <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center transition-all hover:shadow-lg hover:shadow-gold-500/5">
          <div className="relative h-64 w-64 overflow-hidden rounded-full ring-2 ring-gold-500/30 transition-all hover:ring-gold-500/50 bg-gradient-to-b from-white/5 to-white/10 p-4">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-black/20">
              <img
                src="/team/Trusted Partners/Talha Akram.jpg"
                alt="Engr. Talha Akram"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
          <h3 className="font-display text-lg text-white">Engr. Talha Akram</h3>
          <p className="text-sm text-steel-grey-light">Trusted Partner</p>
        </Card>

        {/* Partner 2 - Engr. Muneer Ahmed */}
        <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center transition-all hover:shadow-lg hover:shadow-gold-500/5">
          <div className="relative h-64 w-64 overflow-hidden rounded-full ring-2 ring-gold-500/30 transition-all hover:ring-gold-500/50 bg-gradient-to-b from-white/5 to-white/10 p-4">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-black/20">
              <img
                src="/team/Trusted Partners/Muneer Ahmed.jpg"
                alt="Engr. Muneer Ahmed"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
          <h3 className="font-display text-lg text-white">Engr. Muneer Ahmed</h3>
          <p className="text-sm text-steel-grey-light">Trusted Partner</p>
        </Card>
      </div>

      {/* Leadership Philosophy Section */}
      <SectionHeading
        className="mt-24 mb-12"
        eyebrow="Leadership Philosophy"
        title="Guided by Principles, Driven by Purpose"
      />

      <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-8 lg:p-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-white">Trust</h3>
            <p className="mt-3 text-steel-grey-light leading-relaxed">
              We build every relationship on a foundation of honesty, transparency, and accountability.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-white">Engineering Excellence</h3>
            <p className="mt-3 text-steel-grey-light leading-relaxed">
              Our designs and fabrication adhere to the highest engineering standards and safety protocols.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-white">Innovation</h3>
            <p className="mt-3 text-steel-grey-light leading-relaxed">
              We continuously explore new technologies and methods to improve mobility solutions.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-white">Quality & Safety</h3>
            <p className="mt-3 text-steel-grey-light leading-relaxed">
              Every vehicle we build undergoes rigorous inspection and testing for performance and safety.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-white">Long-Term Development</h3>
            <p className="mt-3 text-steel-grey-light leading-relaxed">
              We invest in sustainable growth, skilled development, and community impact for lasting value.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-white">Purpose</h3>
            <p className="mt-3 text-steel-grey-light leading-relaxed">
              We are committed to 40% of annual net profit supporting Dar Ul Amal's humanitarian work.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <SectionHeading
        className="mt-24 mb-12 text-center"
        eyebrow="Let's Work Together"
        title="Start a Conversation"
        align="center"
      />

      <div className="flex flex-col items-center justify-center gap-4">
        <p className="max-w-xl text-center text-lg text-steel-grey-light">
          Ready to discuss your vehicle engineering or mobility solution needs? Our leadership team is
          ready to help.
        </p>
        <Button href="/contact" variant="premium" size="lg">
          Request A Consultation
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2 h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Button>
      </div>
    </Section>
  );
}
