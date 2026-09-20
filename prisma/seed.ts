import { hashPassword } from "../src/lib/auth";
import { PrismaClient } from "@prisma/client";
import { services, locations, testimonialsSeed, blogPosts, gallerySeed } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@safiluxe.co.ke").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const hash = await hashPassword(password);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash: hash, name: "Safiluxe Admin" },
    create: { email, name: "Safiluxe Admin", passwordHash: hash, role: "ADMIN" },
  });
  console.log(`Admin user ready: ${email}`);

  for (const [i, s] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: { name: s.name, shortDescription: s.shortDescription, description: s.description, features: s.features, priceHint: s.priceHint, featuredImage: s.image, featured: !!s.featured, sortOrder: i },
      create: { name: s.name, slug: s.slug, shortDescription: s.shortDescription, description: s.description, features: s.features, priceHint: s.priceHint, featuredImage: s.image, featured: !!s.featured, sortOrder: i, seoTitle: `${s.name} in Nairobi | Safiluxe`, seoDescription: s.shortDescription },
    });
  }

  for (const [i, l] of locations.entries()) {
    await prisma.serviceArea.upsert({
      where: { slug: l.slug },
      update: { name: l.name, description: l.description, featured: l.featured, sortOrder: i },
      create: { name: l.name, slug: l.slug, description: l.description, featured: l.featured, sortOrder: i, seoTitle: `Cleaning Services in ${l.name} | Safiluxe` },
    });
  }

  for (const t of testimonialsSeed) {
    const exists = await prisma.testimonial.findFirst({ where: { customerName: t.customerName, review: t.review } });
    if (!exists) await prisma.testimonial.create({ data: { ...t, published: true } });
  }

  for (const [i, g] of gallerySeed.entries()) {
    const exists = await prisma.galleryItem.findFirst({ where: { image: g.image } });
    if (!exists) await prisma.galleryItem.create({ data: { image: g.image, category: g.category, caption: g.caption, sortOrder: i, published: true } });
  }

  for (const b of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: { title: b.title, slug: b.slug, excerpt: b.excerpt, content: b.content, featuredImage: b.image, status: "PUBLISHED", category: b.category, publishedAt: new Date() },
    });
  }

  console.log("Seed complete.");
}

main().finally(() => prisma.$disconnect());
