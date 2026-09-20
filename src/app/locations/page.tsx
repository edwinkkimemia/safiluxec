import Link from "next/link";
import { baseMetadata } from "@/lib/seo";
import { locations } from "@/lib/data";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export const metadata = baseMetadata({ title: "Service Areas", description: "Safiluxe cleans across Nairobi, Kiambu, Thika, Kajiado and Machakos. Find your area and get a fast local quote.", path: "/locations" });

export default function LocationsPage() {
  return (
    <>
      <PageHero eyebrow="Coverage" title="Areas we serve" copy="Headquartered in Nairobi with crews across the metro. Don't see your town? Ask — we travel for commercial contracts." crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l) => (
            <Link key={l.slug} href={`/locations/${l.slug}`} className="card-shadow rounded-2xl border border-ink-900/[0.07] bg-white p-6 transition hover:-translate-y-1">
              <h2 className="font-display text-xl font-semibold text-pine-950">{l.name}</h2>
              <p className="mt-2 text-sm text-ink-500">{l.description}</p>
              <span className="mt-4 inline-block text-sm font-bold text-pine-800">Cleaning in {l.name} →</span>
            </Link>
          ))}
        </div>
      </section>
      <div className="pb-16"><CtaBand /></div>
    </>
  );
}
