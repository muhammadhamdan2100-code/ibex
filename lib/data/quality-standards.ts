export interface QualityStandard {
  code: string;
  name: string;
  /** Factual, publicly-documented description of what the standard itself covers — NOT a claim that IBEX holds or meets it. */
  description: string;
  /** Real, client-confirmed status where one exists — e.g. "Application in progress" for ISO 9001/14001. Omitted (not certified, not claimed) for standards with no confirmed status. */
  status?: string;
}

/**
 * Descriptions below are general public information about what each
 * standard covers — verifiable, standard reference facts, the same kind
 * of description you'd find on the standard body's own summary page.
 * They are NOT a claim that IBEX Vehicle Restoration holds or complies
 * with ECE R29/FMVSS/EN 1789 — that status is still undisclosed. ISO
 * 9001 and ISO 14001 are the exception: their `status` field
 * ("Application in progress") was provided directly by the client, and
 * is deliberately NOT "Certified" — stating it any more favorably would
 * misrepresent a real, still-pending certification process. The Quality
 * page states this distinction explicitly; see app/quality/page.tsx.
 */
export const QUALITY_STANDARDS: QualityStandard[] = [
  {
    code: "ECE R29",
    name: "UN Regulation No. 29",
    description:
      "A UNECE vehicle regulation concerning protection of the occupants of a commercial vehicle's cab, covering cab strength in impact scenarios.",
  },
  {
    code: "FMVSS",
    name: "Federal Motor Vehicle Safety Standards",
    description:
      "The United States' federal vehicle safety regulations, administered by NHTSA, covering a wide range of vehicle safety requirements.",
  },
  {
    code: "EN 1789",
    name: "CEN 1789 — Road Ambulances",
    description:
      "A European standard specifying requirements for the design, performance, and equipment of road ambulances and medical vehicles.",
  },
  {
    code: "ISO 9001",
    name: "Quality Management Systems",
    description:
      "An international standard specifying requirements for a quality management system, focused on consistent process and continual improvement.",
    status: "Application in progress",
  },
  {
    code: "ISO 14001",
    name: "Environmental Management Systems",
    description:
      "An international standard specifying requirements for an environmental management system, focused on reducing environmental impact.",
    status: "Application in progress",
  },
];
