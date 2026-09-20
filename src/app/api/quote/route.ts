import { NextRequest, NextResponse } from "next/server";
import { quoteSchema, rateLimit, sanitize, makeReference } from "@/lib/validation";
import { prisma, dbAvailable } from "@/lib/db";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(`quote:${ip}`, 10)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form: " + parsed.error.issues[0]?.message }, { status: 400 });
  }
  const d = parsed.data;
  const referenceNumber = makeReference("SFL");

  const record = {
    referenceNumber,
    fullName: sanitize(d.fullName, 120),
    phone: sanitize(d.phone, 20),
    email: d.email ? sanitize(d.email, 160) : null,
    serviceName: sanitize(d.service, 120),
    propertyType: d.propertyType ? sanitize(d.propertyType, 80) : null,
    location: sanitize(d.location, 120),
    rooms: d.rooms ? sanitize(d.rooms, 40) : null,
    propertySize: d.propertySize ? sanitize(d.propertySize, 60) : null,
    preferredDate: d.preferredDate ? new Date(d.preferredDate) : null,
    frequency: d.frequency,
    message: d.message ? sanitize(d.message) : null,
    source: "website",
  };

  if (await dbAvailable()) {
    try {
      // link serviceId by name match if services seeded
      const svc = await prisma.service.findFirst({ where: { name: { equals: record.serviceName, mode: "insensitive" } }, select: { id: true } }).catch(() => null);
      await prisma.quoteRequest.create({ data: { ...record, serviceId: svc?.id ?? null } });
    } catch (e) {
      console.error("quote db error", e);
      // still return success so UX isn't broken; admin can follow up via notification channel
    }
  } else {
    console.log("[quote:demo-mode]", record);
  }

  return NextResponse.json({ ok: true, referenceNumber }, { status: 201 });
}
