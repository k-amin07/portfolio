import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {site.name} · {site.location}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <a className="link" href={`mailto:${site.email}`}>
              Email
            </a>
          </li>
          {site.socials.map((s) => (
            <li key={s.href}>
              <a className="link" href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a className="link" href={site.resume}>
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
