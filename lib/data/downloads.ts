export interface DownloadEntry {
  slug: string;
  title: string;
  /** Real file path — a genuine, clearly-labeled placeholder PDF, not a broken link. Swap the file at this path once the real document exists; the slug/URL doesn't need to change. */
  href: string;
}

export const DOWNLOAD_DOCUMENTS: DownloadEntry[] = [
  { slug: "company-profile", title: "Company Profile", href: "/documents/company-profile.pdf" },
  { slug: "corporate-brochure", title: "Corporate Brochure", href: "/documents/corporate-brochure.pdf" },
  { slug: "capability-statement", title: "Capability Statement", href: "/documents/capability-statement.pdf" },
  { slug: "government-registration", title: "Government Registration Documents", href: "/documents/government-registration.pdf" },
  { slug: "product-catalogue", title: "Product Catalogue", href: "/documents/product-catalogue.pdf" },
  { slug: "engineering-catalogue", title: "Engineering Catalogue", href: "/documents/engineering-catalogue.pdf" },
  { slug: "certificates", title: "Certificates", href: "/documents/certificates.pdf" },
];
