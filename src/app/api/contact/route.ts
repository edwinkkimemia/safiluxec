import { NextRequest, NextResponse } from "next/server";
import { contactSchema, rateLimit, sanitize } from "@/lib/validation";
import { prisma, dbAvailable } from "@/lib/db";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(`contact:${ip}`, 8)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please complete the form correctly." }, { status: 400 });
  const d = parsed.data;

  if (await dbAvailable()) {
    try {
      await prisma.contactMessage.create({
        data: { name: sanitize(d.name, 120), phone: d.phone ? sanitize(d.phone, 20) : null, email: d.email ? sanitize(d.email, 160) : null, subject: d.subject ? sanitize(d.subject, 160) : null, message: sanitize(d.message) },
      });
    } catch (e) { console.error("contact db error", e); }
  }
  return NextResponse.json({ ok: true });
}
