"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from "pdfjs-dist";

/**
 * Renders a PDF in the page with pdf.js (works the same on desktop and
 * phones, where browsers often refuse to show PDFs inline). Each page is a
 * canvas sized to its container, with the PDF's links laid over it.
 */
export function ResumeViewer({ src, title }: { src: string; title: string }) {
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loading: PDFDocumentLoadingTask | null = null;
    (async () => {
      const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
      loading = pdfjs.getDocument({ url: src });
      const loaded = await loading.promise;
      if (!cancelled) setDoc(loaded);
    })().catch(() => {
      if (!cancelled) setFailed(true);
    });
    return () => {
      cancelled = true;
      loading?.destroy();
    };
  }, [src]);

  if (failed) {
    return (
      <div className="rounded-xl border border-line bg-surface p-8 text-center text-muted">
        The preview couldn&apos;t load here.{" "}
        <a href={src} className="link text-fg">
          Open the PDF
        </a>{" "}
        instead.
      </div>
    );
  }

  if (!doc) {
    return (
      <div
        className="flex w-full items-center justify-center rounded-lg border border-line bg-surface text-sm text-muted"
        style={{ aspectRatio: "8.5 / 11" }}
        role="status"
      >
        Loading résumé…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Array.from({ length: doc.numPages }, (_, i) => (
        <PdfPage key={i} doc={doc} pageNumber={i + 1} label={`${title}, page ${i + 1} of ${doc.numPages}`} />
      ))}
    </div>
  );
}

type LinkBox = { left: number; top: number; width: number; height: number; url: string };

function PdfPage({ doc, pageNumber, label }: { doc: PDFDocumentProxy; pageNumber: number; label: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ratio, setRatio] = useState(11 / 8.5);
  const [links, setLinks] = useState<LinkBox[]>([]);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    let task: RenderTask | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastWidth = 0;
    const pagePromise = doc.getPage(pageNumber);

    async function render() {
      const width = box!.clientWidth;
      if (!width || width === lastWidth) return;
      lastWidth = width;
      const page = await pagePromise;
      const base = page.getViewport({ scale: 1 });
      setRatio(base.height / base.width);

      const scale = width / base.width;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const viewport = page.getViewport({ scale: scale * dpr });
      task?.cancel();
      canvas!.width = Math.floor(viewport.width);
      canvas!.height = Math.floor(viewport.height);
      task = page.render({ canvas: canvas!, viewport });
      try {
        await task.promise;
      } catch {
        return; // cancelled by a newer render
      }

      const css = page.getViewport({ scale });
      const annotations = await page.getAnnotations();
      setLinks(
        annotations
          .filter((a) => a.subtype === "Link" && typeof a.url === "string")
          .map((a) => {
            const [x1, y1] = css.convertToViewportPoint(a.rect[0], a.rect[1]);
            const [x2, y2] = css.convertToViewportPoint(a.rect[2], a.rect[3]);
            return {
              left: Math.min(x1, x2),
              top: Math.min(y1, y2),
              width: Math.abs(x2 - x1),
              height: Math.abs(y2 - y1),
              url: a.url as string,
            };
          }),
      );
    }

    render();
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(render, 120);
    });
    observer.observe(box);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      task?.cancel();
    };
  }, [doc, pageNumber]);

  return (
    <div
      ref={boxRef}
      className="relative w-full overflow-hidden rounded-lg border border-line bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.18)]"
      style={{ aspectRatio: `1 / ${ratio}` }}
    >
      <canvas ref={canvasRef} role="img" aria-label={label} className="block h-full w-full" />
      {links.map((l, i) => (
        <a
          key={`${l.url}-${i}`}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          aria-label={l.url}
          className="absolute rounded-sm transition-colors hover:bg-[#2448c9]/10"
          style={{ left: l.left, top: l.top, width: l.width, height: l.height }}
        />
      ))}
    </div>
  );
}
