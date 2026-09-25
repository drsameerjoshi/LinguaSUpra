import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Users,
  Presentation,
  Handshake,
  Mail,
  Crown,
  Globe,
  BookOpen,
  Briefcase,
  Check,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { HoverArrowButton } from "./HoverArrowButton";
import {
  AnimatePresence,
  m as motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { SectionBackdrop } from "./SectionBackdrop";

const CAL_URL = "https://cal.com/linguasupra/analysiscall";

type Card = { title: string; text: string };
type MetaCopy = { chips: string[]; outcome: string };

const ICONS: LucideIcon[] = [
  Users,
  Presentation,
  Handshake,
  Mail,
  Crown,
  Globe,
  BookOpen,
  Briefcase,
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Programmes() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const raw = t("programmes.cards", { returnObjects: true }) as unknown;
  const cards: Card[] = Array.isArray(raw) ? (raw as Card[]) : [];
  const metaRaw = t("ui.programmes.meta", { returnObjects: true }) as unknown;
  const metaCopy: MetaCopy[] = Array.isArray(metaRaw) ? (metaRaw as MetaCopy[]) : [];
  const deliveryRaw = t("ui.programmes.delivery", { returnObjects: true }) as unknown;
  const delivery: string[] = Array.isArray(deliveryRaw) ? (deliveryRaw as string[]) : [];

  const total = cards.length || 1;
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
    setIndex((prev) => (prev === next ? prev : next));
  });

  const card = cards[index];
  const copy = metaCopy[index] ?? { chips: [], outcome: "" };
  const Icon = ICONS[index % ICONS.length];

  // Absolute-positioned layers: the card never resizes with the content.
  const layer = "absolute inset-0";
  const slide = {
    enter: { y: reduce ? 0 : 28, opacity: 0, filter: reduce ? "none" : "blur(6px)" },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
    },
    exit: {
      y: reduce ? 0 : -28,
      opacity: 0,
      filter: reduce ? "none" : "blur(6px)",
      transition: { duration: 0.45, ease: EASE },
    },
  };

  return (
    <section id="programmes" className="relative isolate">
      <SectionBackdrop variant="lilac" />
      <div className="mx-auto max-w-7xl px-5 pb-24 md:pb-32 lg:px-8">
        <div className="pt-16 md:pt-24">
          {/* Scroll-driven single black card; heading travels with the card */}
          <div
            ref={container}
            className="relative z-10"
            style={{ height: `${total * 85}vh` }}
          >
            <div className="sticky top-0 flex h-[100svh] flex-col justify-start pt-4 pb-3 md:justify-center md:pt-8 md:pb-8">
              <div className="relative z-30 shrink-0">
                <Reveal variant="fade">
                  <Eyebrow icon={Layers} label={t("ui.eyebrow.programmes")} />
                </Reveal>
                <Reveal variant="up" delay={0.05}>
                  <h2
                    className="mt-2.5 max-w-3xl font-display text-3xl leading-[1.02] text-foreground sm:text-4xl md:mt-3 md:text-5xl"
                    style={{ letterSpacing: "-0.04em", fontWeight: 500 }}
                  >
                    {t("programmes.h2")}
                  </h2>
                </Reveal>
              </div>

              <article
                className="relative mt-4 w-full overflow-hidden rounded-[28px] bg-[#0B0B0F] text-white shadow-[0_40px_100px_-50px_rgba(10,10,25,0.8)] md:mt-7 md:rounded-[36px]"
                style={{ height: "min(620px, calc(100svh - 13rem))" }}
              >

                {/* soft brand glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 85% 10%, color-mix(in oklab, var(--brand-navy) 60%, transparent), transparent 70%), radial-gradient(50% 50% at 5% 95%, color-mix(in oklab, var(--pastel-blush) 22%, transparent), transparent 70%)",
                  }}
                />

                <div className="relative grid h-full grid-rows-[minmax(0,1fr)_auto] gap-0 px-4 pb-6 pt-4 md:p-10 lg:p-14">
                  <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-3 md:grid-cols-[1.05fr_1fr] md:grid-rows-none md:gap-10">
                    {/* LEFT: number + heading */}
                    <div className="flex min-h-0 min-w-0 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span
                            className="block font-display leading-none text-white"
                            style={{
                              fontSize: "clamp(2rem, 5.5vw, 4rem)",
                              letterSpacing: "-0.05em",
                            }}
                          >
                            {String(index + 1).padStart(2, "0")}
                            <span className="text-white/35">
                              {" "}
                              / {String(total).padStart(2, "0")}
                            </span>
                          </span>
                          <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.28em] text-white/50 sm:text-[11px]">
                            {t("ui.programmes.cardLabel")}
                          </span>
                        </div>
                        <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white sm:inline-flex md:h-12 md:w-12">
                          <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.6} />
                        </span>
                      </div>

                      {/* fixed-size stage: content is absolutely layered */}
                      <div className="relative mt-3 min-h-[5rem] flex-1 md:mt-6 md:min-h-[5.25rem]">
                        <AnimatePresence initial={false}>
                          <motion.div
                            key={`l-${index}`}
                            variants={slide}
                            initial="enter"
                            animate="show"
                            exit="exit"
                            className={layer}
                          >
                            <h3
                              className="font-display font-normal leading-[0.98] text-white"
                              style={{
                                fontSize: "clamp(1.45rem, 3.2vw, 2.6rem)",
                                letterSpacing: "-0.04em",
                              }}
                            >
                              {card?.title}
                            </h3>
                            <p className="mt-2 line-clamp-2 max-w-md text-[13px] leading-[1.45] text-white/65 md:mt-5 md:line-clamp-none md:text-base md:leading-relaxed">
                              {card?.text}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* RIGHT: details - fixed-size stage */}
                    <div className="relative min-h-0">
                      <AnimatePresence initial={false}>
                        <motion.div
                          key={`r-${index}`}
                          variants={slide}
                          initial="enter"
                          animate="show"
                          exit="exit"
                          className={`${layer} flex min-w-0 flex-col justify-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-sm md:justify-center md:p-7`}
                        >
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 md:text-[11px]">
                            {t("ui.programmes.practiseLabel")}
                          </span>
                          <ul className="mt-1.5 space-y-1 md:mt-3.5 md:space-y-2.5">
                            {copy.chips.map((chip, i) => (
                              <li
                                key={chip}
                                className={`items-start gap-2 text-[13px] text-white/85 md:gap-3 md:text-[15px] ${
                                  i >= 3 ? "hidden md:flex" : "flex"
                                }`}
                              >
                                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#0B0B0F]">
                                  <Check className="h-3 w-3" strokeWidth={3} />
                                </span>
                                <span className="leading-snug">{chip}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-2.5 border-t border-white/10 pt-2.5 md:mt-5 md:pt-5">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 md:text-[11px]">
                              {t("ui.programmes.deliveryLabel")}
                            </span>
                            <ul className="mt-2 flex flex-wrap gap-1.5 md:mt-3">
                              {delivery.map((d) => (
                                <li
                                  key={d}
                                  className="rounded-full border border-white/12 bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium leading-tight text-white/75 md:text-xs"
                                >
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-2.5 flex items-center gap-2 border-t border-white/10 pt-2.5 md:mt-5 md:gap-3 md:pt-5">
                            <span
                              aria-hidden
                              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white md:h-8 md:w-8"
                            >
                              <Check className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2.5} />
                            </span>
                            <p
                              className="font-display text-[13px] leading-tight text-white md:text-base"
                              style={{ letterSpacing: "-0.02em" }}
                            >
                              {copy.outcome}
                            </p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* progress - always pinned to the card bottom */}
                  <div className="mt-3 flex items-center gap-1.5 md:mt-8">
                    {cards.map((c, i) => (
                      <span
                        key={c.title}
                        className="h-[3px] flex-1 rounded-full transition-colors duration-500"
                        style={{
                          background:
                            i <= index ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.16)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <Reveal delay={0.1} variant="up">
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-[color:var(--light-gray)] bg-[color:var(--paper)] p-6 md:flex-row md:items-center md:p-8">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("programmes.audienceNote")}
            </p>
            <HoverArrowButton
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              variant="dark"
              className="shrink-0"
            >
              {t("programmes.cta")}
            </HoverArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
