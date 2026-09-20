import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata = baseMetadata({ title: "Privacy Policy", description: "How Safiluxe collects, uses and protects your information.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <section className="mx-auto max-w-3xl space-y-4 px-4 py-12 text-[15px] leading-relaxed text-ink-700 sm:px-6">
        <p>Last updated: {new Date().getFullYear()}. Safiluxe Cleaning Solutions (“we”) respects your privacy. We collect only what we need to deliver quotes, bookings and support: name, phone, email, service details and messages you share.</p>
        <p><strong>Use.</strong> We use your details to respond to enquiries, schedule cleans, improve service and (with consent) send relevant updates. We never sell personal data.</p>
        <p><strong>Storage.</strong> Data is stored securely in our managed PostgreSQL database with access limited to authorised staff. Admin access is password-protected and audited.</p>
        <p><strong>Sharing.</strong> We share data only with service providers strictly required to operate the website (hosting, database) under confidentiality, or when required by law.</p>
        <p><strong>Your rights.</strong> Request access, correction or deletion anytime via hello@safiluxe.co.ke or WhatsApp. We respond within 72 hours.</p>
        <p><strong>Cookies.</strong> We use minimal, privacy-friendly analytics and a secure admin session cookie. No advertising trackers.</p>
      </section>
    </>
  );
}
