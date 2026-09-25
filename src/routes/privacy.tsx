import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LegalDoc } from "@/components/legal/LegalDoc";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy | LinguaSUpra" },
      {
        name: "description",
        content:
          "How LinguaSUpra collects, uses, and protects personal data under GDPR - legal bases, retention, transfers, and your rights.",
      },
      { property: "og:title", content: "Privacy Policy | LinguaSUpra" },
      { property: "og:description", content: "GDPR privacy notice: what data LinguaSUpra processes, legal bases, retention, transfers, and your rights." },
      { property: "og:url", content: "https://linguasupra.com/privacy" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://linguasupra.com/privacy" }],
  }),
});

function Authority() {
  const { t } = useTranslation();
  return (
    <ul className="ml-5 list-disc space-y-1">
      <li>{t("legal.privacy.62") as unknown as string}</li>
    </ul>
  );
}

function PrivacyPage() {
  return (
    <LegalDoc
      ns="privacy"
      slug="/privacy-policy"
      footerKey="67"
      blocks={[
        { title: "01", items: [{ table: { header: "02", rows: ["03", "04", "05", "06"] } }] },
        {
          title: "07",
          items: [
            { table: { header: "08", rows: ["09", "10", "11", "12", "13", "14"] } },
          ],
        },
        { title: "15", items: [{ p: "16" }] },
        {
          title: "17",
          items: [
            { p: "18" },
            {
              table: {
                header: "19",
                rows: ["20", "21", "22", "23", "24", "25", "26", "27"],
              },
            },
          ],
        },
        {
          title: "28",
          items: [
            { table: { header: "29", rows: ["30", "31", "32", "33", "34", "35"] } },
            { p: "36" },
          ],
        },
        { title: "37", items: [{ p: "38" }] },
        {
          title: "39",
          items: [{ table: { header: "40", rows: ["41", "42", "43", "44", "45"] } }],
        },
        {
          title: "46",
          items: [
            {
              table: {
                header: "47",
                rows: ["48", "49", "50", "51", "52", "53", "54"],
              },
            },
            { p: "55" },
          ],
        },
        { title: "56", items: [{ p: "57" }] },
        { title: "58", items: [{ p: "59" }] },
        { title: "60", items: [{ p: "61" }, { node: <Authority /> }] },
        { title: "63", items: [{ p: "64" }] },
        { title: "65", items: [{ p: "66" }] },
      ]}
    />
  );
}
