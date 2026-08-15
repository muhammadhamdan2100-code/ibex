"use client";

import { cn } from "@/lib/utils";
import { LEADERSHIP } from "@/lib/constants";
import Image from "next/image";

interface LeadershipCardProps {
  name: string;
  title: string;
  imageUrl?: string;
  className?: string;
}

function LeadershipCard({ name, title, imageUrl, className }: LeadershipCardProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-white/10 p-6 text-center transition-all hover:shadow-xl hover:shadow-gold-500/5", className)}>
      <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-white/5 ring-2 ring-white/10 transition-all hover:ring-gold-500/30 md:h-40 md:w-40">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={160}
            height={160}
            className="h-full w-full object-cover object-center"
            onError={(e) => {
              // Fallback to initials if image fails
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        ) : null}
        {!imageUrl && (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold-500/20 to-gold-500/10">
            <span className="font-display text-4xl text-gold-500">{initials}</span>
          </div>
        )}
      </div>
      <h3 className="font-display text-xl text-white">{name}</h3>
      <p className="mt-2 text-sm font-medium text-gold-500">{title}</p>
    </div>
  );
}

export function Leadership() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-white">Meet Our Leadership</h2>
          <p className="mt-4 text-lg text-steel-grey-light max-w-2xl mx-auto">
            Guided by industry experts and automotive engineering professionals
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <LeadershipCard
            name={LEADERSHIP.ceo.name}
            title={LEADERSHIP.ceo.title}
            imageUrl="/team/ceo/ceo.jpg"
          />
          <LeadershipCard
            name={LEADERSHIP.director.name}
            title={LEADERSHIP.director.title}
            imageUrl="/team/director/director.jpg"
          />
          <LeadershipCard
            name={LEADERSHIP.businessDevelopmentManager.name}
            title={LEADERSHIP.businessDevelopmentManager.title}
            imageUrl="/team/business-development-manager/business%20development%20manager.jpg"
          />
        </div>
      </div>
    </section>
  );
}
