import { useTranslation } from "react-i18next";
import { Linkedin, Mail, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LanguageToggle } from "./LanguageToggle";
import { HoverArrowButton } from "./HoverArrowButton";
import { HoloHeart } from "./HoloHeart";
import logoAsset from "@/assets/linguasupra-navy.webp";
import footerCareer from "@/assets/footer-career.webp";

const CAL_URL = "https://cal.com/linguasupra/analysiscall";
const WA_URL = "https://wa.me/352661502425";

/**
 * Footer - Flarion-inspired:
 *  1) big rounded "next step" CTA card with dual buttons
 *  2) light footer with wordmark, tagline, contact + legal columns
 *  3) bottom row with credits and "Developed with ♡ in Berlin by Codeyle".
 * No newsletter.
 */
export function Footer() {
  const { t } = useTranslation();
  const links = t("footer.links", { returnObjects: true }) as Record<string, string>;

  const legal: Array<[string, string]> = [
    ["/legal-notice", links.legalNotice],
    ["/privacy", links.privacy],
    ["/cookies", links.cookies],
    ["/terms", links.terms],
    ["/disclaimer", links.disclaimer],
  ];

  return (
    <footer className="bg-[color:var(--pure-white)]">
      {/* CTA slab */}
      <div className="mx-auto max-w-7xl px-5 pt-10 lg:px-8">
        <div className="grid gap-8 rounded-[32px] bg-[color:var(--off-white)] p-8 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12 md:p-12">
          <div>
            <h2
              className="font-display text-3xl leading-[1.05] text-foreground sm:text-4xl md:text-5xl"
              style={{ letterSpacing: "-0.035em", fontWeight: 500 }}
            >
              {t("ui.footer.ctaTitle")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("ui.footer.ctaBody")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <HoverArrowButton href={CAL_URL} target="_blank" rel="noreferrer" variant="dark">
                {t("ui.footer.ctaBook")}
              </HoverArrowButton>
              <HoverArrowButton href={WA_URL} target="_blank" rel="noreferrer" variant="whatsapp">
                {t("ui.footer.ctaWhatsApp")}
              </HoverArrowButton>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative overflow-hidden rounded-[24px] bg-[color:var(--off-white)] shadow-[0_20px_50px_-30px_rgba(22,22,22,0.25)]">
              <img
                src={footerCareer}
                alt="Confident professional stepping forward - take the next big step in your career"
                loading="lazy"
                decoding="async"
                width={1280}
                height={1024}
                className="h-full w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main footer body */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 pt-16 pb-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 md:pt-20 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <img
                  src={logoAsset}
                  alt="LinguaSUpra"
                  className="h-12 w-auto md:h-14"
                  width={280}
                  height={56}
                />
              </div>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Language + Based in parallel to logo (tablet only; lg has dedicated column) */}
            <div className="hidden md:block lg:hidden">
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/50">
                {t("ui.footer.language")}
              </div>
              <div className="mt-3">
                <LanguageToggle />
              </div>
            </div>
          </div>

          <ul className="mt-8 flex flex-col gap-3 text-sm">
            <li>
              <a
                href="mailto:hello@linguasupra.com"
                className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--light-gray)] bg-white px-4 py-2 text-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40 hover:text-foreground hover:shadow-sm"
              >
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110" /> hello@linguasupra.com
              </a>
            </li>
            <li>
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--light-gray)] bg-white px-4 py-2 text-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40 hover:text-foreground hover:shadow-sm"
              >
                <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" /> +352 661 502 425
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/sujataagarwal1919/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--light-gray)] bg-white px-4 py-2 text-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40 hover:text-foreground hover:shadow-sm"
              >
                <Linkedin className="h-4 w-4 transition-transform group-hover:scale-110" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Main pages */}
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/50">
            {t("ui.footer.mainPages")}
          </div>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {[
              ["#top", t("ui.footer.home")],
              ["#about", t("nav.about")],
              ["#programmes", t("nav.programmes")],
              ["#how", t("nav.howItWorks")],
              ["#testimonials", t("nav.testimonials")],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="group relative inline-flex items-center text-foreground/70 transition-colors hover:text-foreground"
                >
                  <span className="relative">
                    {label}
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/50">
            {t("footer.legal")}
          </div>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {legal.map(([href, label]) => (
              <li key={href}>
                <Link
                  to={href}
                  className="group relative inline-flex items-center text-foreground/70 transition-colors hover:text-foreground"
                >
                  <span className="relative">
                    {label}
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new Event("open-cookie-settings"));
                  }
                }}
                className="group relative inline-flex items-center text-foreground/70 transition-colors hover:text-foreground"
              >
                <span className="relative">
                  {t("ui.footer.cookieSettings")}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full"
                  />
                </span>
              </button>
            </li>
          </ul>
        </div>

        {/* Language + Based in - mobile (parallel to nothing else on its row) */}
        <div className="col-span-2 md:hidden">
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/50">
            {t("ui.footer.language")}
          </div>
          <div className="mt-3">
            <LanguageToggle />
          </div>
        </div>

        {/* Language + Based in - dedicated column on lg only */}
        <div className="hidden lg:block">
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/50">
            {t("ui.footer.language")}
          </div>
          <div className="mt-5">
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-[color:var(--light-gray)] px-5 py-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground md:flex-row md:items-center md:text-left">
          <span>{t("footer.rights")}</span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            Developed with&nbsp;<HoloHeart />&nbsp;in Berlin by&nbsp;
            <a
              href="https://codeyle.de/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Codeyle
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
