import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import BlogSidebar from "@/components/BlogSidebar";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) return {};
  return baseMetadata({ title: p.title, description: p.excerpt, path: `/blog/${slug}`, image: p.image });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = blogPosts.filter((x) => x.slug !== slug).slice(0, 2);
  const jsonLd = { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.excerpt, image: p.image, author: { "@type": "Organization", name: "Safiluxe Cleaning Solutions" } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={p.category} title={p.title} copy={p.excerpt} crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: p.title }]} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_320px]">
      <article className="min-w-0">
        <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96"><Image src={p.image} alt={p.title} fill sizes="100vw" className="object-cover" /></div>
        <div className="prose mt-8 max-w-none">
          <p className="text-[16.5px] leading-relaxed text-ink-700">{p.content}</p>
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink-700">Want it handled for you? Safiluxe crews serve Nairobi, Kiambu and Thika with honest fixed quotes and supervisor-checked finishes. <Link href="/quote" className="font-bold text-pine-800 underline">Get a free quote →</Link></p>
        </div>
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl font-semibold text-pine-950">Keep reading</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="rounded-2xl border border-ink-900/10 bg-white p-5 card-shadow">
                  <p className="text-xs font-bold text-pine-700">{r.category}</p>
                  <p className="mt-1 font-display font-semibold text-pine-950">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
          <BlogSidebar />
        </div>
      </div>
      <div className="pb-16"><CtaBand /></div>
    </>
  );
}
