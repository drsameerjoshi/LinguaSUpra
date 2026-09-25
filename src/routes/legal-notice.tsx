import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LegalDoc } from "@/components/legal/LegalDoc";

export const Route = createFileRoute("/legal-notice")({
  component: LegalNoticePage,
  head: () => ({
    meta: [
      { title: "Legal Notice | LinguaSUpra" },
      {
        name: "description",
        content:
          "Legal notice (mentions légales) for LinguaSUpra - site owner, hosting, intellectual property, applicable law and jurisdiction.",
      },
      { property: "og:title", content: "Legal Notice | LinguaSUpra" },
      { property: "og:description", content: "Mentions légales - site owner, hosting, IP, applicable law and jurisdiction for LinguaSUpra." },
      { property: "og:url", content: "https://linguasupra.com/legal-notice" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://linguasupra.com/legal-notice" }],
  }),
});

function RelatedPages() {
  const { t } = useTranslation();
  const s = (k: string) => t(`legal.legal.${k}`) as unknown as string;
  return (
    <div className="space-y-4">
      <ul className="ml-5 list-disc space-y-1">
        <li>
          <Link to="/privacy" className="underline underline-offset-4">
            {s("31")}
          </Link>
        </li>
        <li>
          <Link to="/cookies" className="underline underline-offset-4">
            {s("32")}
          </Link>
        </li>
        <li>
          <Link to="/terms" className="underline underline-offset-4">
            {s("33")}
          </Link>
        </li>
      </ul>
      <p className="text-sm text-muted-foreground">{s("34")}</p>
    </div>
  );
}

function LegalNoticePage() {
  return (
    <LegalDoc
      ns="legal"
      slug="/legal-notice"
      footerKey="35"
      blocks={[
        {
          title: "01",
          items: [
            { p: "02" },
            {
              table: {
                header: "03",
                rows: ["04", "05", "06", "07", "08", "09", "10", "11", "12"],
              },
            },
          ],
        },
        { title: "13", items: [{ p: "14" }] },
        { title: "15", items: [{ p: "16" }] },
        { title: "17", items: [{ p: "18" }] },
        { title: "19", items: [{ p: "20" }, { p: "21" }] },
        { title: "22", items: [{ p: "23" }] },
        { title: "24", items: [{ p: "25" }] },
        { title: "26", items: [{ p: "27" }] },
        { title: "28", items: [{ p: "29" }] },
        { title: "30", items: [{ node: <RelatedPages /> }] },
      ]}
    />
  );
}
