import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import LogoMarquee from "@/components/sections/LogoMarquee";
import { COLLABORATION_CATEGORIES } from "@/lib/data/collaborations";

export const metadata = buildMetadata({
  title: "Collaborations",
  path: "/collaborations",
  description: "Government, private sector, NGO, and institutional collaborations — IBEX Vehicle Restoration (Private) Limited.",
});

export default function CollaborationsPage() {
  return (
    <>
      <Section tone="black">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Collaborations" }]} className="mb-10" />
        <SectionHeading
          eyebrow="Network"
          title="Collaborations"
          description="Real partner names and logos will replace these placeholder tiles once supplied by the client — the animated strips and category structure are fully functional."
        />
        <div className="mt-12 flex flex-col gap-10">
          {COLLABORATION_CATEGORIES.map((category, index) => (
            <div key={category.slug}>
              <h3 className="eyebrow mb-4">{category.title}</h3>
              <LogoMarquee count={category.placeholderCount} reverse={index % 2 === 1} label={category.title} />
            </div>
          ))}
        </div>
      </Section>

      <Section tone="green">
        <div className="flex flex-col items-start gap-4">
          <h2 className="font-display text-2xl text-white sm:text-3xl">Propose a collaboration</h2>
          <p className="max-w-md text-sm text-steel-grey-light">
            Government departments, private organizations, NGOs, and institutions — reach out to
            discuss a collaboration with {`IBEX Vehicle Restoration`}.
          </p>
          <Button href="/contact" variant="premium">
            Request Collaboration
            <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
          </Button>
        </div>
      </Section>
    </>
  );
}
