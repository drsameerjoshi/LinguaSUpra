import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Menu, X } from "lucide-react";
import logoAsset from "@/assets/linguasupra-navy.webp";
import { LanguageToggle } from "./LanguageToggle";

import { cn } from "@/lib/utils";

const CAL_URL = "https://cal.com/linguasupra/analysiscall";

/**
 * Header - Flarion-inspired: black circular logomark + wordmark on the left,
 * centered text links, right side actions (language, sign-in-style ghost,
 * primary CTA). Sticky at the top, smoothly hides when the user scrolls
 * down and re-appears on scroll up.
 */
export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      setScrolled(y > 8);
      if (Math.abs(dy) > 6) {
        // hide on downward scroll past 80px, show on upward scroll
        setHidden(dy > 0 && y > 80);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#top", label: t("ui.footer.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#programmes", label: t("nav.programmes") },
    { href: "#how", label: t("nav.howItWorks") },
    { href: "#faq", label: t("nav.faq") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "w-full transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300",
          scrolled
            ? "border-b border-[color:var(--light-gray)]/70 bg-white/85 backdrop-blur-md shadow-[0_10px_30px_-24px_rgba(0,0,0,0.25)]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-5 md:h-[60px] lg:px-8">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-2.5"
            aria-label="LinguaSUpra home"
          >
            <img
              src={logoAsset}
              alt="LinguaSUpra"
              className="h-8 w-auto md:h-9"
              width={200}
              height={40}
            />
          </a>

          {/* Centered nav */}
          <nav className="pointer-events-auto hidden items-center gap-8 lg:flex" aria-label="Main">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="wave-parent text-[15px] font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <LanguageToggle />
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="group hidden cursor-pointer items-center justify-between gap-2.5 whitespace-nowrap rounded-full bg-foreground px-4 py-2.5 text-[13px] font-semibold text-background shadow transition-transform hover:-translate-y-0.5 lg:inline-flex"
            >
              {t("nav.bookACall")}
              <span className="transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--light-gray)] bg-white lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mx-4 mb-3 rounded-3xl border border-[color:var(--light-gray)] bg-white/95 backdrop-blur-md shadow-lg lg:hidden">
            <div className="flex flex-col gap-1 p-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-full px-4 py-2.5 text-base font-medium text-foreground/80 hover:bg-muted"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-3 px-2 pb-1">
                <LanguageToggle />
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-full cursor-pointer items-center justify-between rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow"
                >
                  {t("nav.bookACall")}
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
