"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, CalendarCheck, CheckCircle2, Clock, TrendingUp, AlertCircle } from "lucide-react";

type Stats = {
  newEnquiries: number; totalEnquiries: number; pendingQuotations: number;
  confirmedBookings: number; completedJobs: number; monthlyEnquiries: number;
  mostRequested: { service: string; count: number }[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then((d) => {
      setStats(d.stats || null); setDemo(!!d.demo);
    }).catch(() => {});
  }, []);

  const cards = stats ? [
    { icon: Inbox, label: "New enquiries", value: stats.newEnquiries, href: "/admin/enquiries?status=NEW" },
    { icon: TrendingUp, label: "Total enquiries", value: stats.totalEnquiries, href: "/admin/enquiries" },
    { icon: Clock, label: "Pending quotations", value: stats.pendingQuotations, href: "/admin/enquiries" },
    { icon: CalendarCheck, label: "Confirmed bookings", value: stats.confirmedBookings, href: "/admin/bookings?status=CONFIRMED" },
    { icon: CheckCircle2, label: "Completed jobs", value: stats.completedJobs, href: "/admin/bookings?status=COMPLETED" },
    { icon: TrendingUp, label: "This month", value: stats.monthlyEnquiries, href: "/admin/enquiries" },
  ] : [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-pine-950 sm:text-3xl">Dashboard</h1>
          <p className="text-sm text-ink-500">Welcome back — here is what needs attention.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/enquiries" className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white">View enquiries</Link>
          <Link href="/quote" target="_blank" className="rounded-full border border-pine-900/20 px-5 py-2.5 text-sm font-bold text-pine-900">View form</Link>
        </div>
      </div>

      {demo && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <AlertCircle size={17} className="mt-0.5 shrink-0" />
          Database not connected — showing demo shell. Set DATABASE_URL and run migrations to see live enquiries.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats ? cards.map((c) => (
          <Link key={c.label} href={c.href} className="card-shadow rounded-2xl border border-ink-900/[0.07] bg-white p-5 transition hover:-translate-y-0.5">
            <c.icon size={20} className="text-pine-700" />
            <p className="mt-3 font-display text-3xl font-semibold text-pine-950">{c.value}</p>
            <p className="text-sm text-ink-500">{c.label}</p>
          </Link>
        )) : (
          [1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-32 animate-pulse rounded-2xl bg-ink-900/[0.06]" />)
        )}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card-shadow rounded-2xl border border-ink-900/[0.07] bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-pine-950">Most requested services</h2>
          {!stats ? <div className="mt-3 h-24 animate-pulse rounded-xl bg-ink-900/[0.06]" /> :
            stats.mostRequested.length === 0 ? <p className="mt-3 text-sm text-ink-500">No data yet — new quote requests will appear here.</p> :
            <ul className="mt-3 space-y-2">
              {stats.mostRequested.map((m) => (
                <li key={m.service} className="flex items-center justify-between rounded-xl bg-cream-100 px-4 py-2.5 text-sm">
                  <span className="font-medium">{m.service}</span><span className="font-bold text-pine-900">{m.count}</span>
                </li>
              ))}
            </ul>}
        </div>
        <div className="rounded-2xl bg-pine-950 p-5 text-white">
          <h2 className="font-display text-lg font-semibold">Quick actions</h2>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/admin/enquiries?status=NEW" className="rounded-xl bg-white/10 px-4 py-3 hover:bg-white/15">→ Follow up new enquiries</Link>
            <Link href="/admin/bookings" className="rounded-xl bg-white/10 px-4 py-3 hover:bg-white/15">→ Confirm this week&apos;s bookings</Link>
            <Link href="/admin/content?tab=testimonials" className="rounded-xl bg-white/10 px-4 py-3 hover:bg-white/15">→ Add a fresh review</Link>
            <Link href="/admin/content?tab=gallery" className="rounded-xl bg-white/10 px-4 py-3 hover:bg-white/15">→ Upload before & after photos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
