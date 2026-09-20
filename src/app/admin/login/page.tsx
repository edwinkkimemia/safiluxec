"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push(next); router.refresh();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Login failed"); }
    finally { setLoading(false); }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <form onSubmit={submit} className="card-shadow w-full max-w-md rounded-3xl border border-ink-900/[0.07] bg-white p-8">
        <Image src="/fav.png" alt="SafiLuxe" width={237} height={276} className="mx-auto h-14 w-auto" priority />
        <h1 className="mt-4 text-center font-display text-2xl font-semibold text-pine-950">Admin sign in</h1>
        <p className="mt-1 text-center text-sm text-ink-500">Safiluxe Cleaning Solutions · staff only</p>
        <label className="mt-6 mb-1.5 block text-[13px] font-semibold">Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@safiluxe.co.ke" className="w-full rounded-xl border border-ink-900/15 px-4 py-3 text-sm outline-none focus:border-pine-700 focus:ring-2 focus:ring-pine-700/15" />
        <label className="mt-4 mb-1.5 block text-[13px] font-semibold">Password</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-ink-900/15 px-4 py-3 text-sm outline-none focus:border-pine-700 focus:ring-2 focus:ring-pine-700/15" />
        {error && <p className="mt-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : null} Sign in
        </button>
      </form>
    </div>
  );
}

export default function AdminLogin() {
  return <Suspense><LoginForm /></Suspense>;
}
