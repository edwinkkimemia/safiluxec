"use client";
import { useState } from "react";
import Image from "next/image";
import { gallerySeed } from "@/lib/data";

const cats = ["all", ...Array.from(new Set(gallerySeed.map((g) => g.category)))];

export default function GalleryGrid() {
  const [cat, setCat] = useState("all");
  const items = gallerySeed.filter((g) => cat === "all" || g.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold capitalize transition ${cat === c ? "bg-brand-600 text-white" : "bg-brand-600/[0.07] text-pine-900 hover:bg-brand-600/[0.12]"}`}>
            {c.replace("-", " ")}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((g, i) => (
          <figure key={i} className="card-shadow group overflow-hidden rounded-2xl border border-ink-900/[0.07] bg-white">
            <div className="relative h-56 overflow-hidden">
              <Image src={g.image} alt={g.caption} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
            </div>
            <figcaption className="flex items-center justify-between gap-2 px-4 py-3">
              <span className="text-[13px] font-medium text-ink-700">{g.caption}</span>
              <span className="rounded-full bg-brand-600/[0.07] px-2.5 py-1 text-[11px] font-semibold text-pine-800 capitalize">{g.category}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
