import { createFileRoute } from "@tanstack/react-router";
import { LegalDoc } from "@/components/legal/LegalDoc";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms & Conditions | LinguaSUpra" },
      {
        name: "description",
        content:
          "Terms & Conditions governing use of linguasupra.com and the provision of Business English coaching and training services.",
      },
      { property: "og:title", content: "Terms & Conditions | LinguaSUpra" },
      { property: "og:description", content: "Terms governing use of the LinguaSUpra website and Business English coaching and training services." },
      { property: "og:url", content: "https://linguasupra.com/terms" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://linguasupra.com/terms" }],
  }),
});

function TermsPage() {
  return (
    <LegalDoc
      ns="terms"
      slug="/terms-and-conditions"
      footerKey="43"
      blocks={[
        { title: "01", items: [{ p: "02" }] },
        { title: "03", items: [{ p: "04" }] },
        { title: "05", items: [{ p: "06" }] },
        {
          title: "07",
          items: [{ table: { header: "08", rows: ["09", "10", "11", "12", "13"] } }],
        },
        { title: "14", items: [{ p: "15" }, { p: "16" }, { p: "17" }] },
        { title: "18", items: [{ p: "19" }] },
        { title: "20", items: [{ p: "21" }] },
        { title: "22", items: [{ p: "23" }] },
        { title: "24", items: [{ p: "25" }] },
        { title: "26", items: [{ p: "27" }] },
        { title: "28", items: [{ p: "29" }, { p: "30" }] },
        { title: "31", items: [{ p: "32" }] },
        { title: "33", items: [{ p: "34" }] },
        { title: "35", items: [{ p: "36" }] },
        { title: "37", items: [{ p: "38" }] },
        { title: "39", items: [{ p: "40" }] },
        { title: "41", items: [{ p: "42" }] },
      ]}
    />
  );
}
