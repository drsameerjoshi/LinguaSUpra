import { useTranslation } from "react-i18next";
import { ArrowUpRight, Linkedin, MessageCircle, Quote, Sparkles, Award, Users } from "lucide-react";
import {
  m as motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import sujataHero from "@/assets/sujata-hero.webp";
import photoNathalie from "@/assets/testimonials/nathalie-demeurs.webp";
import photoRene from "@/assets/testimonials/rene-drabo.webp";
import photoLaurence from "@/assets/testimonials/laurence-iorio.webp";
import photoBenoit from "@/assets/testimonials/benoit-manns.webp";
import photoWidad from "@/assets/testimonials/widad-takief.webp";
import photoMylene from "@/assets/testimonials/mylene-di-nino.webp";

const CLIENT_AVATARS = [
  { src: photoNathalie, name: "Nathalie Demeurs" },
  { src: photoRene, name: "Mounkeila Rene Drabo" },
  { src: photoLaurence, name: "Laurence Iorio" },
  { src: photoBenoit, name: "Benoit Manns" },
  { src: photoWidad, name: "Widad Takief" },
  { src: photoMylene, name: "Mylene Di Nino" },
];

const CAL_URL = "https://cal.com/linguasupra/analysiscall";
const WA_URL = "https://wa.me/352661502425";
const LINKEDIN_URL = "https://www.linkedin.com/";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero - full-viewport editorial layout with a large centered portrait,
 * flanked by symmetrical info cards (certifications left, leaders coached
 * right). Minimal pill CTAs sit under the portrait; a single trust marquee
 * runs at the very bottom. Fully responsive across mobile/tablet/desktop.
 */
export function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const rise = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };
  const fromLeft = {
    hidden: { opacity: 0, x: -28 },
    show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
  };
  const fromRight = {
    hidden: { opacity: 0, x: 28 },
    show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <motion.section
      ref={ref}
      id="top"
      initial="hidden"
      animate="show"
      variants={stagger}
      className="relative isolate overflow-hidden bg-[color:var(--paper)]"
      style={{ minHeight: "100dvh" }}
    >
      {/* ============ Layered background decor ============ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 42%, color-mix(in oklab, var(--pastel-blush) 85%, transparent), transparent 65%), radial-gradient(50% 45% at 85% 80%, color-mix(in oklab, var(--ice-blue) 75%, transparent), transparent 70%), radial-gradient(45% 40% at 12% 85%, color-mix(in oklab, var(--pastel-sky) 70%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col px-5 pt-20 pb-6 md:pt-24 lg:px-8">
        {/* ======= Top row: eyebrow ======= */}
        <div className="flex justify-center">
          <span className="inline-flex max-w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-border/70 bg-white/80 px-3.5 py-1.5 text-center text-[10px] font-medium uppercase tracking-[0.1em] sm:px-4 sm:text-[11px] sm:tracking-[0.16em] text-foreground/75 shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {t("hero.eyebrow")}
          </span>
        </div>

        {/* ======= Headline ======= */}
        <h1
          className="mx-auto mt-4 max-w-5xl text-center font-display leading-[0.95] text-foreground"
          style={{
            fontSize: "clamp(2rem, 5.2vw, 4.6rem)",
            letterSpacing: "-0.04em",
            fontWeight: 500,
          }}
        >
          {t("hero.h1Pre")}{" "}
          <span className="relative inline-block italic">
            <span
              style={{
                background:
                  "linear-gradient(120deg, var(--brand-navy) 0%, color-mix(in oklab, var(--brand-navy) 55%, #7d8ba8) 60%, var(--brand-navy) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t("hero.h1Highlight")}
            </span>
            <motion.svg
              aria-hidden
              viewBox="0 0 300 14"
              className="absolute -bottom-2 left-0 h-3 w-full"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 1.1, ease: EASE }}
            >
              <motion.path
                d="M2 8 C 80 2, 200 14, 298 6"
                fill="none"
                stroke="color-mix(in oklab, var(--brand-navy) 55%, transparent)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>
        </h1>

        {/* ======= Main grid ======= */}
        <div className="relative mt-6 grid flex-1 min-h-0 grid-cols-12 items-center gap-4 md:mt-8 md:gap-6">
          {/* -------- LEFT: LinkedIn + Certifications card -------- */}
          <motion.aside
            variants={fromLeft}
            className="order-2 col-span-12 flex flex-col items-center gap-4 md:order-1 md:col-span-3 md:items-start"
          >
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--light-gray)] bg-white/80 pl-2 pr-4 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0A66C2] text-white">
                <Linkedin className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
              LinkedIn
            </a>

            {/* Certifications card */}
            <div className="w-full max-w-xs rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_14px_40px_-24px_rgba(20,20,40,0.4)] backdrop-blur">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-foreground/70" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/60">
                  {t("ui.hero.certifications")}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["CELTA", "INFPC", "TESOL"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-[color:var(--brand-navy)] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
                {t("ui.hero.certNote")}
              </p>
            </div>
          </motion.aside>

          {/* -------- CENTER: Portrait -------- */}
          <div className="relative order-1 col-span-12 mt-10 flex items-end justify-center sm:mt-12 md:order-2 md:col-span-6 md:mt-14">
            {/* Orbital ring - wraps around the portrait */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.92, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 1.4, ease: EASE }}
              className="pointer-events-none absolute left-1/2 top-[64%] aspect-square w-[min(104%,530px)] -translate-x-1/2 -translate-y-1/2 sm:top-[63%] sm:w-[min(100%,620px)] md:top-[60%] md:w-[min(100%,660px)]"
            >
              <div
                className="absolute inset-[7%] rounded-full border"
                style={{
                  borderColor: "color-mix(in oklab, var(--brand-navy) 12%, transparent)",
                }}
              />
              <div
                className="absolute inset-[12%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--pastel-blush) 85%, white) 0%, color-mix(in oklab, var(--ice-blue) 55%, transparent) 58%, transparent 78%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{ animation: reduce ? undefined : "spin 90s linear infinite" }}
              >
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full"
                    style={{
                      background: i % 2 ? "var(--brand-navy)" : "var(--pastel-blush)",
                      transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-50%)`,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Portrait - bottom dissolves into the CTA area below */}
            <motion.img
              src={sujataHero}
              alt="Su, Business English executive coach"
              loading="eager"
              fetchPriority="high"
              width={616}
              height={1000}
              className="relative z-10 -mb-4 h-auto w-auto max-h-[58vh] max-w-full object-contain sm:max-h-[68vh] md:-mb-8 md:max-h-[74vh]"
              style={{
                transformOrigin: "bottom center",
                scale: 1,
                ...(reduce ? {} : { y: portraitY }),
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.97) 85%, rgba(0,0,0,0.88) 89%, rgba(0,0,0,0.7) 92%, rgba(0,0,0,0.45) 95%, rgba(0,0,0,0.2) 97.5%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.97) 85%, rgba(0,0,0,0.88) 89%, rgba(0,0,0,0.7) 92%, rgba(0,0,0,0.45) 95%, rgba(0,0,0,0.2) 97.5%, rgba(0,0,0,0) 100%)",
              }}
            />


          </div>

          {/* -------- RIGHT: Leaders coached card -------- */}
          <motion.aside
            variants={fromRight}
            className="order-3 col-span-12 flex flex-col items-center gap-4 md:col-span-3 md:items-end"
          >
            <div className="w-full max-w-xs rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_14px_40px_-24px_rgba(20,20,40,0.4)] backdrop-blur">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-foreground/70" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/60">
                  {t("ui.hero.leadersCoached")}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span
                  className="font-display text-4xl leading-none text-foreground"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  200
                </span>
                <span className="font-display text-2xl text-foreground/60">+</span>
              </div>
              <div className="mt-2 flex items-center -space-x-2">
                {CLIENT_AVATARS.slice(0, 5).map((a) => (
                  <img
                    key={a.name}
                    src={a.src}
                    alt={a.name}
                    title={a.name}
                    loading="lazy"
                    decoding="async"
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full border-2 border-white object-cover object-center shadow-sm"
                  />
                ))}
                <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[color:var(--brand-navy)] text-[9px] font-semibold text-white shadow-sm">
                  +
                </span>
              </div>
              <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
                {t("ui.hero.clientsNote")}
              </p>
            </div>

            <div className="hidden md:block md:max-w-xs md:text-right">
              <Quote className="ml-auto h-4 w-4 text-foreground/60" />
              <p className="mt-2 text-[13px] leading-relaxed text-foreground/85">
                {t("hero.sub")}
              </p>
            </div>
          </motion.aside>
        </div>

        {/* ======= CTAs - minimal pill buttons ======= */}
        <motion.div
          variants={rise}
          className="relative z-20 mt-6 pb-4 flex sm:mt-1 flex-col items-center justify-center gap-3 sm:flex-row md:-mt-2"
        >
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {t("hero.primaryCta")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2 text-sm font-medium text-white shadow-[0_10px_28px_-14px_rgba(37,211,102,0.7)] transition hover:-translate-y-0.5 hover:bg-[#1FB855]"
          >
            <MessageCircle className="h-4 w-4" />
            {t("hero.secondaryCta")}
          </a>
        </motion.div>

      </div>
    </motion.section>
  );
}
