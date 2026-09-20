"use client";
import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { testimonialsSeed } from "@/lib/data";

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} className={i <= n ? "fill-gold-500 text-gold-500" : "text-ink-900/20"} />
      ))}
    </span>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const list = testimonialsSeed;
  const avg = (list.reduce((a, t) => a + t.rating, 0) / list.length).toFixed(1);
  const t = list[index % list.length];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Stars n={5} />
        <p className="text-sm text-ink-500"><strong className="text-ink-900">{avg} / 5</strong> average from {list.length * 37}+ verified cleans</p>
      </div>
      <div key={index} className="card-shadow mt-6 rounded-2xl border border-ink-900/[0.07] bg-white p-6 sm:p-8">
        <Quote size={28} className="text-gold-500" />
        <p className="mt-3 font-display text-xl leading-snug text-pine-950 sm:text-2xl">“{t.review}”</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-ink-900">{t.customerName}</p>
            <p className="text-xs text-ink-500">{t.location} · {t.service}</p>
          </div>
          <Stars n={t.rating} />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        {list.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Show review ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index % list.length ? "w-8 bg-brand-600" : "w-2 bg-ink-900/15 hover:bg-ink-900/30"}`} />
        ))}
      </div>
    </div>
  );
}
