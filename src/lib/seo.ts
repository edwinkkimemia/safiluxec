import type { Metadata } from "next";
import { siteConfig } from "./site";

export function baseMetadata({
  title, description, path = "", image,
}: { title: string; description: string; path?: string; image?: string }): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/clean2.png`;
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description, images: [ogImage] },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneHref,
    email: siteConfig.email,
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
    openingHours: "Mo-Sa 07:00-19:00",
    priceRange: "KES",
    areaServed: ["Nairobi", "Kiambu", "Thika", "Kajiado", "Machakos"],
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceJsonLd(service: { name: string; description: string; image?: string; slug: string }) {
  const img = service.image?.startsWith("http") ? service.image : service.image ? `${siteConfig.url}${service.image}` : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: "Nairobi, Kenya",
    url: `${siteConfig.url}/services/${service.slug}`,
    ...(img ? { image: img } : {}),
  };
}
