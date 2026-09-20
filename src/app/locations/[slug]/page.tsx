import { notFound } from "next/navigation";
import Link from "next/link";
import { locations, services } from "@/lib/data";
import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import ServiceCard from "@/components/ServiceCard";

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) return {};
  return baseMetadata({ title: `Cleaning Services in ${l.name}`, description: `Premium home, office & commercial cleaning in ${l.name}. ${l.description}`, path: `/locations/${slug}` });
}

export default async function LocationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) notFound();
  return (
    <>
      <PageHero eyebrow="Service area" title={`Cleaning services in ${l.name}`} copy={l.description} crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas", href: "/locations" }, { label: l.name }]} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-pine-950">What we do in {l.name}</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-700">
            {["Residential & Airbnb turnovers", "Office & commercial contracts", "Deep, move-in/out & post-construction", "Carpet, sofa, mattress, kitchen & washroom", "Same-week slots & weekend availability"].map((x) => (
              <li key={x} className="rounded-xl bg-white px-4 py-3 card-shadow">✓ {x}</li>
            ))}
          </ul>
          <h2 className="mt-8 font-display text-2xl font-semibold text-pine-950">Popular nearby</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {services.slice(0, 4).map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
        <div className="card-shadow h-fit rounded-3xl border border-ink-900/[0.07] bg-white p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold text-pine-950">Get a quote in {l.name}</h2>
          <div className="mt-4"><QuoteForm /></div>
          <p className="mt-4 text-center text-sm">Also serving: {locations.filter((x) => x.slug !== slug).map((x) => x.name).join(" · ")}</p>
          <p className="mt-2 text-center text-sm"><Link href="/locations" className="font-bold text-pine-800">All areas →</Link></p>
        </div>
      </section>
    </>
  );
}
