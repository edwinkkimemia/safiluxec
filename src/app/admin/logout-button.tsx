"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button type="button" onClick={logout} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white/15">
      <LogOut size={15} /> Sign out
    </button>
  );
}
