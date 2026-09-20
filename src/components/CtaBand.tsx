import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { siteConfig, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6" aria-label="Call to action">
      <div className="relative overflow-hidden rounded-3xl bg-pine-950 px-6 py-12 sm:px-12">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pine-500/25 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Free quotes · Same-week slots</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Get a spotless space without the hassle.</h2>
            <p className="mt-3 max-w-xl text-[15px] text-white/70">Tell us what you need — we confirm your quote fast, arrive on time, and clean to a checklist. Residential & commercial across Nairobi and surrounds.</p>
            <p className="mt-3 text-[13px] font-bold text-gold-300">Fixed quote in writing · 24-hour re-clean guarantee · Pay after sign-off</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-bold text-pine-950 transition hover:bg-gold-400">
              <CalendarCheck size={17} /> Get a Free Quote
            </Link>
            <div className="grid grid-cols-2 gap-2.5">
              <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
              <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
