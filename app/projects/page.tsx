import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { PROJECT_CATEGORIES } from "@/lib/data/project-categories";

export const metadata = buildMetadata({
  title: "Projects",
  path: "/projects",
  description: "Completed and in-progress project categories — IBEX Vehicle Restoration (Private) Limited.",
});

export default function ProjectsPage() {
  return (
    <>
      <Section tone="black">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projects" }]} className="mb-10" />
        <SectionHeading
          eyebrow="Projects"
          title="Project Showcase"
          description="Eleven project categories, ready to receive real case studies as they're documented. No individual project is described here yet — publishing invented client names or delivery details would misrepresent real work, so each category page stays honestly structural until case studies exist."
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_CATEGORIES.map(({ slug, title, icon }) => (
            <Link key={slug} href={`/projects/${slug}`}>
              <Card interactive className="flex h-full flex-col gap-4">
                <PlaceholderMedia iconName={icon} label={title} className="aspect-video" />
                <h3 className="font-display text-lg text-white">{title}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <EnterpriseCta title="Have a project in mind?" />
    </>
  );
}
