import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceSeed } from "@/lib/data";

export default function ServiceCard({ service }: { service: ServiceSeed }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-shadow group flex flex-col overflow-hidden rounded-2xl border border-ink-900/[0.07] bg-white transition duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <Image src={service.image} alt={service.name} fill sizes="(max-width:768px) 100vw, 33vw" quality={85} className="object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <span className="absolute top-3 left-3 rounded-full bg-pine-950/85 px-3 py-1 text-[11px] font-semibold text-gold-200 backdrop-blur">
          {service.priceHint || "Free quote"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg font-semibold text-pine-950">{service.name}</h3>
        <p className="text-sm leading-relaxed text-ink-500">{service.shortDescription}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-pine-800">
          View service <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
