export interface FaqCategory {
  slug: string;
  title: string;
  items: { question: string; answer: string }[];
}

/**
 * FAQ content stays generic and process-focused — the same discipline as
 * every other page: no invented specs, prices, or timelines presented as
 * confirmed fact.
 */
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    slug: "services",
    title: "Services",
    items: [
      {
        question: "What vehicle types does IBEX work on?",
        answer: "The Solutions section covers the full range, organized into nine divisions — from passenger transport and heavy vehicles to medical and emergency vehicles. Browse by division to see specific vehicle types.",
      },
      {
        question: "Can I request a vehicle type that isn't listed?",
        answer: "Yes — Custom Engineering exists for exactly this. Get in touch to discuss a requirement outside the standard catalog.",
      },
    ],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    items: [
      {
        question: "What does the manufacturing process look like?",
        answer: "The Manufacturing page walks through the general stages, from research through delivery. Facility-specific detail is published once confirmed.",
      },
      {
        question: "Do you build new vehicles or restore existing ones?",
        answer: "Both — vehicle restoration and Special Purpose Vehicle manufacturing are both part of the business.",
      },
    ],
  },
  {
    slug: "government",
    title: "Government",
    items: [
      {
        question: "Is IBEX eligible for government projects?",
        answer: "The Government page lists the registration types relevant to public-sector eligibility. Current registration status is shown there, marked pending where not yet confirmed.",
      },
      {
        question: "How do I inquire about a government project?",
        answer: "Use the contact form and select \"Government Project\" as the inquiry type.",
      },
    ],
  },
  {
    slug: "projects",
    title: "Projects",
    items: [
      {
        question: "Can I see examples of completed projects?",
        answer: "The Projects section is organized into categories, ready to display real case studies as they're documented. Case studies are added only once real project details exist.",
      },
      {
        question: "How long does a typical project take?",
        answer: "Timelines vary by scope and are confirmed during consultation rather than quoted generically here.",
      },
    ],
  },
  {
    slug: "support",
    title: "Support",
    items: [
      {
        question: "How do I get a quotation?",
        answer: "Use the Request a Quotation page, or select \"Request Quotation\" as the inquiry type on the contact form.",
      },
      {
        question: "What's the best way to reach IBEX directly?",
        answer: "The contact form is the fastest route right now — direct phone and email details will be added once confirmed.",
      },
    ],
  },
];
