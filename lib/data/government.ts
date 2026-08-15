import type { IconName } from "@/lib/icons";

export interface RegistrationEntry {
  code: string;
  name: string;
  icon: IconName;
  /** Real registration number where confirmed by the client; undefined where still pending. */
  number?: string;
}

/**
 * Registration types and numbers. SECP, NTN, STRN/GSTN, PNTN, and PPRA
 * were provided in the Phase 7 brief; e-PAD Punjab and e-PAD Federal/
 * Sindh identifiers were provided in the About-page brief. All are
 * stated as fact — treated the same as any other client-provided
 * information given directly in chat, presented exactly as given rather
 * than reformatted or second-guessed.
 */
export const REGISTRATIONS: RegistrationEntry[] = [
  { code: "SECP", name: "SECP Registration", icon: "file-check", number: "0246615" },
  { code: "NTN", name: "National Tax Number (NTN)", icon: "hash", number: "C462495" },
  { code: "STRN/GSTN", name: "Sales Tax Registration (STRN/GSTN)", icon: "receipt", number: "3277876391502" },
  { code: "PNTN", name: "Provincial NTN (PNTN)", icon: "landmark", number: "A397902-3" },
  { code: "PPRA", name: "PPRA Registration", icon: "clipboard-list", number: "2026-18158" },
  { code: "e-PAD-PB", name: "e-PAD Punjab", icon: "globe", number: "nabzpakistan@gmail.com" },
  { code: "e-PAD-FED", name: "e-PAD Federal / Sindh", icon: "globe", number: "ibex_restoration_vehicle_0246615" },
];
