import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { COMPANY } from "@/lib/constants";

/**
 * Google Map. Uses the free `google.com/maps?output=embed` iframe, which
 * needs no API key — appropriate here since this project has no Google
 * Maps API key. Centered on "Sadiqabad, Punjab, Pakistan" (the only
 * confirmed location detail) rather than a precise office pin, since no
 * street address has ever been supplied anywhere in this project — a
 * generic city-level map is honest; a fabricated precise pin location
 * would not be.
 */
export default function LocationMap() {
  const query = encodeURIComponent(
    `${COMPANY.location.city}, ${COMPANY.location.province}, ${COMPANY.location.country}`
  );
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <div className="relative aspect-video w-full">
        <iframe
          src={embedSrc}
          title={`Map showing ${COMPANY.location.city}, ${COMPANY.location.province}`}
          className="absolute inset-0 h-full w-full grayscale-[0.3] contrast-125"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="glass flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-steel-grey-light">
          <MapPin size={16} className="text-gold-500" aria-hidden="true" />
          {COMPANY.location.city}, {COMPANY.location.province}, {COMPANY.location.country}
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-gold-500 hover:text-gold-300"
          >
            <Navigation size={13} aria-hidden="true" />
            Get Directions
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-gold-500 hover:text-gold-300"
          >
            <ExternalLink size={13} aria-hidden="true" />
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
