import { baseMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";

export const metadata = baseMetadata({ title: "Book Cleaning", description: "Book your cleaning in seconds — choose service, date and time. Instant confirmation request.", path: "/book" });

export default function BookPage() {
  return (
    <>
      <PageHero eyebrow="Bookings" title="Book your cleaning" copy="Pick a service and time — we confirm availability shortly. Prefer to talk? Call or WhatsApp anytime." crumbs={[{ label: "Home", href: "/" }, { label: "Book Cleaning" }]} />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="card-shadow rounded-3xl border border-ink-900/[0.07] bg-white p-6 sm:p-8">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
