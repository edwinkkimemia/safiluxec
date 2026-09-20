import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, AUTH_COOKIE } from "@/lib/auth";
import { prisma, dbAvailable } from "@/lib/db";

async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await dbAvailable())) return NextResponse.json({ items: [], total: 0, demo: true });
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const q = searchParams.get("q");
  const where: Record<string, unknown> = {};
  if (status) (where as Record<string, string>).status = status;
  if (q) (where as Record<string, unknown>).OR = [
    { customerName: { contains: q, mode: "insensitive" } },
    { phone: { contains: q, mode: "insensitive" } },
    { referenceNumber: { contains: q, mode: "insensitive" } },
  ];
  const [total, items] = await Promise.all([
    prisma.booking.count({ where: where as never }),
    prisma.booking.findMany({ where: where as never, orderBy: { date: "desc" }, take: 100, include: { service: { select: { name: true } } } }),
  ]);
  return NextResponse.json({ items, total });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status, assignedTeam, notes, date, time } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (!(await dbAvailable())) return NextResponse.json({ ok: true, demo: true });
  const updated = await prisma.booking.update({
    where: { id },
    data: { ...(status ? { status } : {}), ...(assignedTeam !== undefined ? { assignedTeam } : {}), ...(notes !== undefined ? { notes } : {}), ...(date ? { date: new Date(date) } : {}), ...(time !== undefined ? { time } : {}) },
  });
  return NextResponse.json({ ok: true, item: updated });
}
