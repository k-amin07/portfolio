import type { ReactNode } from "react";

/** A highlighted aside inside a case study. */
export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="rounded-xl border border-line bg-surface px-5 py-4 text-[0.95rem] leading-relaxed">
      {title ? <p className="eyebrow mb-2 !text-accent">{title}</p> : null}
      <div className="space-y-2 text-fg/90">{children}</div>
    </aside>
  );
}
