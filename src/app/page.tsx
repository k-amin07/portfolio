import Image from "next/image";
import Link from "next/link";
import portrait from "@/assets/khizar.jpeg";
import { Arrow, ExternalArrow, Section, Tags } from "@/components/section";
import { education, jobs } from "@/content/experience";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { caseStudies, getCaseStudy } from "@/content/work";
import { writing } from "@/content/writing";
import { formatRange, yearOf } from "@/lib/dates";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Experience />
      <Toolbox />
      <Projects />
      <Writing />
      <Education />
      <About />
    </>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-[1080px] scroll-mt-16 snap-start px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
      <div className="flex items-center gap-4">
        <Image
          src={portrait}
          alt="Portrait of Khizar Amin"
          sizes="56px"
          priority
          className="size-14 rounded-full border border-line object-cover"
        />
        <div>
          <p className="font-medium text-fg">{site.name}</p>
          <p className="text-sm text-muted">
            {site.role} ({site.focus}) at{" "}
            <a href={site.company.url} className="link" target="_blank" rel="noreferrer">
              {site.company.name}
            </a>
          </p>
        </div>
      </div>

      <h1 className="mt-10 max-w-[22ch] text-balance text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.035em] text-fg sm:text-5xl lg:text-[3.6rem]">
        {site.headline}
      </h1>

      <div className="mt-8 max-w-[62ch] space-y-4 text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
        {site.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          Get in touch <Arrow />
        </a>
        <a
          href={site.resume}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-fg"
        >
          Résumé
        </a>
        <ul className="flex items-center gap-4 px-1 text-sm">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer" className="link text-muted">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
        <span>{site.location}</span>
        <span aria-hidden="true">·</span>
        <span>{site.availability}</span>
      </p>
    </section>
  );
}

function SelectedWork() {
  return (
    <Section id="work" label="Selected work">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((c, i) => (
          <li key={c.slug} className={i === 0 ? "sm:col-span-2" : ""}>
            <Link
              href={`/work/${c.slug}`}
              className="group flex h-full flex-col rounded-xl border border-line p-5 transition-colors hover:border-accent hover:bg-accent-soft/40"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="eyebrow !text-accent">{c.kind}</p>
                <Arrow className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
              <h3 className="mt-3 text-[1.05rem] font-medium leading-snug tracking-[-0.01em] text-fg transition-colors group-hover:text-accent">
                {c.title}
              </h3>
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted">{c.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" label="Experience">
      <ol className="space-y-14">
        {jobs.map((job) => (
          <li key={job.company}>
            <article>
              <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-medium tracking-[-0.01em] text-fg">
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noreferrer" className="hover:text-accent">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <p className="text-sm text-muted">{job.location}</p>
              </header>
              {job.blurb ? <p className="mt-1 text-sm text-muted">{job.blurb}</p> : null}

              <ol className="mt-6 space-y-8 border-l border-line pl-5 sm:pl-6">
                {job.positions.map((p) => (
                  <li key={p.title + p.start} className="relative">
                    <span
                      className={`absolute -left-[25px] top-2 size-[9px] rounded-full border sm:-left-[29px] ${
                        p.end === null ? "border-accent bg-accent" : "border-line-strong bg-bg"
                      }`}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h4 className="font-medium text-fg">{p.title}</h4>
                      <p className="shrink-0 font-mono text-xs text-muted">{formatRange(p.start, p.end)}</p>
                    </div>
                    <ul className="mt-3 space-y-2 text-[0.975rem] leading-relaxed text-muted">
                      {p.highlights.map((h) => (
                        <li key={h} className="relative pl-4">
                          <span className="absolute left-0 top-[0.7em] h-px w-2 bg-line-strong" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>

              {job.stack || job.caseStudies ? (
                <div className="mt-6 flex flex-col gap-4 pl-5 sm:pl-6">
                  {job.caseStudies ? (
                    <div>
                      <p className="eyebrow">Case studies</p>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {job.caseStudies.map((slug) => {
                          const c = getCaseStudy(slug);
                          return c ? (
                            <li key={slug}>
                              <Link
                                href={`/work/${slug}`}
                                className="group flex h-full items-center justify-between gap-3 rounded-lg border border-line-strong bg-surface px-4 py-3 text-sm font-medium leading-snug text-fg transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent"
                              >
                                <span>{c.title}</span>
                                <Arrow className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                              </Link>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  ) : null}
                  {job.stack ? <Tags items={job.stack} /> : null}
                </div>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Toolbox() {
  return (
    <Section id="toolbox" label="Toolbox">
      <dl className="divide-y divide-line">
        {site.skills.map((g) => (
          <div key={g.group} className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[140px_1fr] sm:gap-6">
            <dt className="text-sm font-medium text-fg">{g.group}</dt>
            <dd className="text-[0.975rem] leading-relaxed text-muted">{g.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <Section id="projects" label="Projects">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <li key={p.title} className="flex flex-col rounded-xl border border-line p-5">
            {p.year ? <p className="font-mono text-xs text-muted">{p.year}</p> : null}
            <h3 className="mt-2 font-medium leading-snug text-fg">{p.title}</h3>
            <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
            {p.links.length ? (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {p.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-fg hover:text-accent">
                      {l.label}
                      <ExternalArrow className="text-muted group-hover:text-accent" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : p.note ? (
              <p className="mt-4 text-xs leading-relaxed text-muted italic">{p.note.split(". ")[0].replace(/\.$/, "")}.</p>
            ) : null}
          </li>
        ))}
      </ul>

      {rest.length ? (
        <p className="mt-6 text-sm leading-relaxed text-muted">
          <span className="eyebrow mr-2">Also</span>
          {rest.map((p, i) => (
            <span key={p.title}>
              {i ? <span aria-hidden="true"> · </span> : null}
              <a href={p.links[0]?.href} target="_blank" rel="noreferrer" className="link text-fg">
                {p.title}
              </a>
            </span>
          ))}
        </p>
      ) : null}
    </Section>
  );
}

function Writing() {
  return (
    <Section id="writing" label="Writing & guides">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {writing.map((w) => (
          <li key={w.href}>
            <a
              href={w.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-xl border border-line p-5 transition-colors hover:border-line-strong"
            >
              <p className="eyebrow">
                {w.kind} · {w.where}
                {w.badge ? (
                  <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-accent normal-case tracking-normal">{w.badge}</span>
                ) : null}
              </p>
              <h3 className="mt-3 flex items-start gap-1.5 font-medium leading-snug text-fg group-hover:text-accent">
                <span>{w.title}</span>
                <ExternalArrow className="mt-1 shrink-0 text-muted group-hover:text-accent" />
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{w.summary}</p>
              <p className="mt-3 font-mono text-xs text-muted">{w.date}</p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" label="Education">
      <ul className="space-y-10">
        {education.map((d) => (
          <li key={d.degree}>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-medium text-fg">
                {d.degree}, <span className="text-muted">{d.school}</span>
              </h3>
              <p className="shrink-0 font-mono text-xs text-muted">
                {yearOf(d.start)} – {yearOf(d.end)}
              </p>
            </div>
            <ul className="mt-3 space-y-1.5 text-[0.975rem] leading-relaxed text-muted">
              {d.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" label="Off the clock">
      <div className="max-w-[62ch] space-y-4 text-lg leading-relaxed text-fg/90">
        {site.about.map((p) => (
          <p key={p}>
            <InlineLinks text={p} />
          </p>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <p className="eyebrow">Hiring for an FDE, solutions or senior backend role?</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-3 inline-flex flex-wrap items-center gap-2 break-all text-2xl font-medium tracking-[-0.02em] text-fg hover:text-accent sm:text-3xl"
        >
          {site.email}
        </a>
        <p className="mt-4 text-sm text-muted">
          {site.location} · {site.availability}. Or grab the{" "}
          <a href={site.resume} className="link">
            résumé
          </a>{" "}
          (fair warning: it links back here).
        </p>
      </div>
    </Section>
  );
}

/** Renders [text](url) inside a plain string as a link. */
function InlineLinks({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? (
      <a key={i} href={m[2]} target="_blank" rel="noreferrer" className="link">
        {m[1]}
      </a>
    ) : (
      part
    );
  });
}
