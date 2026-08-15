import Link from "next/link";
import type { MegaMenuEntry } from "@/lib/data/nav-menu";
import { ICON_MAP } from "@/lib/icons";

interface MegaMenuProps {
  items: MegaMenuEntry[];
  onNavigate?: () => void;
}

/** Premium dropdown panel: icon + label cards, glass surface, gold accent on hover. Switches to a 2-column layout for longer menus (e.g. Solutions' 10 items) so the panel stays a reasonable height. */
export default function MegaMenu({ items, onNavigate }: MegaMenuProps) {
  const twoColumn = items.length > 6;

  return (
    <div
      role="menu"
      className={
        twoColumn
          ? "glass absolute left-1/2 top-full z-navbar mt-3 w-[34rem] -translate-x-1/2 rounded-lg p-3 shadow-md will-change-transform"
          : "glass absolute left-1/2 top-full z-navbar mt-3 w-80 -translate-x-1/2 rounded-lg p-3 shadow-md will-change-transform"
      }
      style={{ transform: "translate(-50%, 0)" }}
    >
      <ul className={twoColumn ? "grid grid-cols-2 gap-1" : "flex flex-col gap-1"}>
        {items.map(({ label, href, icon }) => {
          const Icon = ICON_MAP[icon] ?? ICON_MAP.default;
          return (
            <li key={href} role="none">
              <Link
                href={href}
                role="menuitem"
                onClick={onNavigate}
                className="group/item flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/5 text-gold-500 transition-colors group-hover/item:bg-gold-500/15 focus:outline-none">
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
