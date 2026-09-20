import { NextRequest, NextResponse } from "next/server";
import { prisma, dbAvailable } from "@/lib/db";
import { verifyPassword, createSession, AUTH_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) return NextResponse.json({ error: "Email and password required." }, { status: 400 });

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@safiluxe.co.ke").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  // 1) DB user path
  if (await dbAvailable()) {
    try {
      const user = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
      if (user) {
        const ok = await verifyPassword(String(password), user.passwordHash);
        if (!ok) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
        const token = await createSession({ id: user.id, email: user.email, name: user.name });
        const res = NextResponse.json({ ok: true });
        res.cookies.set(AUTH_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
        return res;
      }
    } catch (e) { console.error("login db error", e); }
  }

  // 2) Env-admin fallback (works before DB seeding / demo mode)
  if (String(email).toLowerCase() === adminEmail && adminPassword && String(password) === adminPassword) {
    const token = await createSession({ id: "env-admin", email: adminEmail, name: "Safiluxe Admin" });
    const res = NextResponse.json({ ok: true, demo: !(await dbAvailable()) });
    res.cookies.set(AUTH_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return res;
  }

  return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
