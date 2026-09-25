import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LegalLayout, Section, LegalTable, type TocEntry } from "./LegalLayout";

export type LegalItem =
  | { p: string }
  | { table: { header: string; rows: string[] } }
  | { node: ReactNode };

export type LegalBlock = { title: string; items: LegalItem[] };

/**
 * Renders a legal page entirely from the `legal.<ns>` translation namespace so
 * EN / FR / DE stay in sync and switch instantly with the language toggle.
 */
export function LegalDoc({
  ns,
  slug,
  blocks,
  footerKey,
}: {
  ns: "legal" | "privacy" | "cookies" | "terms" | "disclaimer";
  slug: string;
  blocks: LegalBlock[];
  footerKey: string;
}) {
  const { t } = useTranslation();
  const s = (key: string) => t(`legal.${ns}.${key}`) as unknown as string;
  const arr = (key: string): string[] => {
    const v = t(`legal.${ns}.${key}`, { returnObjects: true }) as unknown;
    return Array.isArray(v) ? (v as string[]) : [String(v)];
  };

  const toc: TocEntry[] = blocks.map((b, i) => ({
    id: `section-${i + 1}`,
    label: s(b.title),
  }));

  // Estimated read time - 200 words / minute over every rendered string.
  const words = blocks
    .flatMap((b) => [
      s(b.title),
      ...b.items.flatMap((it) =>
        "p" in it ? [s(it.p)] : "table" in it ? [...arr(it.table.header), ...it.table.rows.flatMap((r) => arr(r))] : [],
      ),
    ])
    .join(" ")
    .trim()
    .split(/\s+/).length;
  const readMinutes = Math.max(1, Math.round(words / 200));

  return (
    <LegalLayout
      toc={toc}
      readMinutes={readMinutes}
      eyebrow={s("eyebrow")}
      title={s("title")}
      slug={slug}
      updated={s("updated")}
      intro={s("intro")}
      footer={s(footerKey)}
    >
      {blocks.map((block, i) => (
        <Section key={i} id={`section-${i + 1}`} title={s(block.title)}>
          {block.items.map((item, j) => {
            if ("p" in item) return <p key={j}>{s(item.p)}</p>;
            if ("table" in item)
              return (
                <LegalTable
                  key={j}
                  headers={arr(item.table.header)}
                  rows={item.table.rows.map((r) => arr(r))}
                />
              );
            return <div key={j}>{item.node}</div>;
          })}
        </Section>
      ))}
    </LegalLayout>
  );
}
