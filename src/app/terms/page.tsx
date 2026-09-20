import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata = baseMetadata({ title: "Terms & Conditions", description: "Booking, payment, cancellation and service terms for Safiluxe Cleaning Solutions.", path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <section className="mx-auto max-w-3xl space-y-4 px-4 py-12 text-[15px] leading-relaxed text-ink-700 sm:px-6">
        <p><strong>1. Quotes.</strong> All quotes are free and valid for 14 days. Final pricing is confirmed after assessment where required (post-construction, large commercial).</p>
        <p><strong>2. Bookings.</strong> A booking is confirmed once we acknowledge it by call, SMS or WhatsApp with date, time and scope.</p>
        <p><strong>3. Access.</strong> Please provide water, power and reasonable access. Secure pets and valuables; crews follow a written checklist and walkthrough.</p>
        <p><strong>4. Rescheduling.</strong> Free rescheduling with 24+ hours notice. Same-day changes may attract a call-out fee.</p>
        <p><strong>5. Payments.</strong> Pay after service via M-Pesa/bank unless otherwise agreed. Commercial contracts are invoiced per agreement. Online payments will be introduced with the same terms.</p>
        <p><strong>6. Satisfaction.</strong> Report any issue within 24 hours and we return to re-clean the affected areas free of charge.</p>
        <p><strong>7. Liability.</strong> We are insured for crew-caused damage verified within 24 hours, up to the invoice value unless otherwise agreed in writing.</p>
      </section>
    </>
  );
}
