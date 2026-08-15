import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import KfueitGallery from "@/components/sections/KfueitGallery";
import KfueitVideoSection from "@/components/sections/KfueitVideoSection";
import Card from "@/components/ui/Card";
import EnterpriseCta from "@/components/sections/EnterpriseCta";

export const metadata = buildMetadata({
  title: "KFUEIT Projects",
  path: "/projects/kfueit",
  description: "Khawaja Fareed University of Engineering and Information Technology (KFUEIT) bus projects by IBEX Vehicle Restoration (Private) Limited.",
});

/**
 * KFUEIT Project Detail Page
 * 
 * This page showcases the KFUEIT bus project - a collaboration with
 * Khawaja Fareed University of Engineering and Information Technology,
 * Rahim Yar Khan.
 * 
 * Gallery and video assets will be added here once provided.
 * The structure is ready to receive:
 * - KFUEIT project images (folder: public/gallery/kfueit/)
 * - KFUEIT project videos (folder: public/videos/kfueit/)
 */

export default function KfueitProjectPage() {
  return (
    <>
      <Section tone="black">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: "KFUEIT Projects" },
          ]}
          className="mb-10"
        />
        
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Government Projects</span>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
              Khawaja Fareed University of Engineering and Information Technology
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-steel-grey-light">
              IBEX Vehicle Restoration delivered a fleet of AC Luxury Coaches for KFUEIT, 
              Rahim Yar Khan. These buses provide comfortable, reliable transportation for 
              students, faculty, and staff across campus and surrounding areas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-pill border border-gold-500/30 bg-gold-500/5 px-4 py-2 text-sm text-gold-500">
                KFUEIT, Rahim Yar Khan
              </span>
              <span className="rounded-pill border border-gold-500/30 bg-gold-500/5 px-4 py-2 text-sm text-gold-500">
                AC Luxury Coaches
              </span>
            </div>
          </div>
          
          <Card className="flex flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="relative h-48 w-48">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-500/20 to-teal-500/20" />
              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-b from-white/5 to-white/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16 text-gold-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="mt-2 font-display text-2xl text-white">KFUEIT</span>
                <span className="text-sm text-steel-grey-light">Bus Fleet</span>
              </div>
            </div>
            <p className="text-steel-grey-light">
              Professional AC Luxury Coaches for university transportation
            </p>
          </Card>
        </div>
      </Section>

      {/* Project Gallery */}
      <Section tone="graphite">
        <SectionHeading
          eyebrow="Project Showcase"
          title="KFUEIT Bus Gallery"
          description="Preview of the AC Luxury Coaches delivered for KFUEIT campus transportation."
          className="mb-12"
        />
        <KfueitGallery />
      </Section>

      {/* Project Video Section */}
      <Section tone="black">
        <SectionHeading
          eyebrow="Project Showcase"
          title="Project Video"
          description="See the KFUEIT buses in action and learn about the engineering process."
          className="mb-10"
        />
        <KfueitVideoSection
          title="KFUEIT Project Video"
          videoFiles={["video-01.mp4", "video-02.mp4"]}
        />
      </Section>

      <EnterpriseCta title="Start a KFUEIT-like project conversation" />
    </>
  );
}
