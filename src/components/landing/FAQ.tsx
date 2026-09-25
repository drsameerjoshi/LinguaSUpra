import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HelpCircle, Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { SectionBackdrop } from "./SectionBackdrop";
import { cn } from "@/lib/utils";

type Q = { q: string; a: string };

function FAQItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: Q;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "group border-b border-black/10 transition-colors last:border-b-0",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-6 py-6 text-left"
      >
        <h3
          className={cn(
            "flex-1 font-display text-lg leading-snug transition-colors sm:text-xl",
            open ? "text-foreground" : "text-foreground/80 group-hover:text-foreground",
          )}
          style={{ letterSpacing: "-0.02em", fontWeight: 500 }}
        >
          {item.q}
        </h3>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center text-foreground/60 transition-transform duration-300",
            open && "rotate-45 text-foreground",
          )}
          aria-hidden
        >
          <Plus className="h-5 w-5" strokeWidth={1.5} />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-6 pr-4 sm:pr-14">
            <p className="max-w-2xl text-base leading-[1.7] text-muted-foreground">
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export function FAQ() {
  const { t } = useTranslation();
  const _raw = t("faq.items", { returnObjects: true }) as unknown;
  const items: Q[] = Array.isArray(_raw) ? (_raw as Q[]) : [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative isolate overflow-hidden">
      <SectionBackdrop variant="cream" />

      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
          {/* Left column - heading */}
          <div className="lg:pt-4">
            <Reveal variant="fade">
              <Eyebrow icon={HelpCircle} label={t("ui.eyebrow.faq")} align="start" />
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <h2
                className="mt-6 font-display text-4xl leading-[1.02] text-foreground sm:text-5xl md:text-[3.5rem]"
                style={{ letterSpacing: "-0.04em", fontWeight: 500 }}
              >
                {t("ui.faq.h2Pre")}{" "}
                <span className="italic text-foreground/70">{t("ui.faq.h2Highlight")}</span>
              </h2>
            </Reveal>
            <Reveal variant="up" delay={0.15}>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
                {t("ui.faq.sub")}
              </p>
            </Reveal>
          </div>

          {/* Right column - accordion */}
          <Reveal variant="up" delay={0.15}>
            <div className="border-t border-black/10">
              {items.map((item, i) => (
                <FAQItem
                  key={i}
                  item={item}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
