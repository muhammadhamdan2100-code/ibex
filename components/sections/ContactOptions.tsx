import Link from "next/link";
import Card from "@/components/ui/Card";
import { ICON_MAP, type IconName } from "@/lib/icons";
import { COMPANY } from "@/lib/constants";

interface ContactOption {
  label: string;
  icon: IconName;
  href: string;
  /** true for real external protocol links (tel:/mailto:/wa.me) — rendered as a plain <a>, not next/link, since there's no internal route to prefetch. */
  external?: boolean;
  note?: string;
}

function buildOptions(): ContactOption[] {
  const phoneDigits = COMPANY.contact.mobile.replace(/[^\d]/g, ""); // wa.me needs digits only, no "+" or spaces
  return [
    { label: "Call CEO", icon: "phone", href: `tel:${COMPANY.contact.mobile.replace(/\s/g, "")}`, external: true, note: COMPANY.contact.mobile },
    { label: "Call Additional 1", icon: "phone", href: `tel:${COMPANY.contact.additionalPhone1.replace(/\s/g, "")}`, external: true, note: COMPANY.contact.additionalPhone1 },
    { label: "Call Additional 2", icon: "phone", href: `tel:${COMPANY.contact.additionalPhone2.replace(/\s/g, "")}`, external: true, note: COMPANY.contact.additionalPhone2 },
    { label: "WhatsApp", icon: "message-circle", href: `https://wa.me/${phoneDigits}`, external: true, note: COMPANY.contact.mobile },
    { label: "Primary Email", icon: "mail", href: `mailto:${COMPANY.contact.primaryEmail}`, external: true, note: COMPANY.contact.primaryEmail },
    { label: "Secondary Email", icon: "mail", href: `mailto:${COMPANY.contact.alternativeEmail}`, external: true, note: COMPANY.contact.alternativeEmail },
    { label: "TikTok", icon: "globe-2", href: COMPANY.social.tikTok.url, external: true, note: COMPANY.social.tikTok.handle },
    { label: "Request Quotation", icon: "file-text", href: "/quotation" },
    { label: "Book Consultation", icon: "calendar-check", href: "/contact" },
  ];
}

/**
 * Contact options including CEO, additional phones, WhatsApp, emails, TikTok,
 * and action buttons. All phone numbers use real `tel:` links.
 */
export default function ContactOptions() {
  const options = buildOptions();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {options.map(({ label, icon, href, external, note }) => {
        const Icon = ICON_MAP[icon] ?? ICON_MAP.default;
        const content = (
          <Card interactive className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gradient-gold text-matte-black">
              <Icon size={18} aria-hidden="true" />
            </span>
            <div>
              <span className="font-display text-sm text-white">{label}</span>
              {note && <p className="mt-0.5 text-xs text-steel-grey-light">{note}</p>}
            </div>
          </Card>
        );
        return external ? (
          <a key={label} href={href} target={href.startsWith("https://wa.me") || href.includes("tiktok.com") ? "_blank" : undefined} rel={href.startsWith("https://wa.me") || href.includes("tiktok.com") ? "noopener noreferrer" : undefined}>
            {content}
          </a>
        ) : (
          <Link key={label} href={href}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
