"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig, whatsappLink, WHATSAPP_MESSAGES } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function StickyCtaBar() {
  return (
    <>
      {/* spacer so the bar never covers footer content on mobile */}
      <div className="h-[68px] lg:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-pine-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <div className="grid grid-cols-3 divide-x divide-white/10">
          <a href={`tel:${siteConfig.phoneHref}`} className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold text-white" aria-label="Call Safiluxe now">
            <Phone size={19} className="text-gold-300" /> Call Now
          </a>
          <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold text-white" aria-label="Chat on WhatsApp">
            <WhatsAppIcon size={19} className="text-[#25D366]" /> WhatsApp
          </a>
          <Link href="/quote" className="flex flex-col items-center justify-center gap-0.5 bg-gold-500 py-2.5 text-[11px] font-extrabold text-pine-950" aria-label="Get a free quote">
            <span className="text-[13px] leading-none">Free Quote →</span>
          </Link>
        </div>
      </div>
    </>
  );
}
