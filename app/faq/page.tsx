import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqList from "@/components/sections/FaqList";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { FAQ_CATEGORIES } from "@/lib/data/faq";

export const metadata = buildMetadata({
  title: "FAQ",
  path: "/faq",
  description: "Frequently asked questions — IBEX Vehicle Restoration (Private) Limited.",
});

export default function FaqPage() {
  return (
    <>
      <Section tone="black">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} className="mb-10" />
        <SectionHeading eyebrow="Support" title="Frequently Asked Questions" className="mb-12" />
        <div className="flex flex-col gap-12">
          {FAQ_CATEGORIES.map((category) => (
            <div key={category.slug}>
              <h2 className="eyebrow mb-4">{category.title}</h2>
              <div className="max-w-2xl">
                <FaqList items={category.items} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <EnterpriseCta title="Still have a question?" />
    </>
  );
}
