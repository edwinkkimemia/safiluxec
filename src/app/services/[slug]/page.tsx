import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { services, faqs } from "@/lib/data";
import { baseMetadata, serviceJsonLd } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return baseMetadata({ title: s.name, description: `${s.shortDescription} Professional ${s.name.toLowerCase()} across Nairobi, Kiambu & Thika. Free quotes, trained crews.`, path: `/services/${slug}`, image: s.image });
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const related = services.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd({ name: s.name, description: s.description, image: s.image, slug: s.slug })) }} />
      <PageHero eyebrow="Service" title={s.name} copy={s.shortDescription} image={s.image} crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.name }]} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96">
              <Image src={s.image} alt={s.name} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover" priority />
              {s.priceHint && <span className="absolute bottom-4 left-4 rounded-full bg-pine-950/90 px-4 py-2 text-[13px] font-bold text-gold-200">{s.priceHint}</span>}
            </div>
            <p className="mt-6 text-[15.5px] leading-relaxed text-ink-700">{s.description}</p>
            <h2 className="mt-8 font-display text-2xl font-semibold text-pine-950">What is included</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 rounded-xl bg-white px-4 py-3 text-sm font-medium text-ink-700 card-shadow"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-pine-700" />{f}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={whatsappLink(s.whatsapp)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:brightness-95"><WhatsAppIcon size={16} /> WhatsApp for this service</a>
              <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex items-center gap-2 rounded-full border border-pine-900/20 px-6 py-3 text-sm font-bold text-pine-900"><Phone size={16} /> {siteConfig.phone}</a>
            </div>
            <div className="mt-4 rounded-2xl border border-gold-500/50 bg-gold-100 p-4 text-[13px] leading-relaxed text-ink-700">
              <strong className="text-pine-950">Our promise:</strong> fixed quote in writing before we start, 24-hour re-clean guarantee, pay after walkthrough sign-off. <Link href="/book" className="font-bold text-brand-700 underline">Skip the queue — book directly →</Link>
            </div>
            <h2 className="mt-10 font-display text-2xl font-semibold text-pine-950">Common questions</h2>
            <div className="mt-4"><FaqAccordion items={faqs.slice(0, 4)} /></div>
          </div>
          <aside>
            <div className="card-shadow lg:sticky lg:top-24 rounded-3xl border border-ink-900/[0.07] bg-white p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold text-pine-950">Get a free quote for {s.name.toLowerCase()}</h2>
              <p className="mt-1 text-[13px] text-ink-500">Respond within one business day.</p>
              <div className="mt-5"><QuoteForm defaultService={s.name} /></div>
            </div>
          </aside>
        </div>
        <div className="mt-16">
          <div className="flex items-center justify-between"><h2 className="font-display text-2xl font-semibold text-pine-950">Related services</h2><Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-bold text-pine-800">All services <ArrowRight size={15} /></Link></div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ServiceCard key={r.slug} service={r} />)}</div>
        </div>
      </section>
    </>
  );
}
