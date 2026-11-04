import type { ReactNode } from "react";

/** A home page section: small label on the left, content on the right. */
export function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="scroll-mt-16 snap-start border-t border-line">
      <div className="mx-auto grid max-w-[1080px] gap-6 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-[180px_1fr] md:gap-10">
        <h2 id={`${id}-label`} className="eyebrow md:sticky md:top-24 md:self-start md:pt-1">
          {label}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function Tags({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.7rem] leading-5 text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}
