import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "safiluxe-dev-secret-change-in-production-32chars"
);
const COOKIE = "safiluxe_admin_token";

export async function hashPassword(pw: string) {
  return bcrypt.hash(pw, 12);
}
export async function verifyPassword(pw: string, hash: string) {
  return bcrypt.compare(pw, hash);
}

export async function createSession(payload: { id: string; email: string; name: string }) {
  return new SignJWT({ ...payload, role: "ADMIN" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: string; email: string; name: string };
  } catch {
    return null;
  }
}

export const AUTH_COOKIE = COOKIE;
