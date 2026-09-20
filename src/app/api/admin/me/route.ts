import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, AUTH_COOKIE } from "@/lib/auth";

export async function GET() {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIE)?.value;
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });
  const session = await verifySession(token);
  if (!session) return NextResponse.json({ authenticated: false }, { status: 401 });
  return NextResponse.json({ authenticated: true, user: session });
}
