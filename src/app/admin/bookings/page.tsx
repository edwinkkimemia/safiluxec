"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const STATUSES = ["", "PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "RESCHEDULED"];

type Item = {
  id: string; referenceNumber: string; customerName: string; phone: string;
  serviceName?: string | null; date: string; time?: string | null; location: string;
  status: string; assignedTeam?: string | null; notes?: string | null;
};

export default function BookingsAdmin() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Item | null>(null);
  const [team, setTeam] = useState(""); const [notes, setNotes] = useState("");

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/bookings?${params}`);
    const data = await res.json();
    setItems(data.items || []); setLoading(false);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);
  useEffect(() => { setTeam(selected?.assignedTeam || ""); setNotes(selected?.notes || ""); }, [selected]);

  async function save(patch: Partial<Item> & { id: string }) {
    await fetch("/api/admin/bookings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-pine-950">Bookings</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-sm">
          {STATUSES.map((s) => <option key={s} value={s}>{s === "" ? "All statuses" : s}</option>)}
        </select>
        <button onClick={load} className="flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white"><Search size={14} /> Filter</button>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-x-auto rounded-2xl border border-ink-900/10 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead><tr className="border-b border-ink-900/10 text-xs uppercase tracking-wide text-ink-500">
              <th className="px-4 py-3">Ref</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Service</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th>
            </tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={5} className="px-4 py-6 text-ink-500">Loading…</td></tr> : items.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-ink-500">No bookings yet.</td></tr>
              ) : items.map((b) => (
                <tr key={b.id} onClick={() => setSelected(b)} className={`cursor-pointer border-b border-ink-900/[0.06] hover:bg-cream-100 ${selected?.id === b.id ? "bg-cream-100" : ""}`}>
                  <td className="px-4 py-3 font-mono text-xs">{b.referenceNumber}</td>
                  <td className="px-4 py-3 font-semibold">{b.customerName}<span className="block text-xs font-normal text-ink-500">{b.phone}</span></td>
                  <td className="px-4 py-3">{b.serviceName}</td>
                  <td className="px-4 py-3">{new Date(b.date).toLocaleDateString()}<span className="block text-xs text-ink-500">{b.time || ""}</span></td>
                  <td className="px-4 py-3"><span className="rounded-full bg-brand-600/[0.08] px-2.5 py-1 text-[11px] font-bold text-pine-900">{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-fit rounded-2xl border border-ink-900/10 bg-white p-5 lg:sticky lg:top-20">
          {!selected ? <p className="text-sm text-ink-500">Select a booking to assign a team, reschedule or update status.</p> : (
            <div className="grid gap-3 text-sm">
              <p className="font-display text-lg font-semibold text-pine-950">{selected.customerName}</p>
              <p className="text-xs text-ink-500">{selected.referenceNumber} · {selected.location}</p>
              <label className="font-semibold">Status
                <select value={selected.status} onChange={(e) => { const v = e.target.value; setSelected({ ...selected, status: v }); save({ id: selected.id, status: v }); }} className="mt-1 w-full rounded-xl border border-ink-900/15 px-3 py-2.5">
                  {STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
              <label className="font-semibold">Assigned team
                <input value={team} onChange={(e) => setTeam(e.target.value)} placeholder="e.g. Team A — Brian + Faith" className="mt-1 w-full rounded-xl border border-ink-900/15 px-3 py-2.5" />
              </label>
              <label className="font-semibold">Notes
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full rounded-xl border border-ink-900/15 px-3 py-2.5" />
              </label>
              <button onClick={() => { save({ id: selected.id, assignedTeam: team, notes }); setSelected({ ...selected, assignedTeam: team, notes }); }} className="rounded-full bg-brand-600 px-4 py-2.5 font-bold text-white">Save changes</button>
              <button onClick={() => { save({ id: selected.id, status: "COMPLETED" }); setSelected({ ...selected, status: "COMPLETED" }); }} className="rounded-full border border-pine-900/20 px-4 py-2.5 font-bold text-pine-900">Mark completed</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
