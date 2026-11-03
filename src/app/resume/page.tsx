import type { Metadata } from "next";
import { EmailResumeButton } from "@/components/email-resume-button";
import { ResumeViewer } from "@/components/resume-viewer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${site.name}'s résumé: ${site.role} (${site.focus}).`,
};

const button =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors";

export default function ResumePage() {
  const fileName = `${site.name.replace(/\s+/g, "-")}-Resume.pdf`;
  return (
    <div className="mx-auto max-w-[880px] px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Résumé</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg">{site.name}</h1>
          <p className="mt-1 text-sm text-muted">
            {site.role} ({site.focus})
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={site.resumePdf} download={fileName} className={`${button} bg-fg text-bg hover:opacity-85`}>
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M8 2v8.5M4.5 7 8 10.5 11.5 7M2.5 13.5h11" />
            </svg>
            Download PDF
          </a>
          <EmailResumeButton
            pdfPath={site.resumePdf}
            publicUrl={`${site.url}${site.resumePdf}`}
            fileName={fileName}
            subject={`Résumé: ${site.name}, ${site.role}`}
            body={`${site.name}'s résumé (${site.role}, ${site.focus}). Portfolio: ${site.url}`}
            className={`${button} border border-line-strong text-fg hover:border-fg`}
          />
        </div>
      </div>

      <div className="mt-8">
        <ResumeViewer src={site.resumePdf} title={`${site.name} résumé`} />
      </div>
    </div>
  );
}
