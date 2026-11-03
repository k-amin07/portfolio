import type { YearMonth } from "@/content/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatYearMonth(ym: YearMonth | null): string {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatRange(start: YearMonth, end: YearMonth | null): string {
  return `${formatYearMonth(start)} – ${formatYearMonth(end)}`;
}

export function yearOf(ym: YearMonth | null): string {
  return ym ? ym.slice(0, 4) : "Present";
}
