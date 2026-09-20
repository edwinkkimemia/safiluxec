import { NextRequest, NextResponse } from "next/server";
import { bookingSchema, rateLimit, sanitize, makeReference } from "@/lib/validation";
import { prisma, dbAvailable } from "@/lib/db";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(`booking:${ip}`, 10)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form: " + parsed.error.issues[0]?.message }, { status: 400 });
  }
  const d = parsed.data;
  const date = new Date(d.date);
  if (isNaN(date.getTime())) return NextResponse.json({ error: "Invalid date." }, { status: 400 });

  const referenceNumber = makeReference("BKG");
  const record = {
    referenceNumber,
    customerName: sanitize(d.customerName, 120),
    phone: sanitize(d.phone, 20),
    email: d.email ? sanitize(d.email, 160) : null,
    serviceName: sanitize(d.service, 120),
    date,
    time: d.time ? sanitize(d.time, 20) : null,
    location: sanitize(d.location, 120),
    propertyType: d.propertyType ? sanitize(d.propertyType, 80) : null,
    frequency: d.frequency,
    notes: d.notes ? sanitize(d.notes) : null,
  };

  if (await dbAvailable()) {
    try {
      const svc = await prisma.service.findFirst({ where: { name: { equals: record.serviceName, mode: "insensitive" } }, select: { id: true } }).catch(() => null);
      await prisma.booking.create({ data: { ...record, serviceId: svc?.id ?? null } });
    } catch (e) {
      console.error("booking db error", e);
    }
  } else {
    console.log("[booking:demo-mode]", record);
  }

  return NextResponse.json({ ok: true, referenceNumber }, { status: 201 });
}
