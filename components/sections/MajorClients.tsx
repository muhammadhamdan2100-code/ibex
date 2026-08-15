"use client";

import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CLIENTS = [
  {
    name: "Domki Express",
  },
  {
    name: "Geo Al-Razzaq",
  },
  {
    name: "Pak Madina",
  },
  {
    name: "Manthar MG Group",
  },
  {
    name: "Sada Bahar",
  },
  {
    name: "Al-Fareed",
  },
  {
    name: "Geo Mehran",
  },
  {
    name: "Sindh Green",
  },
  {
    name: "Baloch Express",
  },
];

const ONGOING_PROJECT = {
  name: "Khawaja Freed University of Engineering and Information Technology",
  location: "Rahim Yar Khan, Punjab, Pakistan",
};

export function MajorClients() {
  const ref = useScrollReveal<HTMLDivElement>({ selector: "[data-reveal]" });

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-graphite via-[#0F1114] to-graphite">
      {/* Subtle background glow - very restrained teal/green atmospheric tint */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/5 to-green-950/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">Major Clients & Projects</h2>
          <p className="text-xl text-steel-grey-light max-w-3xl mx-auto">
            Trusted by leading organizations across Pakistan's transportation, logistics, and industrial sectors
          </p>
        </div>

        {/* Major Clients Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {CLIENTS.map((client, index) => (
            <Card
              key={client.name}
              data-reveal
              className={cn(
                "relative flex flex-col items-start gap-4 p-6 transition-all duration-500 ease-out hover:-translate-y-2",
                "bg-gradient-to-br from-[#1A1C20]/80 to-[#14161A]/80",
                "border border-white/5 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Client index/number */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <span className="text-xs uppercase tracking-widest text-steel-grey-light/60">Client</span>
              </div>

              {/* Client name */}
              <h3 className="font-display text-2xl text-white leading-tight">
                {client.name}
              </h3>

              {/* Subtle separator line with teal tone */}
              <div className="h-px flex-1 w-full bg-gradient-to-r from-transparent via-teal-500/10 to-transparent" />
            </Card>
          ))}
        </div>

        {/* Ongoing Project - Visually distinct but same design system */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
            <span className="text-sm font-mono uppercase tracking-widest text-teal-400/70">Ongoing Project</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
          </div>

          <Card className="relative overflow-hidden p-8 md:p-10 bg-gradient-to-br from-[#1A1C20]/80 to-[#14161A]/80 border border-teal-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-white mb-3">
                {ONGOING_PROJECT.name}
              </h3>
              <p className="text-lg text-steel-grey-light">
                {ONGOING_PROJECT.location}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
