import { Phone, Mail, MapPin, Clock } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { baseMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/site";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = baseMetadata({ title: "Contact", description: "Call, WhatsApp or message Safiluxe Cleaning Solutions. Fast quotes across Nairobi, Kiambu and Thika.", path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to a real cleaning expert" copy="Quotes, bookings, commercial assessments — we reply within one business day." crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card-shadow h-fit rounded-3xl border border-ink-900/[0.07] bg-pine-950 p-7 text-white">
          <h2 className="font-display text-xl font-semibold">Direct lines</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3"><Phone size={17} className="text-gold-300" /><span><strong>Call:</strong><br /><a href={`tel:${siteConfig.phoneHref}`} className="text-lg font-bold hover:text-gold-200">{siteConfig.phone}</a></span></li>
            <li className="flex gap-3"><WhatsAppIcon size={17} className="mt-0.5 shrink-0 text-gold-300" /><span><strong>WhatsApp:</strong><br /><a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noreferrer" className="font-semibold text-gold-200 hover:text-gold-100">Chat now →</a></span></li>
            <li className="flex gap-3"><Mail size={17} className="text-gold-300" /><span>{siteConfig.email}</span></li>
            <li className="flex gap-3"><MapPin size={17} className="text-gold-300" /><span>{siteConfig.address}</span></li>
            <li className="flex gap-3"><Clock size={17} className="text-gold-300" /><span>{siteConfig.hours}</span></li>
          </ul>
        </div>
        <div className="card-shadow rounded-3xl border border-ink-900/[0.07] bg-white p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-pine-950">Send a message</h2>
          <div className="mt-4"><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
