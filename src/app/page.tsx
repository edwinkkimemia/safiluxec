import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, CalendarClock, Building2, Sparkles, ArrowRight, CheckCircle2, Phone, Star, MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Testimonials from "@/components/Testimonials";
import GalleryGrid from "@/components/GalleryGrid";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import GuaranteeBand from "@/components/GuaranteeBand";
import Reveal from "@/components/Reveal";
import { services, IMAGES, locations, faqs } from "@/lib/data";
import { siteConfig, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/site";

const trust = [
  { icon: ShieldCheck, label: "Trained Cleaning Professionals" },
  { icon: CalendarClock, label: "Flexible Scheduling" },
  { icon: Building2, label: "Residential & Commercial" },
  { icon: Sparkles, label: "Quality Assured" },
];

const why = [
  "Trained and professional cleaners", "Consistent quality standards", "Flexible cleaning schedules",
  "Reliable arrival times", "Obsessive attention to detail", "Commercial + residential expertise",
  "High-quality, safe cleaning products", "Customised cleaning plans", "Responsive customer support",
  "Competitive, transparent quotations",
];

const steps = [
  { n: "01", title: "Tell Us What You Need", copy: "Call, WhatsApp or send the quote form with photos. Takes 2 minutes." },
  { n: "02", title: "Receive Your Quote", copy: "Transparent fixed quote — usually within hours, free site visit if needed." },
  { n: "03", title: "Choose Your Schedule", copy: "Pick a time that suits you, including evenings and weekends." },
  { n: "04", title: "We Clean, You Enjoy", copy: "Supervised crew, checklist clean, walkthrough before we leave." },
];

export default function HomePage() {
  const featured = services.filter((s) => s.featured).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-pine-950">
        <div className="absolute inset-0">
          <Image src={IMAGES.hero} alt="SafiLuxe cleaning professional mopping a bright lobby" fill priority sizes="100vw" className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-pine-950 via-pine-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950/35 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full border border-gold-500/40 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-200">
              Nairobi · Kiambu · Thika — Residential & Commercial
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-6xl">
              A Cleaner Space.<br /><span className="text-gold-300">A Better Standard.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
              Safiluxe Cleaning Solutions provides professional residential and commercial cleaning designed around quality, reliability, and attention to detail.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-pine-950 transition hover:bg-gold-400">
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore Our Services
              </Link>
            </div>
            <p className="mt-4 text-[13px] font-semibold text-gold-200">Now booking this week — weekend slots fill by Thursday. Lock yours in.</p>
            <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trust.map((t) => (
                <div key={t.label} className="flex items-center gap-2.5 rounded-2xl bg-white/[0.07] px-3.5 py-3 backdrop-blur">
                  <t.icon size={20} className="shrink-0 text-gold-300" />
                  <dt className="text-xs leading-tight font-semibold text-white/90">{t.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="hidden lg:block">
            <div className="card-shadow relative overflow-hidden rounded-3xl border border-white/15 bg-white">
              <div className="relative h-72"><Image src="/clean.png" alt="SafiLuxe cleaning team with trolley and supplies" fill sizes="40vw" className="object-cover" /></div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span className="flex gap-0.5">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className="fill-gold-500 text-gold-500" />)}</span>
                  <span className="text-xs font-semibold text-ink-500">4.9 · 200+ verified reviews</span>
                </div>
                <p className="mt-2 font-display text-lg text-pine-950">“It felt like moving into a new home.”</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-[13px] font-bold text-white"><WhatsAppIcon size={14} /> WhatsApp Us</a>
                  <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-pine-900/20 px-4 py-2.5 text-[13px] font-bold text-pine-900"><Phone size={14} /> {siteConfig.phone}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20" aria-label="Services">
        <Reveal><SectionHeading eyebrow="What we clean" title="Premium cleaning for every space" copy="Fourteen specialised services, one standard: spotless. Tap any card for details, pricing guidance and instant WhatsApp quoting." /></Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => <Reveal key={s.slug} delay={(i % 3) * 80}><ServiceCard service={s} /></Reveal>)}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-pine-900/20 px-6 py-3 text-sm font-bold text-pine-900 transition hover:bg-brand-600 hover:text-white">
            View all 14 services <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-white py-16 lg:py-20" aria-label="Why Safiluxe">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl">
              <Image src={IMAGES.team} alt="Safiluxe cleaning team at work" width={900} height={700} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 rounded-2xl bg-pine-950/90 px-5 py-4 text-white backdrop-blur">
                <p className="font-display text-3xl font-semibold text-gold-300">98%</p>
                <p className="text-xs text-white/70">clients rebook or refer us</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading align="left" eyebrow="Why Safiluxe" title="The detail-obsessed team behind spotless spaces" copy="We are not a gig marketplace. We are a trained, supervised cleaning company with checklists, quality audits and a name to protect." />
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {why.map((w) => (
                <li key={w} className="flex items-start gap-2.5 rounded-xl bg-cream-100 px-3.5 py-3 text-[13.5px] font-medium text-ink-700">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-pine-700" /> {w}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700">Our story & standards</Link>
              <Link href="/quote" className="rounded-full border border-pine-900/20 px-6 py-3 text-sm font-bold text-pine-900 hover:bg-brand-600 hover:text-white">Request a site visit</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-label="How it works">
        <Reveal><SectionHeading eyebrow="Simple process" title="Spotless in four easy steps" /></Reveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <li className="card-shadow relative h-full rounded-2xl border border-ink-900/[0.07] bg-white p-6">
                <span className="font-display text-4xl font-semibold text-pine-900/15">{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-pine-950">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{s.copy}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* GUARANTEE */}
      <div className="pb-16"><GuaranteeBand /></div>

      {/* RESIDENTIAL */}
      <section className="bg-pine-950 py-16 lg:py-20" aria-label="Residential cleaning">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">For homes & rentals</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Come home to a space that feels fresh again</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70">From weekly upkeep to full deep cleans — for homeowners, apartments, landlords and tenants. Same trusted crew, flexible plans, hotel-fresh finish every visit.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["One-time", "Weekly", "Bi-weekly", "Monthly", "Deep clean"].map((f) => (
                <span key={f} className="rounded-full bg-white/10 px-4 py-2 text-[13px] font-semibold text-white">{f}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/book?service=Residential+Cleaning" className="rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-pine-950 hover:bg-gold-400">Book Home Cleaning</Link>
              <Link href="/residential" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Explore residential</Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <Image src={IMAGES.home} alt="SafiLuxe professional after home cleaning" width={500} height={620} className="h-64 w-full rounded-2xl object-cover sm:h-80" loading="lazy" />
              <Image src="/clean12.png" alt="SafiLuxe detail cleaning in a living room" width={500} height={620} className="mt-8 h-64 w-full rounded-2xl object-cover sm:h-80" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMMERCIAL */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-label="Commercial cleaning">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl">
              <Image src={IMAGES.office} alt="Pristine modern office" width={900} height={640} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading align="left" eyebrow="For business" title="Professional cleaning that keeps your business ready" copy="Offices, clinics, schools, restaurants, retail, warehouses, gyms and institutions — with contracts, site assessments and supervisor QA." />
            <div className="mt-5 flex flex-wrap gap-2 text-[13px]">
              {["Offices", "Schools", "Clinics", "Restaurants", "Retail", "Warehouses", "Hotels", "Gyms", "Institutions"].map((t) => (
                <span key={t} className="rounded-full bg-brand-600/[0.07] px-3.5 py-1.5 font-semibold text-pine-900">{t}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/quote?segment=commercial" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700">Request a Commercial Quote</Link>
              <Link href="/commercial" className="rounded-full border border-pine-900/20 px-6 py-3 text-sm font-bold text-pine-900 hover:bg-brand-600 hover:text-white">Commercial plans</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="bg-white py-16" aria-label="Before and after">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading align="left" eyebrow="Proof of work" title="Before & after: the Safiluxe difference" copy="Real finishes from recent jobs. Filter by service category." />
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-bold text-pine-800">Full gallery <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-8"><GalleryGrid /></div>
        </div>
      </section>

      {/* TESTIMONIALS + AREAS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-label="Reviews and areas">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal><SectionHeading align="left" eyebrow="Client love" title="Trusted in homes & businesses across Nairobi" /><div className="mt-6"><Testimonials /></div></Reveal>
          <Reveal delay={120}>
            <div className="card-shadow h-full rounded-3xl border border-ink-900/[0.07] bg-pine-950 p-7 text-white">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300"><MapPin size={14} /> Service areas</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">Where we clean</h3>
              <ul className="mt-4 space-y-2.5">
                {locations.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/locations/${l.slug}`} className="flex items-center justify-between rounded-xl bg-white/[0.07] px-4 py-3 text-sm font-medium transition hover:bg-white/[0.12]">
                      {l.name} <ArrowRight size={14} className="text-gold-300" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/locations" className="mt-4 block text-center text-[13px] font-semibold text-gold-300 hover:text-gold-200">View all service areas →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pb-16"><CtaBand /></div>

      {/* FAQ preview */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6" aria-label="FAQs">
        <Reveal><SectionHeading eyebrow="Good to know" title="Frequently asked questions" /></Reveal>
        <div className="mt-8"><FaqAccordion items={faqs.slice(0, 5)} /></div>
        <div className="mt-6 text-center"><Link href="/faq" className="text-sm font-bold text-pine-800">See all FAQs →</Link></div>
      </section>
    </>
  );
}
