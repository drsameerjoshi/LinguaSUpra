import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

const KEY = "linguasupra-cookies";

export function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const v = window.localStorage.getItem(KEY);
    if (!v) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  const decide = (choice: "accept" | "reject") => {
    window.localStorage.setItem(KEY, choice);
    setVisible(false);
    // [PLACEHOLDER - ANALYTICS TOOL/ID] - load analytics only after "accept".
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-6 sm:bottom-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-border/70 bg-white/95 p-4 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.35)] backdrop-blur sm:flex-row sm:items-center sm:p-5">
        <p className="flex-1 text-sm text-muted-foreground">
          {t("cookies.text")}{" "}
          <Link to="/cookies" className="underline underline-offset-2 hover:text-foreground">
            {t("cookies.policy")}
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => decide("reject")}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-muted"
          >
            {t("cookies.reject")}
          </button>
          <button
            type="button"
            onClick={() => decide("accept")}
            className="rounded-full bg-[color:var(--navy)] px-4 py-2 text-sm font-medium text-white"
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
