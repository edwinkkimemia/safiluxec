"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data";
import { Loader2, CheckCircle2 } from "lucide-react";

const frequencies = ["one-time", "daily", "weekly", "bi-weekly", "monthly", "custom"];

export default function QuoteForm({ defaultService = "" }: { defaultService?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", service: defaultService,
    propertyType: "Apartment", location: "", rooms: "", propertySize: "",
    preferredDate: "", frequency: "one-time", message: "",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      router.push(`/thank-you?type=quote&ref=${data.referenceNumber}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setLoading(false); }
  }

  const input = "w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/60 outline-none transition focus:border-pine-700 focus:ring-2 focus:ring-pine-700/15";

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-[13px] font-semibold">Full name *</label><input required className={input} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Jane Mwangi" /></div>
        <div><label className="mb-1.5 block text-[13px] font-semibold">Phone *</label><input required className={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+254 ..." /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-[13px] font-semibold">Email</label><input type="email" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" /></div>
        <div><label className="mb-1.5 block text-[13px] font-semibold">Location *</label><input required className={input} value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Kilimani, Nairobi" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">Cleaning service *</label>
          <select required className={input} value={form.service} onChange={(e) => set("service", e.target.value)}>
            <option value="">Select a service…</option>
            {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">Property type</label>
          <select className={input} value={form.propertyType} onChange={(e) => set("propertyType", e.target.value)}>
            {["Apartment", "House / Villa", "Office", "Shop / Retail", "Restaurant", "Clinic / Hospital", "School / Institution", "Warehouse", "Hotel / Airbnb", "Event Venue", "Other"].map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><label className="mb-1.5 block text-[13px] font-semibold">Rooms / offices</label><input className={input} value={form.rooms} onChange={(e) => set("rooms", e.target.value)} placeholder="e.g. 3 bed, 2 bath" /></div>
        <div><label className="mb-1.5 block text-[13px] font-semibold">Approx. size</label><input className={input} value={form.propertySize} onChange={(e) => set("propertySize", e.target.value)} placeholder="e.g. 120 sqm" /></div>
        <div><label className="mb-1.5 block text-[13px] font-semibold">Preferred date</label><input type="date" className={input} value={form.preferredDate} onChange={(e) => set("preferredDate", e.target.value)} /></div>
      </div>
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold">Frequency</label>
        <div className="flex flex-wrap gap-2">
          {frequencies.map((f) => (
            <button type="button" key={f} onClick={() => set("frequency", f)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold capitalize transition ${form.frequency === f ? "bg-brand-600 text-white" : "bg-brand-600/[0.07] text-pine-900 hover:bg-brand-600/[0.12]"}`}>{f}</button>
          ))}
        </div>
      </div>
      <div><label className="mb-1.5 block text-[13px] font-semibold">Additional details</label><textarea rows={4} className={input} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us about stains, access, parking, pets, priorities…" /></div>
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-60">
        {loading ? <><Loader2 size={17} className="animate-spin" /> Sending…</> : <><CheckCircle2 size={17} /> Request My Free Quote</>}
      </button>
      <p className="text-center text-xs text-ink-500">No obligation. We respond within one business day — usually much faster.</p>
    </form>
  );
}
