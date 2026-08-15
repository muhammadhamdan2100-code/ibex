export interface NavLink {
  label: string;
  href: string;
}

export interface LogoAsset {
  src: string;
  alt: string;
  usage: readonly string[];
}

/** Shape for future service entries — transcribed from the client document, never invented. */
export interface ServiceEntry {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  icon?: string;
}

/** Shape for future certification / registration entries. */
export interface CertificationEntry {
  slug: string;
  title: string;
  issuingBody?: string;
  referenceNumber?: string;
  image?: string;
}

/** Shape for future project / case-study entries. */
export interface ProjectEntry {
  slug: string;
  title: string;
  summary: string;
  category?: string;
  coverImage?: string;
}
