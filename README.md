# Safiluxe Cleaning Solutions — Premium Website Platform

Production-ready Next.js + TypeScript + Prisma (PostgreSQL) website for **Safiluxe Cleaning Solutions**.

**Positioning:** Professional cleaning. Reliable people. Exceptional results.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Prisma ORM + PostgreSQL (Neon / Supabase / RDS)
- Admin auth: bcryptjs + JWT (jose) in httpOnly cookie
- Validation: zod · Icons: lucide-react
- Deploy: Vercel-compatible

## Quick start

```bash
npm install
cp .env.example .env        # fill DATABASE_URL, ADMIN_*, AUTH_SECRET, NEXT_PUBLIC_*
npx prisma migrate dev --name init
npm run db:seed
npm run dev                 # http://localhost:3000
```

Admin: `http://localhost:3000/admin` (login with `ADMIN_EMAIL` / `ADMIN_PASSWORD`).
First login works even before seeding via env-admin fallback; run `db:seed` to create the DB admin + 14 services, areas, reviews, gallery, blog.

## Key routes

| Route | Purpose |
|---|---|
| `/` | Premium homepage (hero, services, why, steps, residential, commercial, gallery, reviews, areas, FAQ) |
| `/services`, `/services/[slug]` | 14 SEO service pages |
| `/residential`, `/commercial` | Segment landing pages |
| `/locations`, `/locations/[slug]` | SEO area pages (nairobi, kiambu, thika…) |
| `/quote`, `/book`, `/thank-you` | Quote + booking flows → PostgreSQL + reference numbers |
| `/gallery`, `/blog`, `/blog/[slug]`, `/faq`, `/contact`, `/about`, `/privacy`, `/terms` | Content pages |
| `/admin` | Dashboard (stats, most-requested), enquiries, bookings, services/gallery/reviews/blog/areas/messages CRUD |

## APIs

- `POST /api/quote` — validated, rate-limited, sanitised; saves `QuoteRequest` (`SFL-YYYYMMDD-XXXXX`)
- `POST /api/bookings` — saves `Booking` (`BKG-…`) with payment-ready fields (`amountCents`, `paymentStatus`)
- `POST /api/contact` — saves `ContactMessage`
- `POST/DELETE /api/admin/login`, `GET /api/admin/me`
- `GET/PATCH/DELETE /api/admin/enquiries` (search, status/service/date filters, notes)
- `GET/PATCH /api/admin/bookings` (status, team, reschedule, notes)
- `GET /api/admin/stats` (dashboard KPIs)
- `GET/POST/PATCH/DELETE /api/admin/content?model=services|testimonials|gallery|areas|posts|messages`

Without `DATABASE_URL`, public forms still succeed (demo mode, logged) and admin shows a demo notice.

## Production deploy (Vercel)

1. Provision Postgres (Neon/Supabase), copy pooled `DATABASE_URL`.
2. Vercel → import repo → set env vars (`DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `AUTH_SECRET` 32+ chars, `NEXT_PUBLIC_*`).
3. Build command default (`npm run build` runs `prisma generate && next build`).
4. After first deploy: `npx prisma migrate deploy && npm run db:seed`.
5. Update `NEXT_PUBLIC_WHATSAPP` / `NEXT_PUBLIC_PHONE` to the real Safiluxe number.

## Security & SEO

- bcrypt (12 rounds), httpOnly/SameSite cookies, protected `/admin/*` via middleware + server verification
- zod validation, HTML-strip sanitisation, per-IP rate limits, no secrets in client bundle
- Metadata API, canonical, OpenGraph/Twitter, sitemap, robots, LocalBusiness + Service + FAQ + BlogPosting JSON-LD, semantic HTML, skip link, keyboard-accessible nav/accordion

## Customising

- Brand/numbers: `src/lib/site.ts` (+ `.env` `NEXT_PUBLIC_*`)
- Services/areas/reviews/FAQs/posts/gallery seed: `src/lib/data.ts` (then `db:seed`, or edit live in `/admin/content`)
- Colours/type: `src/app/globals.css` (`pine`, `gold`, `cream` theme + Fraunces/Inter)
