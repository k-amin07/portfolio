/**
 * Tiny SVG diagram kit. Coordinates are in viewBox units; every colour comes
 * from the theme tokens so diagrams follow light/dark automatically.
 */
import type { ReactNode } from "react";

type Tone = "default" | "accent" | "muted";

const toneStyle: Record<Tone, { fill: string; stroke: string; dash?: string }> = {
  default: { fill: "var(--surface)", stroke: "var(--line-strong)" },
  accent: { fill: "var(--accent-soft)", stroke: "var(--accent)" },
  muted: { fill: "var(--bg)", stroke: "var(--line-strong)", dash: "4 4" },
};

export function Figure({
  caption,
  minWidth = 680,
  children,
}: {
  caption?: ReactNode;
  /** Below this width (CSS px) the diagram scrolls sideways instead of shrinking. */
  minWidth?: number;
  children: ReactNode;
}) {
  return (
    <figure className="not-prose my-10 sm:-mx-6 lg:-mx-24">
      <div className="overflow-x-auto rounded-xl border border-line bg-bg px-3 py-4 sm:px-5">
        <div style={{ minWidth }}>{children}</div>
      </div>
      {caption ? (
        <figcaption className="mt-3 px-1 text-sm leading-relaxed text-muted sm:px-6 lg:px-24">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Svg({
  id,
  width,
  height,
  label,
  children,
}: {
  /** Unique per page; used for the arrowhead marker ids. */
  id: string;
  width: number;
  height: number;
  /** Accessible description of what the diagram shows. */
  label: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={label}
      className="block h-auto w-full"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" style={{ fill: "var(--muted)" }} />
        </marker>
        <marker id={`${id}-arrow-accent`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" style={{ fill: "var(--accent)" }} />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

/** A box with a title and optional sub-lines. Use "\n" in `sub` for more lines. */
export function Node({
  x,
  y,
  w,
  h,
  title,
  sub,
  tone = "default",
  align = "center",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  tone?: Tone;
  align?: "center" | "left";
}) {
  const t = toneStyle[tone];
  // JSX string attributes keep "\n" literally, so split on both forms.
  const subLines = sub ? sub.split(/\n|\\n/) : [];
  const lineH = 15;
  const blockH = 16 + subLines.length * lineH;
  const top = y + (h - blockH) / 2 + 12;
  const tx = align === "center" ? x + w / 2 : x + 14;
  const anchor = align === "center" ? "middle" : "start";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        style={{ fill: t.fill, stroke: t.stroke, strokeWidth: 1, strokeDasharray: t.dash }}
      />
      <text x={tx} y={top} textAnchor={anchor} style={{ fill: "var(--fg)", fontSize: 13.5, fontWeight: 550 }}>
        {title}
      </text>
      {subLines.map((line, i) => (
        <text
          key={i}
          x={tx}
          y={top + 17 + i * lineH}
          textAnchor={anchor}
          style={{ fill: "var(--muted)", fontSize: 11.5 }}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** A dashed container with a small uppercase label. */
export function Group({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        style={{ fill: "none", stroke: "var(--line)", strokeWidth: 1, strokeDasharray: "3 5" }}
      />
      <text
        x={x + 14}
        y={y - 8}
        style={{
          fill: "var(--muted)",
          fontSize: 10.5,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </text>
    </g>
  );
}

/** A connector. Pass an SVG path `d`. */
export function Edge({
  id,
  d,
  dashed,
  accent,
  arrow = "end",
}: {
  id: string;
  d: string;
  dashed?: boolean;
  accent?: boolean;
  arrow?: "end" | "both" | "none";
}) {
  const marker = `url(#${id}-arrow${accent ? "-accent" : ""})`;
  return (
    <path
      d={d}
      markerEnd={arrow === "none" ? undefined : marker}
      markerStart={arrow === "both" ? marker : undefined}
      style={{
        fill: "none",
        stroke: accent ? "var(--accent)" : "var(--muted)",
        strokeWidth: 1.25,
        strokeDasharray: dashed ? "4 4" : undefined,
      }}
    />
  );
}

/** Free-standing small text, e.g. an edge label. */
export function Label({
  x,
  y,
  children,
  anchor = "middle",
  tone = "muted",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  tone?: "muted" | "accent" | "fg";
}) {
  const fill = tone === "accent" ? "var(--accent)" : tone === "fg" ? "var(--fg)" : "var(--muted)";
  return (
    <text x={x} y={y} textAnchor={anchor} style={{ fill, fontSize: 11, fontFamily: "var(--font-mono)" }}>
      {children}
    </text>
  );
}
