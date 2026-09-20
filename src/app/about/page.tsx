import Image from "next/image";
import Link from "next/link";
import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { IMAGES } from "@/lib/data";

export const metadata = baseMetadata({ title: "About Us", description: "Safiluxe Cleaning Solutions — a premium Kenyan cleaning company built on trained people, honest quotes and detail-obsessed quality standards.", path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Safiluxe" title="Cleaning is more than appearance" copy="It is about creating healthier, more comfortable spaces where people can live and work confidently." crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-pine-950 sm:text-3xl">Our story</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-700">
            <p>Safiluxe Cleaning Solutions started with a simple frustration: cleaning in Nairobi was either cheap and careless, or expensive and inconsistent. We built the company we wished existed — trained, uniformed professionals with real checklists, supervisor audits and honest fixed quotes.</p>
            <p>Today we serve homes, offices, landlords, Airbnb hosts and commercial sites across Nairobi, Kiambu and Thika — from one-off deep cleans to daily contracted crews.</p>
          </div>
          <h3 className="mt-8 font-display text-xl font-semibold text-pine-950">Our mission</h3>
          <p className="mt-2 text-[15px] text-ink-700">To raise the standard of clean — healthier spaces, calmer homes, and workplaces businesses are proud of.</p>
          <h3 className="mt-8 font-display text-xl font-semibold text-pine-950">Service philosophy</h3>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {["Show up on time, every time", "Clean to a written checklist", "Supervisor spot-checks", "Safe, effective chemistry", "Photographic walkthroughs", "Own every mistake fast"].map((x) => (
              <li key={x} className="rounded-xl bg-white px-4 py-3 text-sm font-medium card-shadow">{x}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl"><Image src={IMAGES.team} alt="SafiLuxe cleaning team" width={900} height={600} className="aspect-[3/2] w-full object-cover" /></div>
          <div className="card-shadow grid grid-cols-3 gap-3 rounded-3xl border border-ink-900/[0.07] bg-white p-5 text-center">
            {[["500+", "Spaces cleaned"], ["4.9★", "Average rating"], ["98%", "Rebook rate"]].map(([n, l]) => (
              <div key={l}><p className="font-display text-2xl font-semibold text-pine-900">{n}</p><p className="text-xs text-ink-500">{l}</p></div>
            ))}
          </div>
          <div className="overflow-hidden rounded-3xl"><Image src="/clean8.png" alt="Smiling SafiLuxe cleaning professional" width={1792} height={576} className="aspect-[16/7] w-full object-cover" loading="lazy" /></div>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-pine-950">Why customers trust Safiluxe</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Vetted people", "Background-checked, trained and uniformed. Supervised on every job."],
              ["Checklist quality", "Room-by-room SOPs and photo walkthroughs — no rushed corners."],
              ["Honest pricing", "Fixed quotes before we start. No surprise add-ons at the door."],
            ].map(([t, c]) => (
              <div key={t} className="rounded-2xl bg-cream-100 p-6"><p className="font-display text-lg font-semibold text-pine-950">{t}</p><p className="mt-2 text-sm text-ink-500">{c}</p></div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white">Work with us — get a quote</Link>
            <Link href="/gallery" className="rounded-full border border-pine-900/20 px-6 py-3 text-sm font-bold text-pine-900">See our work</Link>
          </div>
        </div>
      </section>
      <div className="py-14"><CtaBand /></div>
    </>
  );
}
