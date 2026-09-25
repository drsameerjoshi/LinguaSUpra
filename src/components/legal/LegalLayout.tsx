import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Clock, List } from "lucide-react";
import { LanguageToggle } from "@/components/landing/LanguageToggle";
import { cn } from "@/lib/utils";

export type TocEntry = { id: string; label: string };

/**
 * Shared shell for the five legal pages. Uses the same brand tokens as the
 * marketing site (navy accents, off-white surfaces, display font for
 * headings) so legal reads as part of the site - not a bolted-on template.
 * Adds a language switcher, an estimated read time and a side-by-side,
 * scroll-spying table of contents.
 */
export function LegalLayout({
  eyebrow,
  title,
  slug,
  updated,
  intro,
  footer,
  toc = [],
  readMinutes,
  children,
}: {
  eyebrow?: string;
  title: string;
  slug: string;
  updated: string;
  intro?: ReactNode;
  footer?: ReactNode;
  toc?: TocEntry[];
  readMinutes?: number;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  const [active, setActive] = useState<string>(toc[0]?.id ?? "");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    toc.forEach((e) => {
      const el = document.getElementById(e.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      setTocOpen(false);
    }
  };

  const tocList = (
    <nav aria-label={t("legal.ui.toc")} className="space-y-1">
      {toc.map((entry) => (
        <button
          key={entry.id}
          type="button"
          onClick={() => go(entry.id)}
          className={cn(
            "group flex w-full items-start gap-2 rounded-xl px-3 py-2 text-left text-[13px] leading-snug transition-colors",
            active === entry.id
              ? "bg-[color:var(--off-white)] font-medium text-foreground"
              : "text-foreground/60 hover:bg-[color:var(--off-white)]/70 hover:text-foreground",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
              active === entry.id
                ? "bg-[color:var(--navy)]"
                : "bg-foreground/20 group-hover:bg-foreground/40",
            )}
          />
          <span>{entry.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <div className="bg-[color:var(--pure-white)]">
      {/* Hero */}
      <header className="border-b border-[color:var(--light-gray)] bg-[color:var(--off-white)]">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-14 lg:px-8 lg:pt-24 lg:pb-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              {t("legal.ui.back")}
            </Link>
            <LanguageToggle />
          </div>

          {eyebrow ? (
            <div className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-foreground/50">
              {eyebrow}
            </div>
          ) : null}

          <h1
            className="mt-4 max-w-3xl font-display text-3xl leading-[1.08] text-foreground sm:text-4xl md:text-[3.25rem] md:leading-[1.05]"
            style={{ letterSpacing: "-0.035em", fontWeight: 500 }}
          >
            {title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex flex-wrap items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--navy)]" />
              {t("legal.ui.page")}: <code className="font-mono text-foreground/80">{slug}</code>
            </span>
            <span>
              {t("legal.ui.updated")}: {updated}
            </span>
            {readMinutes ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--light-gray)] bg-white px-3 py-1 text-xs font-medium text-foreground/70">
                <Clock className="h-3.5 w-3.5" />
                {readMinutes} {t("legal.ui.readTime")}
              </span>
            ) : null}
          </div>

          {intro ? (
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground/75">{intro}</p>
          ) : null}
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_248px] lg:gap-14">
          <main className="min-w-0">
            {/* Mobile / tablet TOC */}
            {toc.length ? (
              <div className="mb-10 rounded-2xl border border-[color:var(--light-gray)] bg-[color:var(--off-white)]/60 lg:hidden">
                <button
                  type="button"
                  onClick={() => setTocOpen((v) => !v)}
                  aria-expanded={tocOpen}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground"
                >
                  <span className="inline-flex items-center gap-2">
                    <List className="h-4 w-4" />
                    {t("legal.ui.toc")}
                  </span>
                  <span className="text-xs text-muted-foreground">{toc.length}</span>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-[max-height,opacity] duration-300",
                    tocOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="px-2 pb-3">{tocList}</div>
                </div>
              </div>
            ) : null}

            <article className="legal-prose space-y-10 text-[15.5px] leading-[1.75] text-foreground/85 [overflow-wrap:anywhere]">
              {children}
            </article>

            <div className="mt-16 border-t border-[color:var(--light-gray)] pt-8 text-sm text-muted-foreground">
              {footer ? (
                <p>{footer}</p>
              ) : (
                <p>
                  Questions about this page? Email{" "}
                  <a
                    href="mailto:hello@linguasupra.com"
                    className="text-foreground underline underline-offset-4 hover:text-[color:var(--navy)]"
                  >
                    hello@linguasupra.com
                  </a>{" "}
                  or call +352 661 502 425.
                </p>
              )}
            </div>
          </main>

          {/* Desktop side-by-side TOC */}
          {toc.length ? (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                  {t("legal.ui.toc")}
                </div>
                <div className="max-h-[70vh] overflow-y-auto pr-1">{tocList}</div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}


export function Section({
  id,
  number: _number,
  title,
  children,
}: {
  id?: string;
  number?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[color:var(--light-gray)]/70 pt-10 first:border-t-0 first:pt-0">
      <h2
        className="font-display text-[1.7rem] leading-tight text-foreground sm:text-3xl"
        style={{ letterSpacing: "-0.025em", fontWeight: 500 }}
      >
        {title}
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function SubSection({
  number: _number,
  title,
  children,
}: {
  number?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-6">
      <h3
        className="font-display text-xl text-foreground"
        style={{ fontWeight: 500, letterSpacing: "-0.015em" }}
      >
        {title}
      </h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

export function LegalTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-[color:var(--light-gray)] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[color:var(--off-white)]">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="border-b border-[color:var(--light-gray)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/70"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[color:var(--light-gray)]/70 last:border-b-0 align-top"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 leading-relaxed text-foreground/80 ${
                      j === 0 && headers.length > 1 ? "font-medium text-foreground" : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Callout({
  tone = "info",
  children,
}: {
  tone?: "info" | "warn";
  children: ReactNode;
}) {
  const styles =
    tone === "warn"
      ? "border-amber-300/70 bg-amber-50 text-amber-900"
      : "border-[color:var(--light-gray)] bg-[color:var(--off-white)] text-foreground/80";
  return (
    <div className={`my-4 rounded-xl border px-4 py-3 text-sm ${styles}`}>{children}</div>
  );
}
