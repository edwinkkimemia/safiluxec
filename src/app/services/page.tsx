import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/data";

export const metadata = baseMetadata({ title: "Cleaning Services", description: "Explore 14 premium cleaning services — residential, office, commercial, deep, carpet, sofa, post-construction and more across Nairobi.", path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Every clean, done to a higher standard" copy="Residential, office and commercial specialities — each with transparent quotes, trained crews and a supervisor-checked finish." crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </section>
      <div className="pb-16"><CtaBand /></div>
    </>
  );
}
