import { CATALOG_DIVISIONS, CATALOG_ITEMS } from "@/lib/data/catalog";
import { PROJECT_CATEGORIES } from "@/lib/data/project-categories";
import { GALLERY_FILTERS } from "@/lib/data/gallery";

export interface SearchEntry {
  title: string;
  href: string;
  group: string;
}

/**
 * Search index assembled from the site's real data sources (catalog,
 * projects, gallery categories) plus a short list of core pages — not a
 * separately hand-maintained list, so it can't drift from what actually
 * exists. Built at module load, not per-search, since none of these
 * arrays change at runtime.
 */
export const SEARCH_INDEX: SearchEntry[] = [
  // Core pages
  { title: "Home", href: "/", group: "Pages" },
  { title: "About", href: "/about", group: "Pages" },
  { title: "What We Do", href: "/what-we-do", group: "Pages" },
  { title: "Manufacturing", href: "/manufacturing", group: "Manufacturing" },
  { title: "Custom Engineering", href: "/custom-engineering", group: "Services" },
  { title: "Smart Fleet Technology", href: "/smart-fleet", group: "Services" },
  { title: "Quality Standards", href: "/quality", group: "Manufacturing" },
  { title: "Government Registration", href: "/government", group: "Government" },
  { title: "CSR", href: "/csr", group: "Government" },
  { title: "Company Credentials", href: "/company-credentials", group: "Pages" },
  { title: "Global Vision", href: "/global-vision", group: "Pages" },
  { title: "Collaborations", href: "/collaborations", group: "Pages" },
  { title: "Gallery", href: "/gallery", group: "Gallery" },
  { title: "Projects", href: "/projects", group: "Projects" },
  { title: "Download Center", href: "/downloads", group: "Pages" },
  { title: "Fuel Calculator", href: "/fuel-calculator", group: "Services" },
  { title: "Request a Quotation", href: "/quotation", group: "Pages" },
  { title: "Contact", href: "/contact", group: "Pages" },

  // Solutions divisions + every vehicle type
  { title: "Solutions Ecosystem", href: "/solutions", group: "Solutions" },
  ...CATALOG_DIVISIONS.map((d) => ({ title: d.title, href: `/solutions/${d.slug}`, group: "Solutions" })),
  ...CATALOG_ITEMS.map((i) => ({
    title: i.title,
    href: `/solutions/${i.division}/${i.slug}`,
    group: "Vehicles",
  })),

  // Project categories
  ...PROJECT_CATEGORIES.map((c) => ({ title: c.title, href: `/projects/${c.slug}`, group: "Projects" })),

  // Gallery categories (anchor into the gallery page's filter, not separate routes)
  ...GALLERY_FILTERS.filter((f) => f.value !== "all").map((f) => ({
    title: f.label,
    href: "/gallery",
    group: "Gallery",
  })),
];
