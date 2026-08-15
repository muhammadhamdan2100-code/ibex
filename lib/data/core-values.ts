import type { IconName } from "@/lib/icons";

export interface CoreValue {
  number: number;
  title: string;
  titleUrdu: string;
  description: string;
  icon: IconName;
}

/**
 * The five core values named directly in the About-page brief — titles
 * and Urdu given verbatim. Short explanations are one line elaborating
 * on the stated value name itself (not a new claim about the company),
 * consistent with how every other category/label list in this project
 * handles a short description.
 */
export const CORE_VALUES: CoreValue[] = [
  {
    number: 1,
    title: "Quality",
    titleUrdu: "معیار",
    description: "Every vehicle is engineered and finished to a standard that holds up under real-world use.",
    icon: "badge-check",
  },
  {
    number: 2,
    title: "Integrity & Transparency",
    titleUrdu: "دیانت اور شفافیت",
    description: "Honest engineering and honest communication with every client, at every stage of a project.",
    icon: "shield-check",
  },
  {
    number: 3,
    title: "Innovation & Research",
    titleUrdu: "جدت اور تحقیق",
    description: "Continuous research into materials, methods, and mobility technology drives how we build.",
    icon: "lightbulb",
  },
  {
    number: 4,
    title: "Customer Trust & Safety",
    titleUrdu: "صارفین کا اعتماد اور حفاظت",
    description: "Safety is treated as a design requirement, not an afterthought — trust is earned project by project.",
    icon: "heart-handshake",
  },
  {
    number: 5,
    title: "Sustainable Engineering & National Development",
    titleUrdu: "ماحول دوست انجینئرنگ اور قومی ترقی",
    description: "Environmentally responsible engineering, built in Pakistan, for Pakistan's mobility future.",
    icon: "leaf",
  },
];
