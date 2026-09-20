import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CtaBand from "@/components/CtaBand";

export const metadata = baseMetadata({ title: "Gallery — Before & After", description: "See Safiluxe results: carpet, sofa, kitchen, office, bathroom, post-construction and residential transformations.", path: "/gallery" });

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Proof of work" title="Before & after gallery" copy="A sample of recent finishes. Every job ends with a walkthrough — we only leave when it looks like this." crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><GalleryGrid /></section>
      <div className="pb-16"><CtaBand /></div>
    </>
  );
}
