"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MegaMenu from "@/components/layout/MegaMenu";
import SearchModal from "@/components/layout/SearchModal";
import Logo from "@/components/ui/Logo";
import { COMPANY } from "@/lib/constants";
import { NAV_MENU } from "@/lib/data/nav-menu";
import { ICON_MAP } from "@/lib/icons";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

/**
 * Sticky glass navbar (Phase 2 Revision). Uses LOGO 1 (IBEX VR) only, per
 * brand-hierarchy rule — never the corporate badge.
 *
 * Behaviour:
 * - Transparent at the very top of the page, glass once scrolled.
 * - Auto-hides on scroll-down past a threshold, reappears on scroll-up.
 * - "Company" and "Solutions" open premium icon-card mega menus on
 *   hover/focus; every entry resolves to a real page or a real in-page
 *   anchor (see `lib/data/nav-menu.ts`).
 *
 * Breakpoint note: earlier revisions carried 12 flat nav items and had to
 * either hide the list until an ultra-wide `2xl` breakpoint or override
 * the shared Container's 1440px cap to fit them. This revision trims the
 * top-level list to 6 items (per the brief's explicit "don't put every
 * page in the navbar" instruction) precisely so that workaround is no
 * longer needed — the full row (logo + two-line name + 6 items + CTA)
 * comfortably fits the shared `Container` at the standard `lg` (1024px)
 * breakpoint, which is a meaningfully better experience on ordinary
 * laptop screens than gating the flat nav behind `2xl`.
 */
export default function Navbar() {
  const { scrolled, hidden } = useScrollDirection();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Only trigger menu close via requestAnimationFrame for smoother UX
  const closeRAF = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (closeRAF.current) cancelAnimationFrame(closeRAF.current);
    setActiveMenu(label);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  }

  function scheduleCloseRAF() {
    if (closeRAF.current) cancelAnimationFrame(closeRAF.current);
    closeRAF.current = requestAnimationFrame(() => {
      setActiveMenu(null);
    });
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-navbar w-full transition-transform duration-base ease-standard",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <nav
        className={cn(
          "border-b transition-colors duration-base ease-standard",
          scrolled ? "glass border-white/10 shadow-md" : "border-transparent bg-transparent"
        )}
        aria-label="Primary"
      >
        <Container className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${COMPANY.shortName} home`}
          >
            <div className="relative h-11 w-11 shrink-0 transition-transform duration-fast ease-standard group-hover:scale-105">
              <Logo variant="primary" className="w-full h-full" />
            </div>
            {/* Two-line company name — explicit requirement: no overlap, no
                compressing to fit one line. */}
            <span className="hidden flex-col font-display leading-[1.15] tracking-tight text-white sm:flex">
              <span className="text-sm lg:text-base">IBEX VEHICLE</span>
              <span className="text-sm lg:text-base">RESTORATION</span>
              <span className="text-xs lg:text-sm opacity-80">(Pvt.) Ltd.</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-6 font-body text-sm whitespace-nowrap">
            {NAV_MENU.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.megaMenu && openMenu(item.label)}
                onMouseLeave={() => item.megaMenu && scheduleClose()}
                onFocus={() => item.megaMenu && openMenu(item.label)}
                onBlur={() => item.megaMenu && scheduleClose()}
              >
                <Link
                  href={item.href}
                  className="group/link relative flex items-center gap-1 py-2 text-white/80 transition-colors hover:text-gold-500"
                  aria-haspopup={item.megaMenu ? "menu" : undefined}
                  aria-expanded={item.megaMenu ? activeMenu === item.label : undefined}
                >
                  {item.label}
                  {item.megaMenu && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-fast",
                        activeMenu === item.label && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-gold transition-transform duration-fast ease-standard group-hover/link:scale-x-100"
                    aria-hidden="true"
                  />
                </Link>

                {item.megaMenu && activeMenu === item.label && (
                  <MegaMenu items={item.megaMenu} onNavigate={() => setActiveMenu(null)} />
                )}
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search (Ctrl+K)"
              className="text-white/70 transition-colors hover:text-gold-500"
            >
              <Search size={18} />
            </button>
            <Button href="/contact" size="sm" variant="premium">
              Request Consultation
              <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="text-white lg:hidden"
          >
            <Search size={22} />
          </button>

          <button
            type="button"
            className="text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </Container>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden glass overflow-y-auto transition-[max-height] duration-fast ease-standard",
          open ? "max-h-[calc(100vh-5rem)]" : "max-h-0"
        )}
        style={{ backgroundColor: "var(--glass-navbar)" }}
      >
        <Container className="flex flex-col gap-1 py-8">
          <div className="flex min-w-0 items-center gap-3 pb-4">
            <div className="relative h-8 w-8 shrink-0">
              <Logo variant="primary" width={32} height={32} />
            </div>
            <span className="flex flex-col font-display text-sm leading-tight tracking-tight">
              <span>IBEX VEHICLE</span>
              <span>RESTORATION</span>
              <span className="text-xs opacity-80">(Pvt.) Ltd.</span>
            </span>
          </div>

          {NAV_MENU.map((item) => (
            <div key={item.href} className="border-b border-white/5 py-3 first:pt-0 last:border-0">
              <Link
                href={item.href}
                className="block text-white/85 hover:text-gold-500 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              {item.megaMenu && (
                <ul className="mt-2 flex flex-col gap-2 pl-4">
                  {item.megaMenu.map(({ label, href, icon }) => {
                    const Icon = ICON_MAP[icon] ?? ICON_MAP.default;
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 text-sm text-white/60 hover:text-gold-500 transition-colors"
                        >
                          <Icon size={14} aria-hidden="true" />
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}

          <Button href="/contact" size="sm" variant="premium" className="mt-4 w-full">
            Request Consultation
            <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
          </Button>
        </Container>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
