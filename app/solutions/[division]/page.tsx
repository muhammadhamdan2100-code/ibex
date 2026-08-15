import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { CATALOG_DIVISIONS, getDivision, getItemsByDivision } from "@/lib/data/catalog";
import { COMPANY } from "@/lib/constants";

export function generateStaticParams() {
  return CATALOG_DIVISIONS.map((d) => ({ division: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ division: string }>;
}) {
  const { division: divisionSlug } = await params;
  const division = getDivision(divisionSlug);
  if (!division) return buildMetadata({ title: "Solutions", path: "/solutions" });

  return buildMetadata({
    title: division.title,
    path: `/solutions/${division.slug}`,
    description: `${division.title} by ${COMPANY.displayName} — ${division.summary}`,
  });
}

export default async function DivisionHubPage({
  params,
}: {
  params: Promise<{ division: string }>;
}) {
  const { division: divisionSlug } = await params;
  const division = getDivision(divisionSlug);
  if (!division) notFound();

  const items = getItemsByDivision(division.slug);

  return (
    <>
    <Section tone="graphite">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: division.title },
        ]}
        className="mb-10"
      />
      <SectionHeading
        eyebrow="Solutions Division"
        title={division.title}
        description={division.summary}
        className="mb-6"
      />
      <div className="mb-12 flex flex-wrap gap-2">
        {division.typicalApplications.map((app) => (
          <span
            key={app}
            className="rounded-pill border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-wide text-steel-grey-light"
          >
            {app}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.slug} href={`/solutions/${division.slug}/${item.slug}`}>
            <Card interactive className="flex h-full flex-col gap-4">
              <PlaceholderMedia iconName={division.icon} label={item.title} className="aspect-video" />
              <h3 className="font-display text-lg text-white">{item.title}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
    <EnterpriseCta title={`Discuss a ${division.title} project`} />
    </>
  );
}
