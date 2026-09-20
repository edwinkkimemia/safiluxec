import { baseMetadata, faqJsonLd } from "@/lib/seo";
import { faqs } from "@/lib/data";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";

export const metadata = baseMetadata({ title: "FAQs", description: "Answers on pricing, products, scheduling, recurring cleans, commercial contracts, weekends and quotes.", path: "/faq" });

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <PageHero eyebrow="Help centre" title="Frequently asked questions" copy="Straight answers on cost, timing, products and bookings. Still unsure? WhatsApp us — a human replies." crumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <FaqAccordion items={faqs} />
      </section>
      <div className="pb-16"><CtaBand /></div>
    </>
  );
}
