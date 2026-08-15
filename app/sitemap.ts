import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { CATALOG_DIVISIONS, CATALOG_ITEMS } from "@/lib/data/catalog";
import { PROJECT_CATEGORIES } from "@/lib/data/project-categories";

/**
 * Static routes, deliberately NOT derived from NAV_MENU — nav structure
 * and "every indexable URL" are different concerns (see Phase 2 Revision
 * report for why conflating them was itself a bug once). Anchors (e.g.
 * /about#vision) are sections of an existing document, not
 * separate documents, so they're correctly excluded here.
 *
 * Catalog and project-category routes are generated below from their
 * respective data files — the same single source of truth
 * generateStaticParams uses for those routes — rather than hand-listed,
 * so this can't drift out of sync with what actually exists.
 */
const STATIC_ROUTES = [
  "/",
  "/about",
  "/what-we-do",
  "/solutions",
  "/manufacturing",
  "/quality",
  "/custom-engineering",
  "/smart-fleet",
  "/gallery",
  "/collaborations",
  "/projects",
  "/fuel-calculator",
  "/government",
  "/csr",
  "/company-credentials",
  "/global-vision",
  "/downloads",
  "/faq",
  "/quotation",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const divisionRoutes = CATALOG_DIVISIONS.map((d) => `/solutions/${d.slug}`);
  const itemRoutes = CATALOG_ITEMS.map((i) => `/solutions/${i.division}/${i.slug}`);
  const projectRoutes = PROJECT_CATEGORIES.map((c) => `/projects/${c.slug}`);
  const routes = [...STATIC_ROUTES, ...divisionRoutes, ...itemRoutes, ...projectRoutes];

  return routes.map((route) => ({
    url: route === "/" ? siteConfig.url : `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route.split("/").length > 3 ? 0.5 : 0.7,
  }));
}
