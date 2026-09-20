import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function BlogSidebar() {
  return (
    <aside className="grid gap-5 lg:sticky lg:top-24">
      <div className="card-shadow rounded-3xl border border-ink-900/[0.07] bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-pine-950">Our cleaning services</h2>
        <ul className="mt-3 divide-y divide-ink-900/[0.07]">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="group flex items-center justify-between gap-2 py-2 text-[13.5px] font-medium text-ink-700 transition hover:text-brand-700">
                {s.name}
                <ArrowRight size={14} className="shrink-0 text-ink-900/25 transition group-hover:translate-x-0.5 group-hover:text-brand-700" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl bg-pine-950 p-6 text-white">
        <h2 className="font-display text-lg font-semibold">Need this done for you?</h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">Fixed quote in writing, 24-hour re-clean guarantee. Nairobi, Kiambu & Thika.</p>
        <div className="mt-4 grid gap-2">
          <Link href="/quote" className="rounded-full bg-gold-500 px-4 py-2.5 text-center text-sm font-extrabold text-pine-950 hover:bg-gold-400">Get a Free Quote →</Link>
          <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">
            <WhatsAppIcon size={15} /> WhatsApp Us
          </a>
        </div>
      </div>
    </aside>
  );
}
