import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ClipboardCheck, Users, CalendarClock } from "lucide-react";
import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { IMAGES } from "@/lib/data";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/site";

export const metadata = baseMetadata({ title: "Commercial & Office Cleaning", description: "Contract office & commercial cleaning in Nairobi — daily, weekly, monthly plans, site assessments and supervisor QA for offices, clinics, schools & more.", path: "/commercial" });

export default function CommercialPage() {
  return (
    <>
      <PageHero eyebrow="Commercial · B2B" title="Professional cleaning that keeps your business ready" copy="Daily, weekly and monthly contracts with site assessments, SOP checklists and supervisor audits. Offices, clinics, schools, retail, hospitality and industry." crumbs={[{ label: "Home", href: "/" }, { label: "Commercial" }]} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-pine-950 sm:text-3xl">Built for facility & office managers</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { icon: ClipboardCheck, t: "Site assessment & SOP", c: "Free walkthrough, scope and checklist per zone." },
              { icon: Users, t: "Vetted, uniformed crews", c: "Background-checked teams with on-site supervision." },
              { icon: CalendarClock, t: "Flexible frequencies", c: "Daily, weekly, monthly or fully custom schedules." },
              { icon: CheckCircle2, t: "QA & consumables", c: "Audits, photo reports and hygiene-supply management." },
            ].map((x) => (
              <div key={x.t} className="card-shadow rounded-2xl border border-ink-900/[0.07] bg-white p-5">
                <x.icon size={22} className="text-pine-700" />
                <p className="mt-2 font-semibold text-pine-950">{x.t}</p>
                <p className="mt-1 text-[13px] text-ink-500">{x.c}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quote?segment=commercial" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700">Request a Commercial Quote</Link>
            <a href={whatsappLink(WHATSAPP_MESSAGES.commercial)} target="_blank" rel="noreferrer" className="rounded-full border border-pine-900/20 px-6 py-3 text-sm font-bold text-pine-900">Discuss on WhatsApp</a>
          </div>
          <p className="mt-3 text-[13px] font-semibold text-ink-500">Free site assessments running this week — slots go to the first requests. <span className="text-brand-700">Fixed contract pricing, no hidden extras.</span></p>
          <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
            {["Offices", "Schools", "Clinics & Hospitals", "Restaurants", "Retail", "Warehouses", "Apartment blocks", "Hotels", "Gyms", "Institutions", "Property managers"].map((t) => (
              <span key={t} className="rounded-full bg-brand-600/[0.07] px-3.5 py-1.5 font-semibold text-pine-900">{t}</span>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl"><Image src="/clean4.png" alt="SafiLuxe team cleaning a commercial lobby" width={1824} height={576} className="aspect-[16/10] w-full object-cover" /></div>
          <div className="card-shadow rounded-3xl border border-ink-900/[0.07] bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-pine-950">Request commercial assessment</h2>
            <div className="mt-4"><QuoteForm defaultService="Commercial Cleaning" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
