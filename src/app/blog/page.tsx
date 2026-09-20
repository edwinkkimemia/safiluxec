import Image from "next/image";
import Link from "next/link";
import { baseMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/data";
import PageHero from "@/components/PageHero";
import BlogSidebar from "@/components/BlogSidebar";

export const metadata = baseMetadata({ title: "Blog", description: "Cleaning guides, care tips and hygiene advice from the Safiluxe team.", path: "/blog" });

export default function BlogIndex() {
  return (
    <>
      <PageHero eyebrow="Journal" title="Cleaning guides & care tips" copy="Practical advice for healthier homes and better-kept workplaces." crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-5 sm:grid-cols-2">
          {blogPosts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card-shadow group overflow-hidden rounded-2xl border border-ink-900/[0.07] bg-white transition hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden"><Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover transition group-hover:scale-105" loading="lazy" /></div>
              <div className="p-5">
                <span className="rounded-full bg-brand-600/[0.07] px-3 py-1 text-[11px] font-bold text-pine-800">{p.category}</span>
                <h2 className="mt-2 font-display text-lg leading-snug font-semibold text-pine-950">{p.title}</h2>
                <p className="mt-1.5 text-sm text-ink-500">{p.excerpt}</p>
                <span className="mt-3 inline-block text-sm font-bold text-pine-800">Read article →</span>
              </div>
            </Link>
          ))}
        </div>
        <BlogSidebar />
        </div>
      </section>
    </>
  );
}
