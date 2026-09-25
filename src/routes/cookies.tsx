import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LegalDoc } from "@/components/legal/LegalDoc";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Cookie Policy | LinguaSUpra" },
      {
        name: "description",
        content:
          "What cookies LinguaSUpra uses, why they are set, how long they last, and how to manage or withdraw consent.",
      },
      { property: "og:title", content: "Cookie Policy | LinguaSUpra" },
      { property: "og:description", content: "Cookies LinguaSUpra uses, retention periods, and how to manage or withdraw consent." },
      { property: "og:url", content: "https://linguasupra.com/cookies" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://linguasupra.com/cookies" }],
  }),
});

function CookieSettingsButton() {
  const { t } = useTranslation();
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("open-cookie-settings"));
          }
        }}
        className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
      >
        {t("ui.footer.cookieSettings")}
      </button>
    </div>
  );
}

function MoreInfo() {
  const { t } = useTranslation();
  return (
    <p>
      {t("legal.cookies.13") as unknown as string}{" "}
      <Link to="/privacy" className="underline underline-offset-4 hover:text-[color:var(--navy)]">
        {t("cookies.policy") as unknown as string}
      </Link>
    </p>
  );
}

function CookiesPage() {
  return (
    <LegalDoc
      ns="cookies"
      slug="/cookie-policy"
      footerKey="14"
      blocks={[
        { title: "01", items: [{ p: "02" }] },
        {
          title: "03",
          items: [
            { table: { header: "04", rows: ["05", "06", "07", "08"] } },
            { p: "09" },
          ],
        },
        { title: "10", items: [{ p: "11" }, { node: <CookieSettingsButton /> }] },
        { title: "12", items: [{ node: <MoreInfo /> }] },
      ]}
    />
  );
}
