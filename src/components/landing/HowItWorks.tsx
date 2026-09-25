import { useTranslation } from "react-i18next";
import { Route } from "lucide-react";
import { Reveal, RevealStagger } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { SectionBackdrop } from "./SectionBackdrop";
import {
  m as motion, useReducedMotion } from "framer-motion";

type Step = { n: string; title: string; text: string };

const TINTS = ["var(--pastel-sky)", "var(--pastel-cream)", "var(--pastel-mint)"];

/**
 * HowItWorks - three pastel color blocks with giant condensed numerals,
 * staggered on scroll with a subtle rotate on hover. Reels-style.
 */
export function HowItWorks() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const _stepsRaw = t("how.steps", { returnObjects: true }) as unknown;
  const steps: Step[] = Array.isArray(_stepsRaw) ? (_stepsRaw as Step[]) : ([] as unknown as Step[]);

  return (
    <section id="how" className="relative isolate overflow-hidden bg-[color:var(--paper)]">
      <SectionBackdrop variant="mint" />

      <div className="mx-auto max-w-7xl px-5 py-24 md:py-32 lg:px-8">
        <div className="mb-14 max-w-4xl">
          <Reveal variant="fade">
            <Eyebrow icon={Route} label={t("ui.eyebrow.how")} />
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <h2
              className="mt-4 font-display text-4xl leading-[1.02] text-foreground sm:text-5xl md:text-[4rem]"
              style={{ letterSpacing: "-0.04em", fontWeight: 500 }}
            >
              {t("ui.how.h2Pre")}{" "}
              <span className="italic text-foreground/70">{t("ui.how.h2Highlight")}</span>
            </h2>
          </Reveal>
        </div>

        <RevealStagger className="grid gap-5 md:grid-cols-3" stagger={0.12}>
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              variants={{
                hidden: { opacity: 0, y: 60, rotateX: -12 },
                show: { opacity: 1, y: 0, rotateX: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -8, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[28px] p-7 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]"
              style={{ background: TINTS[i % TINTS.length] }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/70">
                {t("ui.how.stepLabel")} {s.n}
              </span>
              <div
                className="font-display leading-none text-foreground/90"
                style={{ fontSize: "8rem", letterSpacing: "-0.08em" }}
              >
                {s.n}
              </div>
              <div>
                <h3 className="font-display text-2xl font-normal leading-snug text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">{s.text}</p>
              </div>
            </motion.article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
