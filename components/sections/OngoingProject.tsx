import Card from "@/components/ui/Card";
import { MapPin, Building2, Clock } from "lucide-react";

export function OngoingProject() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-graphite via-[#0F1114] to-graphite">
      {/* Subtle background glow - very restrained teal/green atmospheric tint */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/5 to-green-950/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-white">Ongoing Project</h2>
          <p className="mt-4 text-lg text-steel-grey-light max-w-2xl mx-auto">
            Building the future of engineering education and infrastructure
          </p>
        </div>

        <Card className="max-w-5xl mx-auto bg-gradient-to-br from-[#1A1C20]/80 to-[#14161A]/80 border border-teal-500/20 p-8 md:p-12 hover:border-teal-500/40 transition-all duration-500">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
              <Building2 size={32} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4">
                Khawaja Freed University of Engineering and Information Technology
              </h3>
              <p className="text-lg text-steel-grey-light">
                IBEX Vehicle Restoration is proud to be involved in the construction and development of this premier educational institution in Rahim Yar Khan.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-teal-400" />
              <span className="text-sm text-steel-grey-light">Rahim Yar Khan, Punjab, Pakistan</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-teal-400" />
              <span className="text-sm text-steel-grey-light">Ongoing Development</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 size={20} className="text-teal-400" />
              <span className="text-sm text-steel-grey-light">Engineering & Construction</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
