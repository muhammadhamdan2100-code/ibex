import { ShieldQuestion } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import { QUALITY_STANDARDS } from "@/lib/data/quality-standards";

export const metadata = buildMetadata({
  title: "Quality Standards",
  path: "/quality",
  description:
    "Quality assurance and the industry standards relevant to vehicle manufacturing — IBEX Vehicle Restoration (Private) Limited.",
});

/**
 * Quality page. Deliberately, repeatedly explicit that the standards
 * described here are general industry reference information — not a
 * claim that IBEX holds or complies with any of them. That status is
 * undisclosed pending the official company document; several of these
 * standards concern life-safety equipment (ambulance/medical vehicle
 * standards, vehicle safety regulations), so getting this distinction
 * wrong would be a real-world harm risk, not just an inaccuracy.
 */
export default function QualityPage() {
  return (
    <>
      <Section tone="green">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Quality Standards" }]} className="mb-10" />
        <SectionHeading
          eyebrow="Company — Quality"
          title="Quality Standards"
          description="An overview of the quality and safety standards relevant to vehicle manufacturing, for reference. IBEX Vehicle Restoration's specific certification and compliance status against each is not claimed here — that detail is undisclosed pending the official company document, and will be published once confirmed, not before."
        />
      </Section>

      <Section tone="black">
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-gold-500/30 bg-gold-500/5 p-5">
          <ShieldQuestion size={22} className="mt-0.5 shrink-0 text-gold-500" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-steel-grey-light">
            The cards below describe what each standard covers in general — publicly documented,
            verifiable reference information. They are not a certification claim for IBEX Vehicle
            Restoration specifically.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {QUALITY_STANDARDS.map((std) => (
            <Card key={std.code} className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-gold-500">{std.code}</span>
              <h3 className="font-display text-lg text-white">{std.name}</h3>
              <p className="text-sm leading-relaxed text-steel-grey-light">{std.description}</p>
              {std.status && (
                <span className="mt-1 w-fit rounded-pill border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                  {std.status}
                </span>
              )}
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="graphite">
        <SectionHeading
          eyebrow="Process"
          title="Quality Assurance Process"
          description="IBEX Vehicle Restoration's own internal quality assurance process — inspection stages, road testing procedures, and sign-off criteria — will be documented here once confirmed from the official company document, rather than described generically in the meantime."
        />
      </Section>
    </>
  );
}
