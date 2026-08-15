import { Download } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import EnterpriseCta from "@/components/sections/EnterpriseCta";
import { DOWNLOAD_DOCUMENTS } from "@/lib/data/downloads";

export const metadata = buildMetadata({
  title: "Download Center",
  path: "/downloads",
  description: "Company documents and catalogues — IBEX Vehicle Restoration (Private) Limited.",
});

/**
 * Download Center. Every link is real and downloads an actual PDF — each
 * one a clearly-labeled placeholder document (see
 * public/documents/*.pdf and the generation script), not a broken link
 * or an invented filename. Swap the file at each path once the real
 * document exists; the download URL itself doesn't need to change.
 */
export default function DownloadsPage() {
  return (
    <>
      <Section tone="graphite">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Download Center" }]} className="mb-10" />
        <SectionHeading
          eyebrow="Resources"
          title="Download Center"
          description="Every document below downloads a real PDF, clearly labeled as a placeholder pending the final version — nothing here is a broken or fake link."
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOWNLOAD_DOCUMENTS.map(({ slug, title, href }) => (
            <Card key={slug} className="flex items-center justify-between gap-4">
              <span className="font-display text-base text-white">{title}</span>
              <a
                href={href}
                download
                className="flex shrink-0 items-center gap-2 rounded-md border border-gold-500/40 px-3 py-2 text-xs text-gold-500 transition-colors duration-fast hover:border-gold-500 hover:bg-gold-500/10"
              >
                <Download size={14} aria-hidden="true" />
                Download
              </a>
            </Card>
          ))}
        </div>
      </Section>
      <EnterpriseCta title="Need a document sooner?" description="Request it directly and we'll follow up." />
    </>
  );
}
