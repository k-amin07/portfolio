import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Writing", href: "/#writing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-medium tracking-tight text-fg">
          {site.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.resume}
            className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg transition-colors hover:border-fg"
          >
            Résumé
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
