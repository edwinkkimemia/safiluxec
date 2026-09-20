import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyCtaBar from "@/components/StickyCtaBar";
import { siteConfig, WHATSAPP_MESSAGES } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | A Cleaner Space. A Better Standard.`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ["cleaning services Nairobi", "office cleaning Kenya", "deep cleaning", "carpet cleaning", "sofa cleaning", "post construction cleaning", "house cleaning Nairobi"],
  openGraph: { title: siteConfig.name, description: siteConfig.description, url: siteConfig.url, siteName: siteConfig.name, type: "website", images: [{ url: "/clean2.png", width: 1792, height: 576, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/fav.png", type: "image/png" }], apple: "/fav.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }} />
      </head>
      <body className="flex min-h-full flex-col bg-cream-50 font-sans text-ink-900 antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-pine-950 focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <StickyCtaBar />
        <WhatsAppFloat message={WHATSAPP_MESSAGES.general} />
      </body>
    </html>
  );
}
