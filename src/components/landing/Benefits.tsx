import { useTranslation } from "react-i18next";
import {
  Sparkles,
  MessagesSquare,
  Presentation,
  Mail,
  Zap,
  TrendingUp,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { HoverArrowButton } from "./HoverArrowButton";
import { SectionBackdrop } from "./SectionBackdrop";

type OutcomeMeta = {
  tone: "dark" | "light";
  icon: LucideIcon;
  rotate: string;
};

const META: OutcomeMeta[] = [
  { tone: "dark",  icon: MessagesSquare, rotate: "rotate-[1.5deg]" },
  { tone: "light", icon: Presentation,   rotate: "-rotate-[1.5deg]" },
  { tone: "dark",  icon: Mail,           rotate: "rotate-[1deg]" },
  { tone: "light", icon: Zap,            rotate: "-rotate-[2deg]" },
  { tone: "dark",  icon: TrendingUp,     rotate: "rotate-[0.5deg]" },
  { tone: "light", icon: Target,         rotate: "-rotate-[1deg]" },
];

const CAL_URL = "https://cal.com/linguasupra/analysiscall";

export function Benefits() {
  const { t } = useTranslation();
  const _itemsRaw = t("benefits.items", { returnObjects: true }) as unknown;
  const items: string[] = Array.isArray(_itemsRaw) ? (_itemsRaw as string[]) : [];

  return (
    <section id="outcomes" className="relative isolate overflow-x-clip">
      <SectionBackdrop variant="butter" />
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 md:pb-32 md:pt-24 lg:px-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14 lg:gap-20">
          {/* LEFT - sticky headline column */}
          <div>
            <div className="md:sticky md:top-24">
              <Reveal variant="fade">
                <Eyebrow icon={Sparkles} label={t("ui.eyebrow.outcomes")} />
              </Reveal>
              <Reveal variant="up" delay={0.05}>
                <h2
                  className="mt-4 font-display text-3xl leading-[1.02] text-foreground sm:text-4xl md:text-[3rem]"
                  style={{ letterSpacing: "-0.04em", fontWeight: 500 }}
                >
                  {t("ui.benefits.h2Pre")}{" "}
                  <span className="italic text-foreground/70">{t("ui.benefits.h2Highlight")}</span>
                </h2>
              </Reveal>
              <Reveal variant="up" delay={0.1}>
                <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
                  {t("ui.benefits.sub")}
                </p>
              </Reveal>
              <Reveal variant="up" delay={0.15}>
                <div className="mt-8 hidden md:block">
                  <HoverArrowButton
                    href={CAL_URL}
                    target="_blank"
                    rel="noreferrer"
                    variant="dark"
                  >
                    {t("ui.benefits.cta")}
                  </HoverArrowButton>
                </div>
              </Reveal>
            </div>
          </div>

          {/* RIGHT - rotated sticky stack (ui-layout style) */}
          <div className="relative grid gap-2">
            {items.map((line, i) => (
              <StackedOutcome
                key={i}
                line={line}
                index={i}
                total={items.length}
                meta={META[i % META.length]}
              />
            ))}
          </div>
        </div>

        <Reveal variant="up" delay={0.1}>
          <div className="mt-6 flex justify-center md:hidden">
            <HoverArrowButton
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              variant="dark"
            >
              Book your discovery call
            </HoverArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StackedOutcome({
  line,
  index,
  total,
  meta,
}: {
  line: string;
  index: number;
  total: number;
  meta: OutcomeMeta;
}) {
  const [head, ...rest] = line.split(" - ");
  const tail = rest.join(" - ");
  const Icon = meta.icon;
  const isDark = meta.tone === "dark";

  return (
    <figure className="sticky top-20 grid min-h-[60vh] place-content-center py-3 md:top-24 md:min-h-[calc(100vh-6rem)] md:py-6">
      <article
        className={`${meta.rotate} flex w-[min(82vw,380px)] flex-col justify-between rounded-2xl p-5 sm:p-6 md:w-[min(46vw,440px)] md:p-7 min-h-[280px] md:min-h-[340px] transition-transform ${
          isDark
            ? "bg-[#111111] text-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]"
            : "bg-white text-foreground border border-black/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]"
        }`}
      >
        <div>
          <div className="flex items-center justify-between gap-4">
            <span
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                isDark
                  ? "bg-white/10 text-white ring-1 ring-white/15"
                  : "bg-foreground text-background"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${
                isDark ? "text-white/50" : "text-foreground/45"
              }`}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3
            className={`mt-6 font-display text-xl leading-[1.15] sm:text-[1.5rem] ${
              isDark ? "text-white" : "text-foreground"
            }`}
            style={{ letterSpacing: "-0.03em", fontWeight: 500 }}
          >
            {head}
          </h3>
          {tail ? (
            <p
              className={`mt-3 text-sm leading-relaxed sm:text-[15px] ${
                isDark ? "text-white/70" : "text-foreground/70"
              }`}
            >
              {tail}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, d) => (
            <span
              key={d}
              className="h-1 rounded-full transition-all"
              style={{
                width: d === index ? 20 : 5,
                background:
                  d === index
                    ? isDark ? "#ffffff" : "#111111"
                    : isDark ? "rgba(255,255,255,0.2)" : "rgba(17,17,17,0.15)",
              }}
            />
          ))}
        </div>

      </article>
    </figure>
  );
}
