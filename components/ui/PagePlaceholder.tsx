import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb, { type BreadcrumbItem } from "@/components/ui/Breadcrumb";

interface PagePlaceholderProps {
  title: string;
  description: string;
  breadcrumb: BreadcrumbItem[];
  tone?: "black" | "graphite" | "green";
}

/**
 * Shared shell for any route whose real content depends on material the
 * client hasn't supplied yet (company document text, imagery, registration
 * numbers). Keeps every "content pending" route visually consistent and
 * avoids copy-pasting the same Section/SectionHeading/Breadcrumb block
 * into each page.tsx.
 */
export default function PagePlaceholder({
  title,
  description,
  breadcrumb,
  tone = "black",
}: PagePlaceholderProps) {
  return (
    <Section tone={tone}>
      <Breadcrumb items={breadcrumb} className="mb-10" />
      <SectionHeading eyebrow="Phase 1.1 — Foundation" title={title} description={description} />
    </Section>
  );
}
