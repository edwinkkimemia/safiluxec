"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { siteConfig, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/residential", label: "Residential" },
  { href: "/commercial", label: "Commercial" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-pine-950 text-white/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6">
          <p className="truncate">{siteConfig.hours}</p>
          <div className="hidden items-center gap-4 sm:flex">
            <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone size={13} /> {siteConfig.phone}
            </a>
            <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
              <WhatsAppIcon size={13} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b bg-cream-50/90 backdrop-blur-md transition-shadow ${scrolled ? "border-ink-900/10 shadow-[0_8px_30px_-12px_rgba(14,59,51,0.25)]" : "border-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center" aria-label="Safiluxe home">
            <Image src="/logo.png" alt="SafiLuxe Cleaning Solutions" width={928} height={300} className="h-9 w-auto sm:h-10" priority />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-full px-3 py-2 text-[13.5px] font-medium text-ink-700 transition hover:bg-brand-600/[0.06] hover:text-pine-900">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex items-center gap-2 rounded-full border border-pine-900/15 px-4 py-2.5 text-sm font-semibold text-pine-900 transition hover:border-pine-900/30">
              <Phone size={15} /> Call
            </a>
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">
              Get a Free Quote
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-900/10 lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-ink-900/10 bg-cream-50 px-4 pt-2 pb-5 lg:hidden" aria-label="Mobile">
            <div className="grid gap-1">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-brand-600/[0.06]">
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-pine-900/20 px-4 py-3 text-sm font-semibold text-pine-900">
                  <Phone size={15} /> Call
                </a>
                <Link href="/quote" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white">
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
