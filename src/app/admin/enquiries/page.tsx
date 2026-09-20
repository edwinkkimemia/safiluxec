"use client";
import { useEffect, useState } from "react";
import { Search, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const STATUSES = ["", "NEW", "CONTACTED", "SITE_VISIT_SCHEDULED", "QUOTE_SENT", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "ARCHIVED"];

type Item = {
  id: string; referenceNumber: string; fullName: string; phone: string; email?: string | null;
  serviceName?: string | null; location: string; frequency: string; status: string;
  message?: string | null; notes?: string | null; createdAt: string; preferredDate?: string | null;
};

export default function EnquiriesAdmin() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(""); const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Item | null>(null);
  const [note, setNote] = useState("");

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/enquiries?${params}`);
    const data = await res.json();
    setItems(data.items || []); setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);
  useEffect(() => { setNote(selected?.notes || ""); }, [selected]);

  async function updateStatus(id: string, newStatus: string) {
    await fetch("/api/admin/enquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: newStatus, notes: note }) });
    setSelected((s) => (s ? { ...s, status: newStatus, notes: note } : s));
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-pine-950">Enquiries</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="flex min-w-52 flex-1 items-center gap-2 rounded-full border border-ink-900/15 bg-white px-4 py-2.5">
          <Search size={15} className="text-ink-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && load()} placeholder="Search name, phone, ref…" className="w-full bg-transparent text-sm outline-none" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-sm">
          {STATUSES.map((s) => <option key={s} value={s}>{s === "" ? "All statuses" : s.replaceAll("_", " ")}</option>)}
        </select>
        <button onClick={load} className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white">Filter</button>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
          {loading ? <p className="p-6 text-sm text-ink-500">Loading…</p> : items.length === 0 ? (
            <div className="p-10 text-center"><p className="font-display text-lg text-pine-950">No enquiries found</p><p className="mt-1 text-sm text-ink-500">New website quote requests will appear here.</p></div>
          ) : (
            <ul className="divide-y divide-ink-900/10">
              {items.map((it) => (
                <li key={it.id}>
                  <button onClick={() => setSelected(it)} className={`flex w-full flex-col gap-1 px-5 py-4 text-left transition hover:bg-cream-100 ${selected?.id === it.id ? "bg-cream-100" : ""}`}>
                    <span className="flex items-center justify-between gap-2">
                      <strong className="text-sm text-pine-950">{it.fullName} · {it.serviceName || "General"}</strong>
                      <span className="rounded-full bg-brand-600/[0.08] px-2.5 py-1 text-[11px] font-bold text-pine-900">{it.status.replaceAll("_", " ")}</span>
                    </span>
                    <span className="text-xs text-ink-500">{it.referenceNumber} · {it.location} · {new Date(it.createdAt).toLocaleString()}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="h-fit rounded-2xl border border-ink-900/10 bg-white p-5 lg:sticky lg:top-20">
          {!selected ? <p className="text-sm text-ink-500">Select an enquiry to view details, update status and add notes.</p> : (
            <div>
              <p className="font-display text-lg font-semibold text-pine-950">{selected.fullName}</p>
              <p className="text-xs text-ink-500">{selected.referenceNumber} · {new Date(selected.createdAt).toLocaleString()}</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-ink-500">Phone</dt><dd className="font-semibold">{selected.phone}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-ink-500">Service</dt><dd className="font-semibold">{selected.serviceName}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-ink-500">Location</dt><dd className="font-semibold">{selected.location}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-ink-500">Frequency</dt><dd className="font-semibold">{selected.frequency}</dd></div>
                {selected.message && <div><dt className="text-ink-500">Details</dt><dd className="mt-1 rounded-xl bg-cream-100 p-3">{selected.message}</dd></div>}
              </dl>
              <div className="mt-3 flex gap-2">
                <a href={`tel:${selected.phone}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-pine-900/20 px-3 py-2.5 text-[13px] font-bold text-pine-900"><Phone size={14} /> Call</a>
                <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${selected.fullName}, this is Safiluxe Cleaning Solutions regarding enquiry ${selected.referenceNumber}.`)}`} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2.5 text-[13px] font-bold text-white"><WhatsAppIcon size={14} /> WhatsApp</a>
              </div>
              <label className="mt-4 mb-1.5 block text-[13px] font-semibold">Update status</label>
              <select value={selected.status} onChange={(e) => updateStatus(selected.id, e.target.value)} className="w-full rounded-xl border border-ink-900/15 px-3 py-2.5 text-sm">
                {STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{s.replaceAll("_", " ")}</option>)}
              </select>
              <label className="mt-3 mb-1.5 block text-[13px] font-semibold">Internal notes</label>
              <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Called, site visit Thursday…" className="w-full rounded-xl border border-ink-900/15 px-3 py-2.5 text-sm" />
              <button onClick={() => updateStatus(selected.id, selected.status)} className="mt-2 w-full rounded-full bg-brand-600 px-4 py-2.5 text-sm font-bold text-white">Save notes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
