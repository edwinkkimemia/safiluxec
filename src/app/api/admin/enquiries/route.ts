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

// GET /api/admin/enquiries?status=&service=&q=&from=&to=&page=
export async function GET(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await dbAvailable())) return NextResponse.json({ items: [], total: 0, demo: true });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const service = searchParams.get("service");
  const q = searchParams.get("q");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const per = 20;

  const where: Record<string, unknown> = {};
  if (status) (where as Record<string, string>).status = status;
  if (service) (where as Record<string, unknown>).serviceName = { contains: service, mode: "insensitive" };
  if (from || to) {
    (where as Record<string, unknown>).createdAt = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(to) } : {}),
    };
  }
  if (q) {
    (where as Record<string, unknown>).OR = [
      { fullName: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
      { referenceNumber: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
    ];
  }

  const [total, items] = await Promise.all([
    prisma.quoteRequest.count({ where: where as never }),
    prisma.quoteRequest.findMany({ where: where as never, orderBy: { createdAt: "desc" }, skip: (page - 1) * per, take: per, include: { service: { select: { name: true } } } }),
  ]);
  return NextResponse.json({ items, total, page, pages: Math.ceil(total / per) });
}

// PATCH /api/admin/enquiries { id, status?, notes? }
export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status, notes } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (!(await dbAvailable())) return NextResponse.json({ ok: true, demo: true });
  const updated = await prisma.quoteRequest.update({ where: { id }, data: { ...(status ? { status } : {}), ...(notes !== undefined ? { notes } : {}) } });
  return NextResponse.json({ ok: true, item: updated });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (!(await dbAvailable())) return NextResponse.json({ ok: true, demo: true });
  // archive instead of hard delete
  await prisma.quoteRequest.update({ where: { id }, data: { status: "ARCHIVED" } });
  return NextResponse.json({ ok: true });
}
