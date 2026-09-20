import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { ShieldCheck, Clock, BadgeCheck } from "lucide-react";

export const metadata = baseMetadata({ title: "Get a Free Quote", description: "Request a fast, transparent cleaning quote. Homes, offices & commercial spaces across Nairobi, Kiambu & Thika.", path: "/quote" });

export default function QuotePage() {
  return (
    <>
      <PageHero eyebrow="Free quotes" title="Get your free quote" copy="Two minutes now, spotless later. Share a few details — we confirm pricing fast, with no obligation." crumbs={[{ label: "Home", href: "/" }, { label: "Get a Quote" }]} />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="card-shadow rounded-3xl border border-ink-900/[0.07] bg-pine-950 p-7 text-white">
            <h2 className="font-display text-xl font-semibold">Why quote with Safiluxe?</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                [ShieldCheck, "Fixed, transparent pricing — agreed before we start"],
                [Clock, "Response within one business day, usually hours"],
                [BadgeCheck, "Free site visits for commercial & post-construction"],
              ].map(([Icon, t], i) => {
                const I = Icon as typeof ShieldCheck;
                return <li key={i} className="flex gap-2.5"><I size={18} className="mt-0.5 shrink-0 text-gold-300" />{t as string}</li>;
              })}
            </ul>
            <div className="mt-4 rounded-2xl bg-gold-500 p-4 text-pine-950">
              <p className="text-sm font-extrabold">Weekend slots fill by Thursday.</p>
              <p className="mt-1 text-[13px] leading-relaxed">Send your request today — quotes confirmed in hours, not days. Average turnaround: under 4 business hours.</p>
            </div>
            <div className="mt-4 rounded-2xl bg-white/[0.07] p-4 text-[13px] text-white/75">
              Tip: attach-style details help — rooms, size, photos on WhatsApp and preferred date get you the fastest accurate quote.
            </div>
          </div>
        </div>
        <div className="card-shadow rounded-3xl border border-ink-900/[0.07] bg-white p-6 sm:p-8">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
