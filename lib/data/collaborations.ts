export interface CollaborationCategory {
  slug: string;
  title: string;
  /** Number of placeholder tiles to render — not a claim about a real partner count. */
  placeholderCount: number;
}

export const COLLABORATION_CATEGORIES: CollaborationCategory[] = [
  { slug: "government", title: "Government Organizations", placeholderCount: 4 },
  { slug: "private-sector", title: "Private Sector", placeholderCount: 5 },
  { slug: "ngo", title: "NGOs", placeholderCount: 4 },
  { slug: "suppliers", title: "Suppliers", placeholderCount: 4 },
  { slug: "technology-partners", title: "Technology Partners", placeholderCount: 4 },
  { slug: "engineering-partners", title: "Engineering Partners", placeholderCount: 4 },
  { slug: "education", title: "Educational Institutions", placeholderCount: 4 },
  { slug: "healthcare", title: "Healthcare Organizations", placeholderCount: 4 },
  { slug: "future-global", title: "Future Global Partners", placeholderCount: 4 },
];
