import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { SUPPORTED_LANGUAGES, setLanguage, type SupportedLanguage } from "@/i18n";

const META: Record<string, { label: string; short: string }> = {
  en: { label: "English", short: "EN" },
  fr: { label: "Français", short: "FR" },
  de: { label: "Deutsch", short: "DE" },
};

/**
 * Language switcher - segmented pill. The active segment
 * gets a navy fill; on narrow screens only flag + code are shown, on wider
 * screens nothing extra is added so the control keeps a compact footprint.
 */
export function LanguageToggle({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? "en";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = current;
    }
  }, [current]);

  const set = (lng: SupportedLanguage) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("linguasupra-lang", lng);
    }
    if (lng !== current) void setLanguage(lng);
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border/60 bg-white/70 p-1 shadow-[0_8px_20px_-16px_rgba(20,20,40,0.5)] backdrop-blur",
        className,
      )}
    >
      {SUPPORTED_LANGUAGES.map((lng) => {
        const meta = META[lng] ?? { label: lng, short: lng.toUpperCase() };
        const active = current === lng;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => set(lng)}
            aria-pressed={active}
            title={meta.label}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide transition-all duration-200",
              size === "md" ? "px-3 py-1.5 text-[13px]" : "px-2.5 py-1 text-[11px]",
              active
                ? "bg-[color:var(--brand-navy)] text-white shadow-sm"
                : "text-foreground/65 hover:bg-foreground/5 hover:text-foreground",
            )}
          >
            <span>{meta.short}</span>
            <span className="sr-only">{meta.label}</span>
          </button>
        );
      })}
    </div>
  );
}
