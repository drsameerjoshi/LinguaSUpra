import { createFileRoute } from "@tanstack/react-router";
import sujataHero from "@/assets/sujata-hero.webp";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ClientLogos } from "@/components/landing/ClientLogos";

import { Problem } from "@/components/landing/Problem";
import { About } from "@/components/landing/About";
import { Programmes } from "@/components/landing/Programmes";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Benefits } from "@/components/landing/Benefits";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { CookieBanner } from "@/components/landing/CookieBanner";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { TopBlurVeil } from "@/components/landing/TopBlurVeil";

const FAQ_ITEMS: { q: string; a: string }[] = [
  { q: "Who is this coaching for?", a: "Experienced professionals - senior managers, mid-level executives, and specialists - who are highly competent in their work and want their English to reflect that competence. Su also designs tailored programmes for organisations and executive teams." },
  { q: "I already speak English at work. Why coaching?", a: "Most of Su's clients already work in English every day. Coaching is for the next level: precision in negotiations, presence in meetings, authority in presentations, and emails that take minutes instead of half an hour." },
  { q: "How are sessions delivered?", a: "Sessions are delivered online 1 to 1, scheduled around your work. On-site sessions can be arranged for organisations in Luxembourg and neighbouring countries." },
  { q: "How long is a typical programme?", a: "Programmes are tailored to your goals. Most clients see meaningful change within the first few sessions and continue on a rhythm that fits their workload." },
  { q: "Do you work with organisations?", a: "Yes. Tailored Courses are available for teams, senior leaders, and executives, including confidential high-profile assignments where discretion matters." },
  { q: "What about pricing?", a: "Pricing is on request and depends on scope. Book a call to discuss your objectives and receive a proposal." },
];

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Business English Coaching for Executives | LinguaSUpra" },
      {
        name: "description",
        content:
          "1 to 1 Business English coaching for senior professionals and teams. CELTA and TESOL certified trainer Su, based in Luxembourg. Book an analysis call.",
      },
      { property: "og:title", content: "Business English Coaching for Executives | LinguaSUpra" },
      {
        property: "og:description",
        content:
          "1 to 1 Business English coaching for senior professionals and teams. Meetings, presentations, negotiations and professional writing.",
      },
      { property: "og:url", content: "https://linguasupra.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://linguasupra.com/" },
      // Largest Contentful Paint candidate - fetch it alongside the HTML.
      { rel: "preload", as: "image", href: sujataHero, fetchPriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Business English Coaching",
          serviceType: "Business English coaching and training",
          provider: { "@id": "https://linguasupra.com/#organization" },
          areaServed: ["LU", "FR", "BE", "DE", "Worldwide"],
          description:
            "Premium 1 to 1 Business English coaching for senior managers, executives and specialists - meetings, presentations, negotiations, and professional writing.",
          url: "https://linguasupra.com/",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <TopBlurVeil />
      <Header />
      <main>
        <Hero />
        <ClientLogos />
        <Problem />
        <About />
        <Programmes />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
