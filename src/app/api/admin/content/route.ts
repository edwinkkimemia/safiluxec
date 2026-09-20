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

// Generic CRUD for: services, testimonials, gallery, areas, posts, messages
const MODELS = ["services", "testimonials", "gallery", "areas", "posts", "messages"] as const;

export async function GET(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const model = searchParams.get("model");
  if (!model || !(MODELS as readonly string[]).includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  if (!(await dbAvailable())) return NextResponse.json({ items: [], demo: true });

  let items: unknown[] = [];
  if (model === "services") items = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  if (model === "testimonials") items = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  if (model === "gallery") items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
  if (model === "areas") items = await prisma.serviceArea.findMany({ orderBy: { sortOrder: "asc" } });
  if (model === "posts") items = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  if (model === "messages") items = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const { model, data } = body as { model: string; data: Record<string, unknown> };
  if (!model || !(MODELS as readonly string[]).includes(model)) return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  if (!(await dbAvailable())) return NextResponse.json({ ok: true, demo: true });

  try {
    let item: unknown = null;
    if (model === "services") item = await prisma.service.create({ data: data as never });
    if (model === "testimonials") item = await prisma.testimonial.create({ data: data as never });
    if (model === "gallery") item = await prisma.galleryItem.create({ data: data as never });
    if (model === "areas") item = await prisma.serviceArea.create({ data: data as never });
    if (model === "posts") item = await prisma.blogPost.create({ data: data as never });
    return NextResponse.json({ ok: true, item });
  } catch (e) {
    console.error("admin create error", e);
    return NextResponse.json({ error: "Create failed. Check required fields." }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const { model, id, data } = body as { model: string; id: string; data: Record<string, unknown> };
  if (!model || !id) return NextResponse.json({ error: "Missing model/id" }, { status: 400 });
  if (!(await dbAvailable())) return NextResponse.json({ ok: true, demo: true });
  try {
    let item: unknown = null;
    if (model === "services") item = await prisma.service.update({ where: { id }, data: data as never });
    if (model === "testimonials") item = await prisma.testimonial.update({ where: { id }, data: data as never });
    if (model === "gallery") item = await prisma.galleryItem.update({ where: { id }, data: data as never });
    if (model === "areas") item = await prisma.serviceArea.update({ where: { id }, data: data as never });
    if (model === "posts") item = await prisma.blogPost.update({ where: { id }, data: data as never });
    if (model === "messages") item = await prisma.contactMessage.update({ where: { id }, data: data as never });
    return NextResponse.json({ ok: true, item });
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const model = searchParams.get("model");
  const id = searchParams.get("id");
  if (!model || !id) return NextResponse.json({ error: "Missing model/id" }, { status: 400 });
  if (!(await dbAvailable())) return NextResponse.json({ ok: true, demo: true });
  try {
    if (model === "services") await prisma.service.delete({ where: { id } });
    if (model === "testimonials") await prisma.testimonial.delete({ where: { id } });
    if (model === "gallery") await prisma.galleryItem.delete({ where: { id } });
    if (model === "areas") await prisma.serviceArea.delete({ where: { id } });
    if (model === "posts") await prisma.blogPost.delete({ where: { id } });
    if (model === "messages") await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 400 });
  }
}
