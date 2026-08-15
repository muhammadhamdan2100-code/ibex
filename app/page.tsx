import Link from "next/link";
import { ArrowRight, Fuel } from "lucide-react";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import HomeCardGrid from "@/components/home/HomeCardGrid";
import PillLinkStrip from "@/components/home/PillLinkStrip";
import WorkflowStrip from "@/components/home/WorkflowStrip";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { DarUlAmalProjectCard } from "@/components/sections/DarUlAmalProjectCard";
import {
  HOME_WHAT_WE_DO, HOME_SOLUTIONS_HIGHLIGHTS, HOME_HEAVY_VEHICLES, HOME_SPECIAL_PURPOSE,
  ENGINEERING_WORKFLOW, QUALITY_PROCESS_STEPS,
} from "@/lib/data/home-sections";
import { QUALITY_STANDARDS } from "@/lib/data/quality-standards";
import { EXPORT_MARKETS, FUTURE_TECHNOLOGY } from "@/lib/data/global-vision";
import { PROJECT_CATEGORIES } from "@/lib/data/project-categories";
import { COMPANY } from "@/lib/constants";

/**
 * Homepage — full build per the Phase 2 (Home Page) brief. Every section
 * below reuses real data already established elsewhere in this project
 * (Solutions catalog, CSR facts, Quality standards, Global Vision) rather
 * than duplicating content, so nothing here can drift out of sync with
 * the dedicated pages it links to.
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 3. Company Introduction */}
      <Section tone="black">
        <SectionHeading
          eyebrow="About IBEX"
          title="Engineered For Purpose. Built For Trust."
          description={`${COMPANY.displayName} was established in 2023 in ${COMPANY.location.city}, ${COMPANY.location.province}, as a project of Dar Ul Amal Human Rights Organization Pakistan. IBEX focuses on vehicle restoration, vehicle manufacturing, special-purpose vehicles, custom engineering, emergency mobility, commercial vehicles, and modern mobility solutions.`}
        />
      </Section>

      {/* 4. What We Do */}
      <Section tone="graphite">
        <SectionHeading eyebrow="What We Do" title="Major Capabilities" className="mb-12" />
        <HomeCardGrid items={HOME_WHAT_WE_DO} />
      </Section>

      {/* 5. Solutions */}
      <Section tone="black">
        <SectionHeading
          eyebrow="Solutions"
          title="Engineered For Every Mission"
          className="mb-10"
        />
        <PillLinkStrip items={HOME_SOLUTIONS_HIGHLIGHTS} />
      </Section>

      {/* 6. Heavy Vehicle Capabilities */}
      <Section tone="graphite">
        <SectionHeading
          eyebrow="Heavy Vehicles"
          title="Heavy & Commercial Fleet Capability"
          className="mb-10"
        />
        <PillLinkStrip items={HOME_HEAVY_VEHICLES} />
      </Section>

      {/* 7. Engineering & Manufacturing Process */}
      <Section tone="black">
        <SectionHeading
          eyebrow="Process"
          title="Every Project, An Engineering Challenge"
          className="mb-10"
        />
        <WorkflowStrip steps={ENGINEERING_WORKFLOW} />
      </Section>

      {/* 8. Restoration */}
      <Section tone="graphite">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Restoration"
              title="From Restoration To Reinvention"
              description="IBEX restores existing, old, and accident-damaged vehicles — commercial vehicles, coaches, and special-purpose vehicles — with modernization of engine systems, electrical systems, interior, body, and vehicle functionality where supported."
            />
            <Button href="/custom-engineering" variant="premium" className="mt-6">
              Explore Restoration
              <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
            </Button>
          </div>
          <PlaceholderMedia iconName="hammer" label="Vehicle Restoration" className="aspect-[4/3]" />
        </div>
      </Section>

      {/* 9. Special-Purpose Vehicles */}
      <Section tone="black">
        <SectionHeading eyebrow="Special-Purpose Vehicles" title="Built For Specific Missions" className="mb-12" />
        <HomeCardGrid items={HOME_SPECIAL_PURPOSE} />
      </Section>

      {/* 10. Quality & Safety */}
      <Section tone="graphite">
        <SectionHeading
          eyebrow="Quality & Safety"
          title="Engineered With Discipline"
          description="Every vehicle passes through an eight-stage inspection process. Standards relevant to vehicle manufacturing are shown below for reference — ISO 9001 and ISO 14001 applications are in progress, not yet certified."
          className="mb-10"
        />
        <WorkflowStrip steps={QUALITY_PROCESS_STEPS} />
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
        <Button href="/quality" variant="outline" className="mt-8">
          View Quality Standards
        </Button>
      </Section>

      {/* 11. CSR / Dar Ul Amal */}
      <Section tone="green">
        <SectionHeading
          eyebrow="CSR"
          title="A Commitment Beyond Vehicles"
          description={`${COMPANY.displayName} is an integrated project of Dar Ul Amal Human Rights Organization Pakistan. 40% of annual net profit is dedicated to welfare, humanitarian service, and sustainable development projects — including mobile clinics, disaster response, rescue vehicles, technical training, employment opportunities, and green technology research.`}
          className="mb-12"
        />
        
        {/* Dar Ul Amal Project Card */}
        <div className="flex justify-center">
          <DarUlAmalProjectCard />
        </div>

        <div className="mt-12 text-center">
          <Button href="/csr" variant="premium">
            Explore Our CSR
            <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
          </Button>
        </div>
      </Section>

      {/* 12. R&D / Future Mobility */}
      <Section tone="black">
        <SectionHeading
          eyebrow="Future"
          title="Engineering Tomorrow's Mobility"
          description="Lightweight vehicle structures, electric mobility, hybrid technology, smart vehicle systems, AI-based fleet management, renewable energy integration, and autonomous vehicle research — with a long-term vision toward the GCC, Central Asia, and Africa."
          className="mb-10"
        />
        <div className="mb-8 flex flex-wrap gap-3">
          {FUTURE_TECHNOLOGY.map((t) => (
            <span key={t.slug} className="rounded-pill border border-white/10 bg-white/5 px-4 py-2 text-sm text-steel-grey-light">
              {t.title}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {EXPORT_MARKETS.slice(0, 3).map((m) => (
            <span key={m.slug} className="rounded-pill border border-gold-500/30 bg-gold-500/5 px-4 py-2 text-sm text-gold-500">
              {m.title}
            </span>
          ))}
        </div>
        <Button href="/global-vision" variant="outline" className="mt-8">
          Explore Global Vision
        </Button>
      </Section>

      {/* 13. Projects / Gallery Preview */}
      <Section tone="graphite">
        <SectionHeading eyebrow="Showcase" title="Projects & Gallery" className="mb-12" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECT_CATEGORIES.slice(0, 4).map(({ slug, title, icon }) => (
            <Link key={slug} href={`/projects/${slug}`}>
              <Card interactive className="flex h-full flex-col gap-4">
                <PlaceholderMedia iconName={icon} label={title} className="aspect-video" />
                <h3 className="font-display text-base text-white">{title}</h3>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/projects" variant="outline">View All Projects</Button>
          <Button href="/gallery" variant="outline">View Gallery</Button>
        </div>
      </Section>

      {/* 14. Fuel Calculator Preview */}
      <Section tone="black">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Tools"
              title="Estimate Your Fuel Cost"
              description="Fuel type, distance, and fuel average — get an estimated trip cost in seconds. The full calculator, with live pricing and detailed breakdowns, lives on its own page."
            />
            <Button href="/fuel-calculator" variant="premium" className="mt-6">
              <Fuel size={16} aria-hidden="true" />
              Open Fuel Calculator
            </Button>
          </div>
          <Card className="flex flex-col gap-4">
            {["Fuel Type", "Distance", "Fuel Average", "Estimated Fuel Cost"].map((label) => (
              <div key={label} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-steel-grey-light">{label}</span>
                <span className="font-mono text-sm text-white/40">—</span>
              </div>
            ))}
          </Card>
        </div>
      </Section>

      {/* 15. Final Consultation CTA */}
      <EnterpriseCta
        title="Have A Vehicle Challenge? Let's Engineer The Solution."
        description="From restoration and coach building to special-purpose and custom-engineered vehicles, let's build the right solution for your mission."
      />
    </>
  );
}
