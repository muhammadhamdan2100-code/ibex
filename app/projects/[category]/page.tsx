import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { PROJECT_CATEGORIES, getProjectCategory } from "@/lib/data/project-categories";

export function generateStaticParams() {
  return PROJECT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getProjectCategory(slug);
  if (!category) return buildMetadata({ title: "Projects", path: "/projects" });
  return buildMetadata({
    title: category.title,
    path: `/projects/${category.slug}`,
    description: `${category.title} by IBEX Vehicle Restoration (Private) Limited.`,
  });
}

/**
 * Project category page. No individual case studies are listed —
 * publishing a fabricated project (a fake client name, delivery date, or
 * before/after photo) would misrepresent real completed work, which this
 * project has consistently avoided doing for any category of content.
 * The page is built to receive real case studies (each would slot in as
 * a card in the grid below) the moment they're documented.
 */
export default async function ProjectCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getProjectCategory(slug);
  if (!category) notFound();

  const related = PROJECT_CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 3);

  return (
    <>
      <Section tone="black">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: category.title },
          ]}
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Projects</span>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
              {category.title}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-steel-grey-light">
              Case studies for this category will be published here once completed projects are
              documented — customer requirements, engineering process, before/after comparison,
              specifications, and timeline, per project, not invented in the meantime.
            </p>
          </div>
          <PlaceholderMedia iconName={category.icon} label={category.title} className="aspect-[4/3]" />
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="graphite">
          <SectionHeading eyebrow="Explore" title="Other Project Categories" className="mb-10" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/projects/${r.slug}`}>
                <Card interactive className="flex h-full flex-col gap-4">
                  <PlaceholderMedia iconName={r.icon} label={r.title} className="aspect-video" />
                  <h3 className="font-display text-base text-white">{r.title}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <EnterpriseCta title={`Start a ${category.title.toLowerCase()} conversation`} />
    </>
  );
}
