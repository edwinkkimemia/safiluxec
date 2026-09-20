import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <p className="font-display text-6xl font-semibold text-pine-900/20">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-pine-950">This page is spotless… too spotless.</h1>
      <p className="mt-3 text-ink-500">We could not find what you were looking for. Try services, a quote, or the homepage.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white">Homepage</Link>
        <Link href="/quote" className="rounded-full border border-pine-900/20 px-6 py-3 text-sm font-bold text-pine-900">Get a Quote</Link>
      </div>
    </section>
  );
}
