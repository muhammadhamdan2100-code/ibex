export interface ProcessStep {
  step: number;
  title: string;
}

/**
 * The 13-step manufacturing process named directly in the brief —
 * standard, generic vehicle-manufacturing process terminology, not a
 * specific claim about IBEX's own facility, equipment, or sequence.
 */
export const MANUFACTURING_PROCESS: ProcessStep[] = [
  { step: 1, title: "Research" },
  { step: 2, title: "Engineering" },
  { step: 3, title: "CAD Design" },
  { step: 4, title: "Steel Fabrication" },
  { step: 5, title: "Welding" },
  { step: 6, title: "Frame Assembly" },
  { step: 7, title: "Body Construction" },
  { step: 8, title: "Painting" },
  { step: 9, title: "Interior Installation" },
  { step: 10, title: "Electrical Systems" },
  { step: 11, title: "Testing" },
  { step: 12, title: "Quality Control" },
  { step: 13, title: "Delivery" },
];
