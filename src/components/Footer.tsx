import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Zap } from "lucide-react";
import { socials } from "./SocialIcons";
import WhatsAppIcon from "./WhatsAppIcon";
import { siteConfig, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/site";
import { services, locations } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-white/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="Safiluxe home" className="inline-block overflow-hidden rounded-xl bg-white px-3 py-2">
            <Image src="/logo2.png" alt="SafiLuxe Cleaning Solutions" width={754} height={277} className="h-11 w-auto" loading="lazy" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Premium residential & commercial cleaning across Kenya. Trained teams, honest quotes, and exceptional attention to detail.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Safiluxe on ${label}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-gold-500 hover:text-pine-950">
                <Icon size={15} />
              </a>
            ))}
          </div>
          <p className="mt-3 text-[13px] font-semibold text-white/60">Follow us @safiluxecleaners</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/residential" className="hover:text-white">Residential Cleaning</Link></li>
            <li><Link href="/commercial" className="hover:text-white">Commercial Cleaning</Link></li>
            <li><Link href="/gallery" className="hover:text-white">Before & After</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
            {locations.slice(0, 4).map((l) => (
              <li key={l.slug}><Link href={`/locations/${l.slug}`} className="hover:text-white">Cleaning in {l.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0 text-gold-300" /><a href={`tel:${siteConfig.phoneHref}`} className="hover:text-white">{siteConfig.phone}</a></li>
            <li className="flex gap-2.5"><WhatsAppIcon size={16} className="mt-0.5 shrink-0 text-gold-300" /><a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp Us</a></li>
            <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0 text-gold-300" /><a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a></li>
            <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-gold-300" />{siteConfig.address}</li>
            <li className="flex gap-2.5"><Clock size={16} className="mt-0.5 shrink-0 text-gold-300" />{siteConfig.hours}</li>
            <li className="flex gap-2.5"><Zap size={16} className="mt-0.5 shrink-0 text-gold-300" /><span>Need same-day? <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noreferrer" className="font-bold text-gold-200 hover:text-gold-100">Ask on WhatsApp</a> — if a crew is free, it&apos;s yours.</span></li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/quote" className="rounded-full bg-gold-500 px-4 py-2 text-[13px] font-semibold text-pine-950 hover:bg-gold-400">Get a Free Quote</Link>
            <Link href="/book" className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white hover:bg-white/10">Book Cleaning</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/55 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="flex gap-4"><Link href="/privacy" className="hover:text-white">Privacy Policy</Link><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></p>
        </div>
      </div>
    </footer>
  );
}
