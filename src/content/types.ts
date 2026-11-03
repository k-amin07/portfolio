/**
 * Shapes for everything in src/content. Edit the data files, not this one;
 * TypeScript will tell you (and `npm run build` will fail) if an entry is
 * missing a field.
 */

/** "YYYY-MM", e.g. "2026-04". */
export type YearMonth = `${number}-${number}`;

export type Link = { label: string; href: string };

export type Position = {
  title: string;
  start: YearMonth;
  /** null = current role. Set a date to close it. */
  end: YearMonth | null;
  highlights: string[];
};

export type Job = {
  company: string;
  url?: string;
  location: string;
  /** One line about the company, shown under its name. */
  blurb?: string;
  /** Newest first. Add a new Position on top for a promotion. */
  positions: Position[];
  stack?: string[];
  /** Case study slugs from work.ts to link from this job. */
  caseStudies?: string[];
};

export type Degree = {
  school: string;
  degree: string;
  start: YearMonth;
  end: YearMonth | null;
  location: string;
  notes: string[];
};

export type Project = {
  title: string;
  /** One sentence, shown on the card. */
  summary: string;
  /** Start year only, e.g. "2024". Optional for undated coursework. */
  year?: string;
  stack: string[];
  links: Link[];
  /** Shown as a smaller "also" list when false. */
  featured: boolean;
  /** Optional note shown instead of links, e.g. "Course code, available on request". */
  note?: string;
};

export type WritingItem = {
  title: string;
  href: string;
  kind: "Article" | "Guide";
  where: string;
  date: string;
  summary: string;
  /** e.g. "95 stars" */
  badge?: string;
};

export type CaseStudy = {
  /** URL slug; the body lives in src/content/work/<slug>.mdx */
  slug: string;
  title: string;
  /** One line for the home page list. */
  summary: string;
  kind: "Forward deployed" | "Platform" | "AI tooling" | "Research";
  /** Anonymized client descriptor, or context like "PackageX". */
  context: string;
  role: string;
  period: string;
  stack: string[];
  /** Up to 4 headline facts shown at the top of the case study. */
  facts: { value: string; label: string }[];
};
