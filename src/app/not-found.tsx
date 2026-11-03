import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-32 sm:px-6">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
        Nothing here. Not even a cached verdict.
      </h1>
      <p className="mt-4 text-muted">
        The page you asked for doesn&apos;t exist, or it moved.{" "}
        <Link href="/" className="link text-fg">
          Back to the home page
        </Link>
        .
      </p>
    </div>
  );
}
