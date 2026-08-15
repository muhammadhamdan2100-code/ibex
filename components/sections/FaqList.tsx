"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqEntry {
  question: string;
  answer: string;
}

interface FaqListProps {
  items: FaqEntry[];
}

export default function FaqList({ items }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question} className="glass rounded-lg">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className="font-display text-base text-white">{faq.question}</span>
              <ChevronDown
                size={18}
                className={cn("shrink-0 text-gold-500 transition-transform duration-fast", open && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {open && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-steel-grey-light">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
