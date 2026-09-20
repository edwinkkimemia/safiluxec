"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data";
import { Loader2, CalendarCheck } from "lucide-react";

export default function BookingForm({ defaultService = "" }: { defaultService?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customerName: "", phone: "", email: "", service: defaultService,
    date: "", time: "09:00", location: "", propertyType: "Apartment",
    frequency: "one-time", notes: "",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      router.push(`/thank-you?type=booking&ref=${data.referenceNumber}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setLoading(false); }
  }

  const input = "w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-pine-700 focus:ring-2 focus:ring-pine-700/15";
  const steps = ["Service", "Schedule", "Details"];

  return (
    <form onSubmit={submit} className="grid gap-5">
      <ol className="flex gap-2" aria-label="Booking steps">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2 rounded-xl bg-brand-600/[0.06] px-3 py-2.5 text-xs font-semibold text-pine-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[11px] text-white">{i + 1}</span> {s}
          </li>
        ))}
      </ol>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-[13px] font-semibold">1 · Select service *</label>
          <select required className={input} value={form.service} onChange={(e) => set("service", e.target.value)}>
            <option value="">Choose…</option>
            {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
          </select>
        </div>
        <div><label className="mb-1.5 block text-[13px] font-semibold">2 · Preferred date *</label><input required type="date" className={input} value={form.date} onChange={(e) => set("date", e.target.value)} /></div>
        <div><label className="mb-1.5 block text-[13px] font-semibold">Preferred time</label><input type="time" className={input} value={form.time} onChange={(e) => set("time", e.target.value)} /></div>
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">Frequency</label>
          <select className={input} value={form.frequency} onChange={(e) => set("frequency", e.target.value)}>
            {["one-time", "daily", "weekly", "bi-weekly", "monthly", "custom"].map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">Property type</label>
          <select className={input} value={form.propertyType} onChange={(e) => set("propertyType", e.target.value)}>
            {["Apartment", "House / Villa", "Office", "Commercial", "Airbnb", "Other"].map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-[13px] font-semibold">3 · Your name *</label><input required className={input} value={form.customerName} onChange={(e) => set("customerName", e.target.value)} placeholder="Full name" /></div>
        <div><label className="mb-1.5 block text-[13px] font-semibold">Phone *</label><input required className={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+254 ..." /></div>
        <div><label className="mb-1.5 block text-[13px] font-semibold">Email</label><input type="email" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" /></div>
        <div><label className="mb-1.5 block text-[13px] font-semibold">Location *</label><input required className={input} value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Estate, road, town" /></div>
      </div>
      <div><label className="mb-1.5 block text-[13px] font-semibold">Notes</label><textarea rows={3} className={input} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Access notes, priorities…" /></div>
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-60">
        {loading ? <><Loader2 size={17} className="animate-spin" /> Booking…</> : <><CalendarCheck size={17} /> Confirm Booking Request</>}
      </button>
    </form>
  );
}
