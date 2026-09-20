import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import Testimonials from "@/components/Testimonials";
import { IMAGES, services } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";

export const metadata = baseMetadata({ title: "Residential Cleaning", description: "Premium home cleaning in Nairobi — one-time, weekly, bi-weekly, monthly and deep cleans for apartments, houses, landlords and tenants.", path: "/residential" });

const plans = [
  { name: "One-time Cleaning", copy: "Spring refresh, pre-event or trial clean. Full-home checklist.", price: "From KSh 3,500" },
  { name: "Weekly Cleaning", copy: "Always-guest-ready homes. Same crew, priority slots.", price: "Save 10% vs one-time" },
  { name: "Bi-weekly Cleaning", copy: "Our most popular plan — the sweet spot of fresh and affordable.", price: "Save 7% vs one-time" },
  { name: "Monthly Cleaning", copy: "Maintenance clean plus quarterly deep-clean pairing.", price: "Custom quote" },
  { name: "Deep Cleaning", copy: "Top-to-bottom reset: grout, cabinets, descaling, detailing.", price: "From KSh 8,500" },
];

export default function ResidentialPage() {
  return (
    <>
      <PageHero eyebrow="Residential" title="Come home to a space that feels fresh again" copy="For homeowners, apartments, landlords and tenants. Vetted crews, safe products, and a checklist finish — on your schedule." crumbs={[{ label: "Home", href: "/" }, { label: "Residential" }]} />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl">
          <Image src={IMAGES.home} alt="Freshly cleaned home" width={900} height={650} className="aspect-[4/3] w-full object-cover" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-pine-950 sm:text-3xl">Recurring plans that fit real life</h2>
          <div className="mt-6 grid gap-3">
            {plans.map((p) => (
              <div key={p.name} className="card-shadow flex items-center justify-between gap-4 rounded-2xl border border-ink-900/[0.07] bg-white p-4">
                <div><p className="font-semibold text-pine-950">{p.name}</p><p className="text-[13px] text-ink-500">{p.copy}</p></div>
                <span className="shrink-0 rounded-full bg-brand-600/[0.07] px-3 py-1.5 text-xs font-bold text-pine-900">{p.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book?service=Residential+Cleaning" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700">Book Home Cleaning</Link>
            <Link href="/quote" className="rounded-full border border-pine-900/20 px-6 py-3 text-sm font-bold text-pine-900">Get a Free Quote</Link>
          </div>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-pine-950">What every home clean includes</h2>
            <ul className="mt-4 space-y-2.5">
              {["All rooms dusted, vacuumed & mopped", "Kitchen surfaces degreased, bins & floors done", "Washrooms descaled, disinfected & polished", "Mirrors, switches & touch points sanitised", "Beds made, linen changed on request", "Walkthrough sign-off before we leave"].map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-ink-700"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-pine-700" />{x}</li>
              ))}
            </ul>
            <div className="mt-8"><Testimonials /></div>
          </div>
          <div className="card-shadow h-fit rounded-3xl border border-ink-900/[0.07] bg-cream-50 p-6 sm:p-7 lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-semibold text-pine-950">Book home cleaning</h2>
            <div className="mt-4"><QuoteForm defaultService="Residential Cleaning" /></div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-pine-950">Popular for homes</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.filter((s) => ["deep-cleaning", "sofa-upholstery-cleaning", "carpet-cleaning"].includes(s.slug)).map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </section>
    </>
  );
}
