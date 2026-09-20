export default function SectionHeading({
  eyebrow, title, copy, align = "center", dark = false,
}: { eyebrow?: string; title: string; copy?: string; align?: "center" | "left"; dark?: boolean }) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignCls}`}>
      {eyebrow && (
        <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${dark ? "bg-white/10 text-gold-200" : "bg-brand-600/[0.06] text-pine-800"}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl ${dark ? "text-white" : "text-ink-900"}`}>{title}</h2>
      {copy && <p className={`text-[15px] leading-relaxed ${dark ? "text-white/70" : "text-ink-500"}`}>{copy}</p>}
    </div>
  );
}
