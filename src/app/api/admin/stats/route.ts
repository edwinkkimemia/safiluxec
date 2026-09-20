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

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await dbAvailable())) {
    return NextResponse.json({
      demo: true,
      stats: { newEnquiries: 0, totalEnquiries: 0, pendingQuotations: 0, confirmedBookings: 0, completedJobs: 0, monthlyEnquiries: 0, mostRequested: [] },
    });
  }
  const startOfMonth = new Date();
  startOfMonth.setDate(1); startOfMonth.setHours(0, 0, 0, 0);

  const [newEnquiries, totalEnquiries, pendingQuotations, confirmedBookings, completedJobs, monthlyEnquiries, grouped] = await Promise.all([
    prisma.quoteRequest.count({ where: { status: "NEW" } }),
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { status: { in: ["NEW", "CONTACTED", "SITE_VISIT_SCHEDULED", "QUOTE_SENT"] } } }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.booking.count({ where: { status: "COMPLETED" } }),
    prisma.quoteRequest.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.quoteRequest.groupBy({ by: ["serviceName"], _count: { serviceName: true }, orderBy: { _count: { serviceName: "desc" } }, take: 6 }),
  ]);

  return NextResponse.json({
    stats: {
      newEnquiries, totalEnquiries, pendingQuotations, confirmedBookings,
      completedJobs, monthlyEnquiries,
      mostRequested: grouped.map((g: { serviceName: string | null; _count: { serviceName: number } }) => ({ service: g.serviceName || "General", count: g._count.serviceName })),
    },
  });
}
