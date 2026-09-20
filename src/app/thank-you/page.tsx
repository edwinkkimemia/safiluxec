import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { siteConfig, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/site";

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ type?: string; ref?: string }> }) {
  const { type, ref } = await searchParams;
  const isBooking = type === "booking";
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-600"><CheckCircle2 size={30} className="text-gold-300" /></span>
      <h1 className="mt-5 font-display text-3xl font-semibold text-pine-950 sm:text-4xl">
        {isBooking ? "Booking request received" : "Quote request received"}
      </h1>
      <p className="mt-3 text-[15px] text-ink-500">Thank you — our team will contact you shortly to confirm details and pricing.</p>
      {ref && (
        <p className="mx-auto mt-5 w-fit rounded-full bg-brand-600/[0.07] px-5 py-2.5 text-sm font-bold text-pine-900">
          Reference: {ref}
        </p>
      )}
      <p className="mt-3 text-xs text-ink-500">Please save this reference for follow-ups.</p>
      <p className="mt-2 text-[13px] font-semibold text-ink-700">In a hurry? Continue on WhatsApp now for priority response.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a href={whatsappLink(WHATSAPP_MESSAGES.quote)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white"><WhatsAppIcon size={16} /> Continue on WhatsApp</a>
        <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex items-center gap-2 rounded-full border border-pine-900/20 px-6 py-3 text-sm font-bold text-pine-900"><Phone size={16} /> Call Safiluxe</a>
      </div>
      <p className="mt-6 text-sm"><Link href="/" className="font-bold text-pine-800">← Back to homepage</Link></p>
    </section>
  );
}
