import { useTranslation } from "react-i18next";
import {
  m as motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { HoverArrowButton } from "./HoverArrowButton";

const CAL_URL = "https://cal.com/linguasupra/analysiscall";

/**
 * FinalCTA - dark rounded slab with giant uppercase headline, inline pill
 * highlight on the closing phrase, dark pill CTA with icon chip. Reels-style.
 */
export function FinalCTA() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <section className="px-5 pb-24 md:pb-32 lg:px-8">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-foreground px-6 py-20 text-background md:px-14 md:py-28">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          animate={
            reduce
              ? undefined
              : { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "radial-gradient(60% 60% at 80% 20%, color-mix(in oklab, var(--pastel-sky) 30%, transparent), transparent 70%), radial-gradient(60% 60% at 20% 80%, color-mix(in oklab, var(--pastel-lilac) 30%, transparent), transparent 70%)",
            backgroundSize: "200% 200%",
            opacity: 0.5,
          }}
        />


        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal variant="up">
            <h2
              className="font-display text-4xl leading-[1.02] sm:text-5xl md:text-[4.5rem]"
              style={{ letterSpacing: "-0.04em", fontWeight: 500 }}
            >
              {t("ui.finalCta.h2Pre")}{" "}
              <span className="italic text-background/75">{t("ui.finalCta.h2Highlight")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} variant="up">
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-background/75 md:text-lg">
              {t("finalCta.body")}
            </p>
          </Reveal>
          <Reveal delay={0.25} variant="scale">
            <div className="mt-10 flex flex-col items-center gap-4">
              <HoverArrowButton href={CAL_URL} target="_blank" rel="noreferrer" variant="light">
                {t("finalCta.primary")}
              </HoverArrowButton>
              <p className="text-sm text-background/70">{t("finalCta.secondary")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
