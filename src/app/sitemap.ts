import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { services, locations, blogPosts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticPages = ["", "/about", "/services", "/residential", "/commercial", "/gallery", "/quote", "/book", "/locations", "/blog", "/faq", "/contact", "/privacy", "/terms"];
  return [
    ...staticPages.map((p) => ({ url: `${base}${p || "/"}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...locations.map((l) => ({ url: `${base}/locations/${l.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...blogPosts.map((b) => ({ url: `${base}/blog/${b.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
