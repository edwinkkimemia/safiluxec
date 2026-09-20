"use client";

import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/site";

export default function WhatsAppFloat({ message = WHATSAPP_MESSAGES.general }: { message?: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-20 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition hover:scale-105 sm:right-6 lg:bottom-6"
      style={{ height: 52, width: 52 }}
    >
      <WhatsAppIcon size={26} />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-60" />
        <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-[#25D366]" />
      </span>
    </a>
  );
}
