"use client";
import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const input = "w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-pine-700 focus:ring-2 focus:ring-pine-700/15";

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Failed to send");
      setDone(true);
    } catch { setError("Could not send message. Please WhatsApp or call us directly."); }
    finally { setLoading(false); }
  }

  if (done) return <div className="rounded-2xl bg-brand-600 p-8 text-center text-white"><Send size={28} className="mx-auto text-gold-300" /><h3 className="mt-3 font-display text-2xl font-semibold">Message received</h3><p className="mt-2 text-sm text-white/70">Thank you — we will get back to you shortly.</p></div>;

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input required placeholder="Full name *" className={input} value={form.name} onChange={(e) => set("name", e.target.value)} />
        <input placeholder="Phone" className={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input type="email" placeholder="Email" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} />
        <input placeholder="Subject" className={input} value={form.subject} onChange={(e) => set("subject", e.target.value)} />
      </div>
      <textarea required rows={5} placeholder="How can we help? *" className={input} value={form.message} onChange={(e) => set("message", e.target.value)} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-60">
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} Send Message
      </button>
    </form>
  );
}
