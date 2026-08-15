import Link from "next/link";
import { ArrowRight, FileQuestion, ShieldCheck, Wrench } from "lucide-react";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { CATALOG_ITEMS, getDivision, getItem, getItemsByDivision } from "@/lib/data/catalog";
import { COMPANY } from "@/lib/constants";

export function generateStaticParams() {
  return CATALOG_ITEMS.map((item) => ({ division: item.division, item: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ division: string; item: string }>;
}) {
  const { division: divisionSlug, item: itemSlug } = await params;
  const division = getDivision(divisionSlug);
  const item = getItem(divisionSlug, itemSlug);
  if (!division || !item) return buildMetadata({ title: "Solutions", path: "/solutions" });

  return buildMetadata({
    title: item.title,
    path: `/solutions/${division.slug}/${item.slug}`,
    description: `${item.title} — ${division.title} by ${COMPANY.displayName}, engineering-led vehicle manufacturing and restoration in ${COMPANY.location.city}, ${COMPANY.location.province}.`,
  });
}

/**
 * Shared template for every vehicle-type page (102 of them, generated
 * from lib/data/catalog.ts via generateStaticParams — one file, not 102
 * hand-authored pages). Specification/capability content is deliberately
 * honest-pending rather than invented: this project has never received
 * the client's actual company document, and fabricating technical specs
 * or safety/quality certifications for real vehicle categories — several
 * of them life-safety equipment (ambulances, fire rescue, ICU vehicles)
 * — is a real-world harm risk, not just a content-quality shortcut. See
 * the Phase 4 report for the full reasoning.
 */
export default async function CatalogItemPage({
  params,
}: {
  params: Promise<{ division: string; item: string }>;
}) {
  const { division: divisionSlug, item: itemSlug } = await params;
  const division = getDivision(divisionSlug);
  const item = getItem(divisionSlug, itemSlug);
  if (!division || !item) notFound();

  const related = getItemsByDivision(division.slug)
    .filter((i) => i.slug !== item.slug)
    .slice(0, 3);

  return (
    <>
      <Section tone="black">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Solutions", href: "/solutions" },
            { label: division.title, href: `/solutions/${division.slug}` },
            { label: item.title },
          ]}
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">{division.title}</span>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
              {item.title}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-steel-grey-light">
              {item.title} engineering and manufacturing by {COMPANY.displayName}, based in{" "}
              {COMPANY.location.city}, {COMPANY.location.province}. Full specification detail is
              organized here as it's confirmed from the official company document.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="premium">
                Request Consultation
                <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
              </Button>
              <Button href="/fuel-calculator" variant="outline">
                Estimate Operating Cost
              </Button>
            </div>
          </div>
          <PlaceholderMedia iconName={division.icon} label={item.title} className="aspect-[4/3]" />
        </div>
      </Section>

      <Section tone="graphite">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <Card className="flex flex-col gap-3">
            <FileQuestion size={22} className="text-gold-500" aria-hidden="true" />
            <h2 className="font-display text-lg text-white">Technical Specifications</h2>
            <p className="text-sm leading-relaxed text-steel-grey-light">
              Dimensions, capacity, and configuration detail for {item.title} will be published
              here once confirmed from the official company document — not estimated or invented
              in the meantime.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <ShieldCheck size={22} className="text-gold-500" aria-hidden="true" />
            <h2 className="font-display text-lg text-white">Applications</h2>
            <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-steel-grey-light">
              {division.typicalApplications.map((app) => (
                <li key={app}>{app}</li>
              ))}
            </ul>
          </Card>
          <Card className="flex flex-col gap-3">
            <Wrench size={22} className="text-gold-500" aria-hidden="true" />
            <h2 className="font-display text-lg text-white">Approach</h2>
            <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-steel-grey-light">
              <li>Engineered to order, not off a fixed catalog spec</li>
              <li>Manufactured and restored in {COMPANY.location.city}, {COMPANY.location.province}</li>
              <li>Direct engineering consultation before commitment</li>
            </ul>
          </Card>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="black">
          <SectionHeading
            eyebrow={division.title}
            title="Related Solutions"
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/solutions/${division.slug}/${r.slug}`}>
                <Card interactive className="flex h-full flex-col gap-4">
                  <PlaceholderMedia iconName={division.icon} label={r.title} className="aspect-video" />
                  <h3 className="font-display text-base text-white">{r.title}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <EnterpriseCta
        title={`Discuss a ${item.title} project`}
        description={`Request a consultation to talk through requirements, timeline, and specification for your ${item.title.toLowerCase()} project.`}
      />
    </>
  );
}
