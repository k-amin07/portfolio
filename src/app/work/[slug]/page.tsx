import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Tags } from "@/components/section";
import { caseStudies, getCaseStudy } from "@/content/work";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    openGraph: { title: c.title, description: c.summary, type: "article" },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const { default: Body } = await import(`@/content/work/${slug}.mdx`);
  const index = caseStudies.findIndex((x) => x.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="mx-auto max-w-[720px] px-4 pb-24 pt-10 sm:px-6 sm:pt-16">
      <Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <Arrow className="rotate-180 transition-transform group-hover:-translate-x-0.5" />
        All work
      </Link>

      <header className="mt-10">
        <p className="eyebrow">
          <span className="text-accent">{c.kind}</span>
          <span aria-hidden="true"> · </span>
          {c.period}
        </p>
        <h1 className="mt-4 text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-fg sm:text-[2.6rem]">
          {c.title}
        </h1>
        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
          <dt className="text-muted">Context</dt>
          <dd className="text-fg">{c.context}</dd>
          <dt className="mt-2 text-muted sm:mt-0">Role</dt>
          <dd className="text-fg">{c.role}</dd>
        </dl>

        {c.facts.length ? (
          <dl className={`mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line ${c.facts.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4"}`}>
            {c.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse bg-bg p-4">
                <dt className="mt-1 text-xs leading-snug text-muted">{f.label}</dt>
                <dd className="text-xl font-semibold tracking-[-0.02em] text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-6">
          <Tags items={c.stack} />
        </div>
      </header>

      <div className="prose-case mt-14">
        <Body />
      </div>

      {next && next.slug !== slug ? (
        <footer className="mt-20 border-t border-line pt-8">
          <p className="eyebrow">Next</p>
          <Link href={`/work/${next.slug}`} className="group mt-3 flex items-start justify-between gap-6">
            <span className="text-xl font-medium tracking-[-0.01em] text-fg group-hover:text-accent">{next.title}</span>
            <Arrow className="mt-1.5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </footer>
      ) : null}
    </article>
  );
}
