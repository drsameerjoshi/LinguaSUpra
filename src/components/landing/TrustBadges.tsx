import { useTranslation } from "react-i18next";
import { Award, Globe2, Users, Sparkles, ShieldCheck } from "lucide-react";
import { Reveal, RevealStagger } from "./Reveal";
import { m as motion } from "framer-motion";

/**
 * TrustBadges - single lightweight credibility strip that sits under the
 * Hero. Four proof points with naturally-colored icon chips (not mono),
 * one line of certifications underneath, no marquee, no duplicated stats.
 */

const STATS = [
  {
    icon: Users,
    value: "200+",
    tint: "var(--pastel-blush)",
    fg: "#B4306B",
  },
  {
    icon: Award,
    value: "15+",
    tint: "var(--pastel-butter)",
    fg: "#B7791F",
  },
  {
    icon: Globe2,
    value: "9",
    tint: "var(--pastel-sky)",
    fg: "#1D6FB8",
  },
  {
    icon: Sparkles,
    value: "",
    tint: "var(--pastel-mint)",
    fg: "#237A5C",
  },
];

export function TrustBadges({ embedded = false }: { embedded?: boolean }) {
  const { t } = useTranslation();
  const labelsRaw = t("ui.trust.labels", { returnObjects: true }) as unknown;
  const labels: string[] = Array.isArray(labelsRaw) ? (labelsRaw as string[]) : [];
  const certsRaw = t("ui.trust.certs", { returnObjects: true }) as unknown;
  const CERTS: string[] = Array.isArray(certsRaw) ? (certsRaw as string[]) : [];

  return (
    <section
      className={
        embedded
          ? "relative isolate"
          : "relative isolate overflow-hidden bg-[color:var(--paper)] py-12 md:py-16"
      }
    >
      <div className={embedded ? "w-full" : "mx-auto max-w-6xl px-5 lg:px-8"}>
        <RevealStagger
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          stagger={0.07}
        >
          {STATS.map((s, si) => {
            const Icon = s.icon;
            const label = labels[si] ?? "";
            const value = s.value || t("ui.trust.personalised");
            return (
              <motion.div
                key={si}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="group flex items-center gap-3 rounded-2xl border border-border/50 bg-white/85 p-3 shadow-[0_10px_28px_-22px_rgba(20,20,40,0.3)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-24px_rgba(20,20,40,0.35)] sm:gap-4 sm:p-4 md:p-5"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11"
                  style={{ background: s.tint, color: s.fg }}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <div
                    className="font-display text-xl leading-none text-foreground sm:text-2xl md:text-3xl"
                    style={{ letterSpacing: "-0.04em", fontWeight: 500 }}
                  >
                    {value}
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase leading-tight tracking-[0.12em] text-foreground/55 sm:text-[11px] sm:tracking-[0.16em]">
                    {label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </RevealStagger>

        <Reveal variant="up" delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/55">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
              {t("ui.trust.accredited")}
            </span>
            <span className="text-foreground/25">·</span>
            {CERTS.map((c, i) => (
              <span key={c} className="inline-flex items-center gap-4">
                <span>{c}</span>
                {i < CERTS.length - 1 ? <span className="text-foreground/25">·</span> : null}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
