# khizaramin.com

Personal portfolio. Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and MDX. There's no database or CMS: all content lives in typed files under `src/content/`, and every page is prerendered at build time.

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # type-checks content and prerenders every page
npm run lint
```

## Updating content

All content is in `src/content/`. If an entry is missing a field or has a malformed date, `npm run build` fails and tells you where.

| To change | Edit |
| --- | --- |
| Headline, intro, email, socials, about, toolbox | `src/content/site.ts` |
| Jobs and education | `src/content/experience.ts` |
| Side projects | `src/content/projects.ts` |
| Articles and guides | `src/content/writing.ts` |
| Case studies (list and header facts) | `src/content/work.ts` |
| Case study body | `src/content/work/<slug>.mdx` |
| Résumé | `public/resume.pdf` |

### Start a new job

1. In `src/content/experience.ts`, close the current position by setting its `end`:

   ```ts
   { title: "Forward Deployed Engineer (Backend & AI)", start: "2026-04", end: "2027-03", ... }
   ```

2. Add the new company as the first entry in `jobs`, with `end: null` for the current role:

   ```ts
   {
     company: "New Co",
     url: "https://newco.com",
     location: "Remote",
     positions: [
       { title: "Senior Engineer", start: "2027-03", end: null, highlights: ["..."] },
     ],
     stack: ["..."],
   },
   ```

3. Update `site.role`, `site.company` and `site.intro` in `src/content/site.ts`, since the hero and page metadata read from them.

A promotion within the same company works the same way: set `end` on the old position and add the new one at the top of that job's `positions`. The current role (the one with `end: null`) gets the filled dot on the timeline.

### Replace the résumé

Overwrite `public/resume.pdf` and deploy. `/resume` shows it in the page (rendered with pdf.js, so it works on phones too, with its links clickable), plus a **Download PDF** button and an **Email it** button. On devices that can share files (phones, Safari), Email it opens the share sheet with the PDF attached. Elsewhere it opens the default mail app with a link to the PDF, because `mailto:` can't carry attachments.

### Add a case study

1. Add an entry to `caseStudies` in `src/content/work.ts` with a new `slug`.
2. Create `src/content/work/<slug>.mdx` for the body. Plain Markdown and GFM tables work, and so do the diagram components exported from `src/components/diagrams` (no import needed).
3. To add a diagram, build it from the primitives in `src/components/diagrams/kit.tsx` (`Figure`, `Svg`, `Node`, `Edge`, `Group`, `Label`) and export it from `src/components/diagrams/index.tsx`. Colors come from the theme tokens, so light and dark mode work automatically.

Clients are anonymized on purpose. Describe a client by industry and scale and name the systems (NetSuite, Shopify and so on), not the customer.

## Design

- Tokens: `src/app/globals.css` defines every color as a CSS variable, with a dark set for `prefers-color-scheme` and for the toggle (`<html data-theme>`, remembered in `localStorage`).
- Type: Geist Sans and Geist Mono through `next/font`.
- Case study prose styles: `.prose-case` in `globals.css`.

## How updates go live

The site is static: every page is generated at build time from the files in `src/content/`, so there's no admin panel and no database. Connected to Vercel, an update is just a commit: edit a file (even in GitHub's web editor), push, and Vercel rebuilds and swaps the site in about a minute. There's no manual deploy step.

## Deploy

The site is a standard Next.js app. On Vercel: import the repo, keep the defaults (framework Next.js, `npm run build`), deploy, then add `khizaramin.com` under Project → Domains and point DNS at Vercel as it instructs. Every push to the default branch redeploys.

The canonical URL used for metadata, the sitemap and the OG image is `site.url` in `src/content/site.ts`.
