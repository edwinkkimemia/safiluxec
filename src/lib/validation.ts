import { z } from "zod";

export const quoteSchema = z.object({
  fullName: z.string().min(2).max(120),
  phone: z.string().min(7).max(20),
  email: z.string().email().optional().or(z.literal("")),
  service: z.string().min(1).max(120),
  propertyType: z.string().max(80).optional(),
  location: z.string().min(2).max(120),
  rooms: z.string().max(40).optional(),
  propertySize: z.string().max(60).optional(),
  preferredDate: z.string().optional(),
  frequency: z.enum(["one-time", "daily", "weekly", "bi-weekly", "monthly", "custom"]).default("one-time"),
  message: z.string().max(2000).optional(),
});

export const bookingSchema = z.object({
  customerName: z.string().min(2).max(120),
  phone: z.string().min(7).max(20),
  email: z.string().email().optional().or(z.literal("")),
  service: z.string().min(1).max(120),
  date: z.string().min(4),
  time: z.string().max(20).optional(),
  location: z.string().min(2).max(120),
  propertyType: z.string().max(80).optional(),
  frequency: z.enum(["one-time", "daily", "weekly", "bi-weekly", "monthly", "custom"]).default("one-time"),
  notes: z.string().max(2000).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional().or(z.literal("")),
  subject: z.string().max(160).optional(),
  message: z.string().min(5).max(2000),
});

// Simple in-memory rate limiter (per-instance). For multi-instance, use Redis/Upstash.
const hits = new Map<string, { count: number; reset: number }>();
export function rateLimit(key: string, limit = 12, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}

export function sanitize(s: string, max = 2000) {
  return s.replace(/<[^>]*>/g, "").trim().slice(0, max);
}

export function makeReference(prefix: string) {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${ymd}-${rand}`;
}
