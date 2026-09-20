import Link from "next/link";
import { BadgeCheck, FileCheck2, RefreshCcw, Wallet } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  { icon: FileCheck2, title: "Fixed Quote in Writing", copy: "Agreed before we start. No surprise add-ons at your door." },
  { icon: RefreshCcw, title: "24-Hour Re-Clean Guarantee", copy: "Spot something we missed? We return and fix it free." },
  { icon: BadgeCheck, title: "Vetted, Supervised Crews", copy: "Background-checked pros with a supervisor on every job." },
  { icon: Wallet, title: "Pay After You're Satisfied", copy: "Walkthrough sign-off first — then M-Pesa or bank." },
];

export default function GuaranteeBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6" aria-label="Safiluxe guarantee">
      <Reveal>
        <div className="card-shadow relative overflow-hidden rounded-3xl border border-gold-500/40 bg-white px-6 py-8 sm:px-10">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 via-gold-500 to-brand-600" />
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">Zero-risk booking</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-pine-950 sm:text-3xl">Book with total confidence.</h2>
            </div>
            <Link href="/quote" className="rounded-full bg-gold-500 px-6 py-3 text-sm font-extrabold text-pine-950 transition hover:bg-gold-400">
              Claim Your Free Quote →
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((g) => (
              <div key={g.title} className="rounded-2xl bg-cream-100 p-4">
                <g.icon size={22} className="text-brand-700" />
                <p className="mt-2 text-sm font-bold text-pine-950">{g.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{g.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-[13px] font-semibold text-ink-500">
            Weekend slots fill by Thursday most weeks — <Link href="/book" className="font-bold text-brand-700 underline">reserve yours now</Link>.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
