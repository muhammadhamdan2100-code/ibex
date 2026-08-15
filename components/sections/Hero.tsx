import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { COMPANY } from "@/lib/constants";

/**
 * Premium Static Hero — replaces the 3D/animation-heavy hero.
 * Clean, fast, and professional IBEX automotive engineering aesthetic.
 */
export default function Hero() {
  return (
    <Section tone="hero" useContainer={false} className="bg-blueprint-grid overflow-hidden pt-20">
      <div className="relative flex min-h-screen w-full items-center">
        <Container className="relative z-content grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* LEFT — copy */}
          <div className="flex flex-col gap-8">
            <div className="max-w-xl">
              <span className="eyebrow">{COMPANY.tagline}</span>
              <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Engineering The Future
                <br />
                Of Mobility
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-steel-grey-light lg:text-lg">
                IBEX Vehicle Restoration delivers engineered vehicle solutions, from complete
                restoration and coach building to special-purpose vehicles, emergency mobility and
                custom engineering.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact" variant="premium">
                  Request Consultation
                </Button>
                <Button href="/solutions" variant="outline">
                  Explore Our Solutions
                </Button>
              </div>
            </div>

            {/* Premium tagline reveal */}
            <div className="flex items-center gap-4 border-l-2 border-gold-500/40 pl-5">
              <div className="relative h-10 w-10">
                <Logo variant="primary" width={40} height={40} />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-gold-500">
                  IBEX Vehicle Restoration
                </span>
                <p className="text-sm text-steel-grey-light">
                  Engineering Mobility. Rebuilding With Trust.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — premium automotive image/placeholder */}
          <div className="relative flex items-center justify-center">
            <div className="aspect-video w-full max-w-xl overflow-hidden rounded-xl bg-gradient-to-b from-[#1A1C20]/80 to-[#14161A]/80 ring-1 ring-white/10 shadow-2xl shadow-gold-500/10">
              {/* Premium placeholder for vehicle image - will be replaced with real hero image */}
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/20 to-gold-500/5 ring-1 ring-gold-500/30">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 text-gold-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-2xl text-white">Premium Vehicle Engineering</h3>
                  <p className="mt-2 text-steel-grey-light">Precision. Quality. Trust.</p>
                </div>
              </div>
            </div>
            
            {/* Subtle decorative element */}
            <div className="absolute -left-8 top-1/4 hidden h-32 w-32 rounded-full bg-gold-500/5 blur-3xl lg:block" />
            <div className="absolute -right-8 bottom-1/4 hidden h-40 w-40 rounded-full bg-teal-500/5 blur-3xl lg:block" />
          </div>
        </Container>
      </div>
    </Section>
  );
}
