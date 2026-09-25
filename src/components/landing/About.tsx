import { useTranslation } from "react-i18next";
import {
  m as motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, Sparkles, UserRound } from "lucide-react";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { SectionBackdrop } from "./SectionBackdrop";
import { TrustBadges } from "./TrustBadges";
import sujataPortraitAsset from "@/assets/sujata-about.webp.asset.json";
const sujataPortrait = sujataPortraitAsset.url;

/**
 * About - asymmetric split:
 *  - Left: tilted portrait tile in blush block, with a floating credentials
 *    chip and an "also known as Su" ribbon.
 *  - Right: eyebrow → headline → highlighted subheading → body → stats grid
 *    → expertise pills.
 */
export function About() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);


  return (
    <section ref={ref} id="about" className="relative isolate overflow-hidden">
      <SectionBackdrop variant="sky" />

      <div className="mx-auto max-w-7xl px-5 py-24 md:py-32 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* Portrait in pastel block */}
          <Reveal variant="left">
            <div
              className="relative overflow-visible rounded-[32px] p-6 md:p-8"
              style={{ background: "var(--pastel-blush)", perspective: 1200 }}
            >
              <motion.div
                initial={reduce ? undefined : { rotate: 0, y: 20, opacity: 0 }}
                whileInView={reduce ? undefined : { rotate: -3, y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { rotate: 0, scale: 1.02 }}
                style={reduce ? undefined : { y: portraitY }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
              >
                <img
                  src={sujataPortrait}
                  alt="Su, Business English executive coach"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />

              </motion.div>

              {/* Floating credential chip */}
              <div
                className="absolute -bottom-4 -left-3 hidden items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 shadow-[0_18px_36px_-18px_rgba(22,22,22,0.35)] sm:inline-flex md:-bottom-5 md:-left-4"
                aria-hidden
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background">
                  <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80">
                  CELTA · INFPC · TESOL
                </span>
              </div>




              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="font-display text-xl font-normal text-foreground">
                    Su
                  </div>
                  <div className="text-xs uppercase tracking-[0.14em] text-foreground/70">
                    {t("ui.about.role")}
                  </div>
                </div>
                <span
                  className="font-display leading-none text-foreground/85"
                  style={{ fontSize: "3.5rem", letterSpacing: "-0.06em" }}
                >
                  15+
                </span>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="flex flex-col justify-center">
            <Reveal variant="fade">
              <Eyebrow icon={UserRound} label={t("ui.eyebrow.about")} />
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <h2
                className="mt-4 font-display text-4xl leading-[0.98] text-foreground sm:text-5xl md:text-[4rem]"
                style={{ letterSpacing: "-0.04em", fontWeight: 500 }}
              >
                {t("ui.about.h2Pre")} <span className="italic text-foreground/70">{t("ui.about.h2Highlight")}</span>
              </h2>
            </Reveal>

            {/* Highlighted subheading */}
            <Reveal variant="up" delay={0.15}>
              <div className="mt-5">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-base font-semibold text-foreground shadow-[0_10px_24px_-16px_rgba(22,22,22,0.35)] sm:text-lg md:text-xl"
                  style={{
                    backgroundColor: "var(--ice-blue)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <Sparkles className="h-4 w-4" strokeWidth={2.25} />
                  {t("ui.about.badge")}
                </span>
              </div>
            </Reveal>


            <Reveal delay={0.2} variant="up">
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {t("about.body")}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Credibility stats moved here from the hero */}
        <div className="mt-14 md:mt-20">
          <TrustBadges embedded />
        </div>
      </div>
    </section>
  );
}
