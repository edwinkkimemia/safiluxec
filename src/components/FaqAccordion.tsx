"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";

export default function FaqAccordion({ items = faqs }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-ink-900/10 rounded-2xl border border-ink-900/10 bg-white">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
              <span className="text-[15px] font-semibold text-pine-950">{f.q}</span>
              <ChevronDown size={18} className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
