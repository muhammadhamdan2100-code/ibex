import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import GalleryExplorer from "@/components/sections/GalleryExplorer";

export const metadata = buildMetadata({
  title: "Gallery",
  path: "/gallery",
  description: "Photo, video, and factory gallery — IBEX Vehicle Restoration (Private) Limited.",
});

export default function GalleryPage() {
  return (
    <Section tone="graphite">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Gallery" }]} className="mb-10" />
      <SectionHeading
        eyebrow="Visual Archive"
        title="Gallery"
        description="Filterable photo, video, factory, before-and-after, and project imagery. Tiles are structural placeholders until real photography/video is supplied — the filtering, masonry layout, and lightbox are fully functional."
      />
      <div className="mt-12">
        <GalleryExplorer />
      </div>
    </Section>
  );
}
