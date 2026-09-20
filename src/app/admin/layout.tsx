import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Inbox, CalendarCheck, Layers, Image as ImageIcon, Star, MapPin, FileText, Mail } from "lucide-react";
import { verifySession, AUTH_COOKIE } from "@/lib/auth";
import LogoutClient from "./logout-button";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/content?tab=services", label: "Services", icon: Layers },
  { href: "/admin/content?tab=gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/content?tab=testimonials", label: "Reviews", icon: Star },
  { href: "/admin/content?tab=posts", label: "Blog", icon: FileText },
  { href: "/admin/content?tab=areas", label: "Areas", icon: MapPin },
  { href: "/admin/content?tab=messages", label: "Messages", icon: Mail },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // login page has its own minimal shell
  return <AdminShell>{children}</AdminShell>;
}

async function AdminShell({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  // Allow login page through without session (middleware already gates others)
  // If no session here, still render children — login page will show.
  return (
    <div className="flex min-h-screen bg-cream-100">
      {session && (
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-pine-950 p-4 text-white/80 lg:flex">
          <Link href="/admin" className="block rounded-2xl px-2 py-3" aria-label="Safiluxe admin">
            <span className="inline-block overflow-hidden rounded-lg bg-white px-2 py-1">
              <Image src="/logo2.png" alt="SafiLuxe Cleaning Solutions" width={754} height={277} className="h-9 w-auto" />
            </span>
            <span className="mt-1 block truncate px-1 text-[11px] text-white/55">{session.email}</span>
          </Link>
          <nav className="mt-4 grid gap-1" aria-label="Admin">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition hover:bg-white/10 hover:text-white">
                <n.icon size={17} className="text-gold-300" /> {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid gap-2">
            <Link href="/" className="rounded-xl border border-white/15 px-3.5 py-2.5 text-center text-sm hover:bg-white/10">← View website</Link>
            <LogoutClient />
          </div>
        </aside>
      )}
      <div className="min-w-0 flex-1">
        {session && (
          <div className="sticky top-0 z-30 flex items-center gap-2 overflow-x-auto border-b border-ink-900/10 bg-cream-50/95 p-3 backdrop-blur lg:hidden">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-600/[0.07] px-3.5 py-2 text-xs font-bold text-pine-900">
                <n.icon size={13} /> {n.label}
              </Link>
            ))}
          </div>
        )}
        <div className="p-4 sm:p-7">{children}</div>
      </div>
    </div>
  );
}
