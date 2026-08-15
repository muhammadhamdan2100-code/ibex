import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface BuildMetadataInput {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/** Central metadata builder — every route's page.tsx should call this instead of hand-rolling <Metadata>. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = "/logos/ibex-vr-corporate-badge.png",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = title === siteConfig.name || title.includes("|") ? title : `${title} | ${siteConfig.shortName}`;

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords],
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 1200, alt: siteConfig.name }],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** JSON-LD Organization schema — rendered once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: "IBEX VR",
    url: siteConfig.url,
    logo: `${siteConfig.url}/logos/ibex-vr-corporate-badge.png`,
    slogan: "Rebuild With Trust",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sadiqabad",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
  };
}

interface BreadcrumbJsonLdItem {
  label: string;
  href?: string;
}

/**
 * JSON-LD BreadcrumbList schema, generated from the same items every
 * <Breadcrumb> component already receives — see components/ui/
 * Breadcrumb.tsx, which renders this automatically, so no page needs to
 * call it separately.
 */
export function breadcrumbJsonLd(items: BreadcrumbJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
    })),
  };
}
