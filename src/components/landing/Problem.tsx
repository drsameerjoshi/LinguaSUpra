import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { AlertCircle } from "lucide-react";
import {
  m as motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { SectionBackdrop } from "./SectionBackdrop";

/**
 * Problem / "The gap" - the coach speaking directly to the reader in one
 * large body of copy. Words fade from light grey to near-black in sequence
 * as the section scrolls through the viewport.
 */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(
    progress,
    range,
    ["rgba(22,22,22,0.18)", "rgba(22,22,22,1)"],
  );
  return (
    <motion.span style={{ color }} className="inline-block mr-[0.28em]">
      {children}
    </motion.span>
  );
}

export function Problem() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Fire so words become dark when the section is around the middle of the viewport.
    offset: ["start 0.75", "start 0.25"],
  });

  const body = t("problem.body");
  const words = body.split(/\s+/);

  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--paper)]">
      <SectionBackdrop
        variant="blush"
        motif={
          <>
            <div
              className="absolute left-2 top-6 font-display text-[7rem] leading-none text-foreground/[0.06] sm:left-4 sm:top-10 sm:text-[10rem] md:left-6 md:top-16 md:text-[14rem] md:text-foreground/[0.05]"
              style={{ letterSpacing: "-0.08em" }}
            >
              &ldquo;
            </div>
            <div
              className="absolute right-2 bottom-6 font-display text-[7rem] leading-none text-foreground/[0.06] sm:right-4 sm:bottom-10 sm:text-[10rem] md:right-6 md:bottom-16 md:text-[14rem] md:text-foreground/[0.05]"
              style={{ letterSpacing: "-0.08em" }}
            >
              &rdquo;
            </div>
          </>
        }
      />
      <div className="mx-auto flex max-w-5xl flex-col justify-center px-5 py-12 sm:py-14 md:min-h-[calc(100svh-4.5rem)] md:py-16 lg:px-8">
        <div className="flex justify-center">
          <Reveal variant="fade">
            <Eyebrow icon={AlertCircle} label={t("ui.eyebrow.gap")} align="center" />
          </Reveal>
        </div>

        <Reveal variant="up" delay={0.05}>
          <h2
            className="mx-auto mt-6 max-w-4xl text-center font-display text-[1.75rem] leading-[1.05] text-foreground sm:text-3xl md:text-[2.5rem]"
            style={{ letterSpacing: "-0.035em", fontWeight: 500 }}
          >
            {t("problem.h2")}
          </h2>
        </Reveal>

        {/* Coach-voice long-form copy - reveals word-by-word on scroll */}
        <div
          ref={ref}
          className="mx-auto mt-8 max-w-3xl text-center font-display text-xl leading-[1.35] sm:text-2xl md:mt-10 md:text-[1.75rem] md:leading-[1.35]"
          style={{ letterSpacing: "-0.02em", fontWeight: 500 }}
        >
          <p className="flex flex-wrap justify-center">

            {words.map((w, i) => {
              const start = i / words.length;
              const end = Math.min(1, start + 1.5 / words.length);
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {w}
                </Word>
              );
            })}
          </p>
        </div>

        <Reveal variant="up" delay={0.1}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground md:mt-10 md:text-base">
            {t("problem.close")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
