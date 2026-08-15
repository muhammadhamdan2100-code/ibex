import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { COMPANY } from "@/lib/constants";
import { NAV_MENU, SECONDARY_LINKS } from "@/lib/data/nav-menu";

/**
 * Enterprise footer. Uses LOGO 2 (Corporate Badge) only, per brand-hierarchy
 * rule. Registration numbers, CEO, and contact details are the real
 * values provided directly in the Phase 7 brief.
 *
 * Structure deliberately mirrors the slimmed-down top nav: since Company
 * and Solutions now live behind mega menus rather than as flat top-level
 * links, the footer surfaces their sub-items directly (so every page is
 * still one click away from anywhere), plus an "Explore" column for the
 * pages that aren't in the top nav or either mega menu at all.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const company = NAV_MENU.find((item) => item.label === "Company");
  const solutions = NAV_MENU.find((item) => item.label === "Solutions");

  return (
    <footer className="border-t border-white/10 bg-graphite">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 lg:grid-cols-5">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <div className="relative h-20 w-20">
            <Logo variant="corporateBadge" width={80} height={80} />
          </div>
          <p className="text-sm text-steel-grey-light leading-relaxed">
            {COMPANY.legalName}
            <br />
            {COMPANY.location.city}, District {COMPANY.location.district}
            <br />
            {COMPANY.location.province}, {COMPANY.location.country}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-gold-500">
            {COMPANY.tagline}
          </p>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-sm text-steel-grey-light">
            {company?.megaMenu?.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-500 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Solutions</h3>
          <ul className="flex flex-col gap-2 text-sm text-steel-grey-light">
            {solutions?.megaMenu?.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-500 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm text-steel-grey-light">
            {[
              { label: "Projects", href: "/projects" },
              { label: "Gallery", href: "/gallery" },
              ...SECONDARY_LINKS,
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-500 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Contact</h3>
          <ul className="flex flex-col gap-3 text-sm text-steel-grey-light">
            <li>
              <Link href="/contact" className="hover:text-gold-500 transition-colors">
                Request Consultation
              </Link>
            </li>
            <li>
              <a href={`tel:${COMPANY.contact.mobile.replace(/\s/g, "")}`} className="hover:text-gold-500 transition-colors">
                {COMPANY.contact.mobile} (CEO)
              </a>
            </li>
            <li>
              <a href={`tel:${COMPANY.contact.additionalPhone1.replace(/\s/g, "")}`} className="hover:text-gold-500 transition-colors">
                {COMPANY.contact.additionalPhone1}
              </a>
            </li>
            <li>
              <a href={`tel:${COMPANY.contact.additionalPhone2.replace(/\s/g, "")}`} className="hover:text-gold-500 transition-colors">
                {COMPANY.contact.additionalPhone2}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.contact.primaryEmail}`} className="hover:text-gold-500 transition-colors">
                {COMPANY.contact.primaryEmail}
              </a>
            </li>
            <li>
              <a href={COMPANY.social.tikTok.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold-500 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.33-1.68 1.41-3.78 1.95-5.82 1.52-2.01-.43-3.84-1.63-5.04-3.3-1.4-1.89-1.43-4.3-.12-6.27 1.3-1.98 3.77-2.6 5.71-1.66.28.12.58.22.88.3v-5.3c0-.53-.04-1.06-.05-1.59 1.63-.12 3.25-.18 4.87-.07.06 1.64-.01 3.28.02 4.92z" />
                </svg>
                {COMPANY.social.tikTok.handle}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center gap-4 text-xs text-steel-grey-light sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center sm:flex-row sm:gap-4">
            <span>
              &copy; {year} {COMPANY.legalName}. All rights reserved.
            </span>
            <span className="hidden sm:inline text-gold-500/60">|</span>
            <span className="font-medium text-steel-grey-light/80">
              Developed by Muhammad Hamdan
            </span>
          </div>
          <span className="font-mono tracking-widest uppercase">{COMPANY.tagline}</span>
        </Container>
      </div>
    </footer>
  );
}
