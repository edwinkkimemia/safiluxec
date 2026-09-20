"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Trash2, Pencil } from "lucide-react";

const TABS = [
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Reviews" },
  { id: "posts", label: "Blog" },
  { id: "areas", label: "Areas" },
  { id: "messages", label: "Messages" },
];

function ContentInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState(params.get("tab") || "services");
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [json, setJson] = useState("");

  async function load(t = tab) {
    setLoading(true);
    const res = await fetch(`/api/admin/content?model=${t}`);
    const data = await res.json();
    setItems(data.items || []); setLoading(false);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [tab]);

  function startCreate() { setEditing({}); setJson("{\n  \n}"); }
  function startEdit(it: Record<string, unknown>) { setEditing(it); setJson(JSON.stringify(it, null, 2)); }

  async function save() {
    let data: Record<string, unknown>;
    try { data = JSON.parse(json); } catch { alert("Invalid JSON"); return; }
    const isNew = !editing?.id;
    const method = isNew ? "POST" : "PATCH";
    const res = await fetch("/api/admin/content", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(isNew ? { model: tab, data } : { model: tab, id: editing?.id, data }) });
    if (!res.ok) { alert("Save failed — check required fields."); return; }
    setEditing(null); load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/content?model=${tab}&id=${id}`, { method: "DELETE" });
    load();
  }

  const hints: Record<string, string> = {
    services: 'Required: name, slug, shortDescription, description. Optional: featuredImage, priceHint, active, featured, seoTitle, seoDescription, features[]',
    gallery: 'Required: image (URL). Optional: category, caption, beforeImage, afterImage, published, sortOrder',
    testimonials: 'Required: customerName, review. Optional: rating (1-5), location, service, image, featured, published',
    posts: 'Required: title, slug, content. Optional: excerpt, featuredImage, status (DRAFT/PUBLISHED), category, seoTitle, seoDescription, publishedAt',
    areas: 'Required: name, slug. Optional: description, active, featured, seoTitle, seoDescription',
    messages: 'Read-only contact messages.',
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-pine-950">Content management</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => { setTab(t.id); setEditing(null); }} className={`rounded-full px-4 py-2 text-[13px] font-bold ${tab === t.id ? "bg-brand-600 text-white" : "bg-brand-600/[0.07] text-pine-900"}`}>{t.label}</button>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-ink-500">{hints[tab]}</p>

      <div className="mt-4 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
          <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-3">
            <p className="text-sm font-bold">{items.length} item(s)</p>
            {tab !== "messages" && <button onClick={startCreate} className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-bold text-white"><Plus size={13} /> New</button>}
          </div>
          {loading ? <p className="p-6 text-sm text-ink-500">Loading…</p> : items.length === 0 ? (
            <p className="p-8 text-center text-sm text-ink-500">Nothing here yet. {tab !== "messages" ? "Create your first item →" : "Contact messages will appear here."}</p>
          ) : (
            <ul className="max-h-[560px] divide-y divide-ink-900/10 overflow-auto">
              {items.map((it) => {
                const r = it as Record<string, string>;
                const title = (r.name || r.title || r.customerName || r.caption || r.image || r.id || "item") as string;
                return (
                  <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-3">
                    <span className="min-w-0"><span className="block truncate text-sm font-semibold text-pine-950">{String(title).slice(0, 80)}</span>
                      <span className="block truncate font-mono text-[11px] text-ink-500">{String(r.slug || r.category || r.status || r.id || "").slice(0, 80)}</span></span>
                    <span className="flex shrink-0 gap-1.5">
                      <button onClick={() => startEdit(it)} className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600/[0.07] hover:bg-brand-600 hover:text-white" aria-label="Edit"><Pencil size={14} /></button>
                      {tab !== "messages" && <button onClick={() => remove(r.id)} className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white" aria-label="Delete"><Trash2 size={14} /></button>}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="h-fit rounded-2xl border border-ink-900/10 bg-white p-5 lg:sticky lg:top-20">
          {!editing ? <p className="text-sm text-ink-500">Select an item to edit, or create new. Fields are edited as JSON for full control (images as URLs).</p> : (
            <div>
              <p className="text-sm font-bold text-pine-950">{(editing as Record<string, string>).id ? "Edit item" : "New item"}</p>
              <textarea value={json} onChange={(e) => setJson(e.target.value)} rows={16} spellCheck={false} className="mt-3 w-full rounded-xl border border-ink-900/15 bg-ink-900/[0.03] p-3 font-mono text-xs" />
              <div className="mt-3 flex gap-2">
                <button onClick={save} className="flex-1 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-bold text-white">Save</button>
                <button onClick={() => setEditing(null)} className="rounded-full border border-ink-900/15 px-4 py-2.5 text-sm font-bold">Cancel</button>
              </div>
            </div>
          )}
          <div className="mt-4 rounded-xl bg-cream-100 p-3 text-xs text-ink-500">
            Image uploads: paste an image URL (Unsplash / Cloudinary). For production, connect Cloudinary or Vercel Blob and paste the returned URL here.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContentAdmin() {
  return <Suspense fallback={<p className="text-sm text-ink-500">Loading…</p>}><ContentInner /></Suspense>;
}
