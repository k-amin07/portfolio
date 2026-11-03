"use client";

/**
 * Where the device can share files (phones, Safari), opens the share sheet
 * with the PDF attached, so Mail gets the actual file. Everywhere else it
 * opens the default mail app with a link to the PDF, since mailto: links
 * cannot carry attachments.
 */
export function EmailResumeButton({
  pdfPath,
  publicUrl,
  fileName,
  subject,
  body,
  className,
}: {
  pdfPath: string;
  publicUrl: string;
  fileName: string;
  subject: string;
  body: string;
  className?: string;
}) {
  async function onClick() {
    try {
      if (typeof navigator.canShare === "function") {
        const blob = await (await fetch(pdfPath)).blob();
        const file = new File([blob], fileName, { type: "application/pdf" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: subject, text: body });
          return;
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return; // user closed the sheet
    }
    const text = `${body}\n\n${publicUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.5" />
        <path d="m2.5 4.5 5.5 4 5.5-4" />
      </svg>
      Email it
    </button>
  );
}
