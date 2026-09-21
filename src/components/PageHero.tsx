import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function PageHero({ eyebrow, title, copy, crumbs, image = "/clean6.png" }: { eyebrow?: string; title: string; copy?: string; crumbs?: { label: string; href?: string }[]; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-pine-950">
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={image} alt="" fill sizes="100vw" quality={95} priority className="object-cover opacity-60" style={{ objectPosition: "center 35%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-pine-950 via-pine-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-950/40 via-transparent to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-white/60">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-gold-200">{c.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight size={12} />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold text-balance text-white sm:text-5xl">{title}</h1>
        {copy && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">{copy}</p>}
      </div>
    </section>
  );
}
