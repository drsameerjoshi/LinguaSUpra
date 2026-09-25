import { createFileRoute } from "@tanstack/react-router";
import { LegalDoc } from "@/components/legal/LegalDoc";

export const Route = createFileRoute("/disclaimer")({
  component: DisclaimerPage,
  head: () => ({
    meta: [
      { title: "Disclaimer | LinguaSUpra" },
      {
        name: "description",
        content:
          "Disclaimer covering website content, coaching outcomes, external links, and LinguaSUpra’s regulated-activity status.",
      },
      { property: "og:title", content: "Disclaimer | LinguaSUpra" },
      { property: "og:description", content: "How to interpret LinguaSUpra website content and the limits of what our coaching services provide." },
      { property: "og:url", content: "https://linguasupra.com/disclaimer" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://linguasupra.com/disclaimer" }],
  }),
});

function DisclaimerPage() {
  return (
    <LegalDoc
      ns="disclaimer"
      slug="/disclaimer"
      footerKey="11"
      blocks={[
        { title: "01", items: [{ p: "02" }] },
        { title: "03", items: [{ p: "04" }] },
        { title: "05", items: [{ p: "06" }] },
        { title: "07", items: [{ p: "08" }] },
        { title: "09", items: [{ p: "10" }] },
      ]}
    />
  );
}
