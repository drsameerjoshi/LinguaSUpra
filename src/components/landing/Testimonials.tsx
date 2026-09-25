import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { SectionBackdrop } from "./SectionBackdrop";
import { cn } from "@/lib/utils";
import photoNathalie from "@/assets/testimonials/nathalie-demeurs.webp";
import photoRene from "@/assets/testimonials/rene-drabo.webp";
import photoLaurence from "@/assets/testimonials/laurence-iorio.webp";
import photoBenoit from "@/assets/testimonials/benoit-manns.webp";
import photoWidad from "@/assets/testimonials/widad-takief.webp";
import photoMylene from "@/assets/testimonials/mylene-di-nino.webp";
import photoMyriam from "@/assets/testimonials/myriam-schmitz.webp";
import photoSuin from "@/assets/testimonials/suin-jo.webp";
import photoFiorenzo from "@/assets/testimonials/fiorenzo-tristaino.webp.asset.json";


type Item = {
  quote: string;
  name: string;
  role: string;
  company: string;
  note?: string;
  highlights?: string[];
  photo?: string;
};

// Highlights taken verbatim from Client_Testimonials_Su (July 2026).
const ITEMS: Item[] = [
  {
    quote:
      "Su was an incredible support in helping me achieve my goal of improving both my spoken and written English. She quickly identified my areas for improvement and designed lessons that were perfectly tailored to my needs. Thanks to her personalized approach, I not only made significant progress in my English skills but also gained the confidence to communicate much more naturally and comfortably. I highly recommend Su to anyone looking for an engaging, supportive, and highly effective English teacher.",
    name: "Nathalie Demeurs",
    photo: photoNathalie,
    role: "Director Compliance",
    company: "PANDOO Administration",
    highlights: [
      "improving both my spoken and written English",
      "personalized approach",
      "gained the confidence to communicate",
    ],
  },
  {
    quote:
      "Su is an exceptional coach with a rare gift for combining professionalism with genuine warmth. I worked with her to prepare for a major presentation at the One Identity conference in Prague, a key European event for the Identity and Access Management community, speaking in front of an audience of industry professionals and security-focused executives. Thanks to her coaching, I didn't just improve my English. I gained real confidence in my delivery and learned how to tailor my message to a demanding, expert audience. What struck me most was her humanity: she never made me feel like a student, but like someone genuinely invested in helping me grow. Her ability to craft exercises tailored to my specific needs, both on the language itself and on the content and structure of my presentation, made all the difference. The presentation was a real success, and I owe a large part of that to her guidance. I can't recommend Su enough to anyone looking to build confidence and truly connect with their audience.",
    name: "Mounkeila René Drabo",
    photo: photoRene,
    role: "Chef de section",
    company: "POST Luxembourg",
    highlights: [
      "exceptional coach",
      "real confidence in my delivery",
      "The presentation was a real success",
    ],
  },
  {
    quote:
      "Su is very supportive, and explains well with patience. She quickly identifies her students' weaknesses and provides clear explanations and practical examples to help them improve. Her lessons are always enjoyable and feel more like a natural conversation than a traditional class, making learning both effective and motivating. Her dedication to teaching is evident, and I have become much more confident using English at work thanks to her lessons.",
    name: "Suin Jo",
    photo: photoSuin,
    role: "Compliance Officer",
    company: "Grant Thornton Luxembourg",
    highlights: [
      "clear explanations and practical examples",
      "natural conversation",
      "much more confident using English at work",
    ],
  },
  {
    quote:
      "My lessons with Su combined regular, natural conversation practice with immediate correction, so mistakes were fixed on the spot rather than left to become habits. She focused on vocabulary relevant to my profession, alongside practical English for everyday phone calls and emails. Grammar topics were explained simply and clearly, always backed up with exercises to reinforce what I had learned, and my reading comprehension improved through newspaper articles and relevant business news. Every assignment and test came with detailed feedback, so I always knew exactly where I stood and what to work on next.",
    name: "Myriam Schmitz",
    photo: photoMyriam,
    role: "Customer Support",
    company: "Banque de Luxembourg",
    note: "Translated from German to convey the client's full meaning.",
    highlights: [
      "regular, natural conversation practice with immediate correction",
      "vocabulary relevant to my profession",
      "detailed feedback",
    ],
  },
  {
    quote:
      "My one-to-one English lessons with Su have enabled me to revise and correct my grammar and verb conjugation mistakes, and to improve my vocabulary, both in general and in a professional context. The lessons are varied, with a balanced mix of discussions about everyday life, exercises, reading newspaper articles and discussions on current economic and political affairs, all in a friendly and relaxed atmosphere, which makes learning both enjoyable and effective. Su's professionalism and the techniques she uses - particularly her practice of correcting and explaining every mistake I make when speaking - have enabled me to make significant progress in English.",
    name: "Benoît Manns",
    photo: photoBenoit,
    role: "Head of Technical Purchasing",
    company: "Chemolux McBride",
    highlights: [
      "one-to-one English lessons",
      "professional context",
      "significant progress in English",
    ],
  },
  {
    quote:
      "I really appreciate having English lessons with Su for the past two years. She has helped me progress, explains things very well, we talk about many subjects and themes, she corrects my pronunciation, and she is very patient with me.",
    name: "Laurence Iorio",
    photo: photoLaurence,
    role: "Trustee Control",
    company: "Société Générale Luxembourg",
    highlights: ["has helped me progress", "corrects my pronunciation"],
  },
  {
    quote:
      "I highly recommend Su as an English teacher and coach. She creates a friendly and motivating atmosphere where everyone feels comfortable speaking. The lessons included plenty of opportunities to practise speaking, with immediate feedback and corrections that really helped me improve my confidence and fluency. I also found the role plays based on real business situations extremely useful, as they allowed me to apply what I learned in realistic scenarios. Su is professional, patient and always takes the time to explain grammar clearly. What I appreciated most was how she personalised the lessons to match my goals, making every session practical, relevant and enjoyable. Su also creates an inclusive learning environment by respecting different cultural backgrounds, which makes everyone feel valued and comfortable participating. I would highly recommend her to anyone looking to improve their English in a supportive and professional setting.",
    name: "Fiorenzo Tristaino",
    photo: photoFiorenzo.url,
    role: "Senior Key Account Manager",
    company: "Pluxee Luxembourg",
    highlights: [
      "practise speaking, with immediate feedback and corrections",
      "confidence and fluency",
      "real business situations",
      "personalised the lessons to match my goals",
    ],
  },
  {
    quote:
      "My name is Widad, and I attended Su's English courses when I was a junior, shortly after moving to Luxembourg from a French-speaking country. I really enjoyed the lessons because they were practical and useful for my work. We had lots of opportunities to speak, and Su always gave helpful feedback on my grammar and pronunciation. I also learned useful business English for meetings, emails, and presentations that I still use in my job today. The lessons were well organized, with a good balance of speaking practice and grammar. The role plays and real business examples made the classes interesting and helped me become much more confident speaking English. I would definitely recommend Su's lessons to anyone who wants to improve their English in a friendly, supportive, and professional environment.",
    name: "Widad Takief",
    photo: photoWidad,
    role: "Audit Manager",
    company: "Grant Thornton",
    highlights: [
      "business English for meetings, emails, and presentations",
      "much more confident speaking English",
    ],
  },
  {
    quote:
      "Learning with Su has been a truly rewarding experience. From the very beginning, she took the time to understand my strengths and identify the areas where I needed the most support. Every lesson was carefully adapted to my goals, making the learning process both effective and enjoyable. Thanks to her guidance, my spoken and written English improved considerably, and I now feel much more confident expressing myself in everyday and professional situations. Her patience, encouragement, and ability to explain complex concepts clearly made a huge difference in my progress. I would wholeheartedly recommend Su to anyone who wants to improve their English with a teacher who is knowledgeable, motivating, and genuinely invested in her students' success.",
    name: "Mylène Di Nino",
    photo: photoMylene,
    role: "Management Consultant & Sophrologist",
    company: "",
    highlights: [
      "spoken and written English improved considerably",
      "confident expressing myself in everyday and professional situations",
    ],
  },
];

const ICE = "#BFE0FF"; // Icey Blue - sole highlight color
const QUOTE_LIMIT = 320;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

/** Wrap highlight phrases with a full Icey Blue background. */
function renderQuote(text: string, highlights?: string[]) {
  if (!highlights?.length) return text;
  type Chunk = { s: number; e: number };
  const chunks: Chunk[] = [];
  for (const h of highlights) {
    const s = text.indexOf(h);
    if (s >= 0) chunks.push({ s, e: s + h.length });
  }
  if (!chunks.length) return text;
  chunks.sort((a, b) => a.s - b.s);
  const nodes: ReactNode[] = [];
  let cur = 0;
  chunks.forEach((c, i) => {
    if (c.s < cur) return;
    if (c.s > cur) nodes.push(text.slice(cur, c.s));
    nodes.push(
      <mark
        key={i}
        className="rounded-[4px] px-1.5 py-0.5 font-medium text-foreground"
        style={{ backgroundColor: ICE }}
      >
        {text.slice(c.s, c.e)}
      </mark>,
    );
    cur = c.e;
  });
  if (cur < text.length) nodes.push(text.slice(cur));
  return nodes;
}

function CenterAvatar({ item }: { item: Item }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden rounded-full"
      style={{
        background: `linear-gradient(135deg, ${ICE} 0%, #ffffff 100%)`,
      }}
    >
      <div className="flex h-[92%] w-[92%] items-center justify-center overflow-hidden rounded-full bg-white">
        {item.photo ? (
          <img
            src={item.photo}
            alt={`${item.name}, ${item.role}${item.company ? ` at ${item.company}` : ""}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-full object-cover object-center"
          />
        ) : (
          <span
            className="font-display text-xl font-semibold text-foreground sm:text-2xl md:text-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {initials(item.name)}
          </span>
        )}
      </div>
    </div>
  );
}

export function Testimonials() {
  const { t, i18n } = useTranslation();
  const listRaw = t("testimonials.list", { returnObjects: true }) as unknown;
  const list = (Array.isArray(listRaw) ? listRaw : []) as Array<{
    quote?: string;
    role?: string;
  }>;
  const isEnglish = (i18n.resolvedLanguage ?? "en").startsWith("en");
  const items: Item[] = useMemo(
    () =>
      ITEMS.map((it, i) => ({
        ...it,
        quote: list[i]?.quote ?? it.quote,
        role: list[i]?.role ?? it.role,
        // Highlight phrases are authored in English only.
        highlights: isEnglish ? it.highlights : undefined,
        note: isEnglish ? it.note : undefined,
      })),
    [list, isEnglish],
  );
  const autoplayRef = useRef(
    Autoplay({
      delay: 6500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  );
  const startIndex = 0;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      duration: 30,
      dragFree: false,
      startIndex,
      containScroll: "trimSnaps",
    },
    [autoplayRef.current],
  );
  const [selected, setSelected] = useState(startIndex);
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setExpandedMap({});
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const pauseAutoplay = useCallback(() => autoplayRef.current?.stop(), []);
  const resumeAutoplay = useCallback(() => autoplayRef.current?.play(), []);

  const activeItem = items[selected];
  const longItems = useMemo(
    () => items.map((it) => it.quote.length > QUOTE_LIMIT),
    [items],
  );

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-[color:var(--paper)]"
    >
      <SectionBackdrop variant="lilac" />
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-24 lg:px-8">
        <div className="text-center">
          <Reveal variant="fade">
            <Eyebrow icon={MessageSquareQuote} label={t("ui.eyebrow.testimonials")} align="center" />
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <h2
              className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-[1.05] text-foreground sm:text-4xl md:text-5xl"
              style={{ letterSpacing: "-0.04em", fontWeight: 500 }}
            >
              {t("ui.testimonials.h2Pre")}{" "}
              <span className="italic text-foreground/70">{t("ui.testimonials.h2Highlight")}</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.15}>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("ui.testimonials.sub")}
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={0.2}>
          <div
            className="relative mt-24 sm:mt-28 md:mt-32"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            onTouchStart={pauseAutoplay}
            onTouchEnd={resumeAutoplay}
          >
            {/* Fixed centered circular avatar - sits above the sliding card */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
              <div
                className="h-24 w-24 rounded-full sm:h-28 sm:w-28 md:h-32 md:w-32"
                style={{
                  boxShadow:
                    "0 12px 30px -12px rgba(0,0,0,0.25), 0 0 0 6px #ffffff",
                }}
              >
                {/* Crossfade avatar identity as the strip moves */}
                <div className="relative h-full w-full">
                  {items.map((it, i) => (
                    <div
                      key={i}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-500",
                        i === selected ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <CenterAvatar item={it} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* One card at a time - no side peek */}
            <div className="-my-10 overflow-hidden py-10" ref={emblaRef}>
              <div className="flex touch-pan-y items-stretch">
                {items.map((item, i) => {
                  const isLong = longItems[i];
                  const isExpanded = !!expandedMap[i];
                  const showFull = !isLong || isExpanded;
                  const displayText = showFull
                    ? item.quote
                    : item.quote.slice(0, QUOTE_LIMIT).trimEnd() + "…";

                  return (
                    <div
                      key={i}
                      className="min-w-0 flex-[0_0_100%] px-1 sm:px-2"
                    >
                      <article
                        className={cn(
                          "relative mx-auto flex h-full w-full flex-col items-center rounded-3xl border border-black/[0.06] bg-white text-center shadow-[0_4px_16px_-4px_rgba(22,22,22,0.06),0_20px_48px_-24px_rgba(22,22,22,0.12)]",
                          "px-5 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-20 md:px-14 md:pt-24",
                        )}
                      >
                        {/* Decorative quote glyphs */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute left-4 top-2 select-none font-display text-5xl leading-none text-foreground/10 sm:left-6 sm:text-6xl"
                        >
                          &ldquo;
                        </span>
                        <span
                          aria-hidden
                          className="pointer-events-none absolute bottom-3 right-4 select-none font-display text-5xl leading-none text-foreground/10 sm:bottom-4 sm:right-6 sm:text-6xl"
                        >
                          &rdquo;
                        </span>

                        {/* Quote */}
                        <div className="relative z-10 flex w-full flex-1 flex-col items-center">
                          <div
                            className={cn(
                              "w-full overflow-hidden transition-[max-height] duration-500 ease-in-out",
                              showFull
                                ? "max-h-[1600px]"
                                : "max-h-[210px] sm:max-h-[190px]",
                            )}
                          >
                            <p
                              className="font-display text-base font-light leading-[1.7] text-foreground sm:text-lg md:text-xl md:leading-[1.65]"
                              style={{ letterSpacing: "-0.005em" }}
                            >
                              {renderQuote(displayText, item.highlights)}
                            </p>
                          </div>

                          {isLong ? (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedMap((m) => ({ ...m, [i]: !m[i] }))
                              }
                              className="mt-5 cursor-pointer text-[11px] font-semibold uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground"
                            >
                              {isExpanded ? t("ui.testimonials.readLess") : t("ui.testimonials.readMore")}
                            </button>
                          ) : null}

                          {item.note ? (
                            <p className="mt-3 text-xs italic text-muted-foreground">
                              {item.note}
                            </p>
                          ) : null}
                        </div>

                        {/* Attribution */}
                        <div className="mt-8 flex flex-col items-center">
                          <h3
                            className="font-display text-base font-bold text-foreground sm:text-lg"
                            style={{ letterSpacing: "-0.015em" }}
                          >
                            {item.name}
                          </h3>
                          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/50 sm:text-[11px]">
                            {item.role}
                            {item.company ? (
                              <>
                                <span className="mx-1.5 text-foreground/30">·</span>
                                {item.company}
                              </>
                            ) : null}
                          </p>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Arrows */}
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="absolute -left-2 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-md transition-all hover:scale-105 hover:bg-foreground hover:text-white md:flex lg:-left-6"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="absolute -right-2 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-md transition-all hover:scale-105 hover:bg-foreground hover:text-white md:flex lg:-right-6"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </Reveal>

        {/* Dots navigation */}
        <Reveal variant="up" delay={0.25}>
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            {items.map((item, i) => {
              const active = i === selected;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={active}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    active ? "w-8" : "w-2 opacity-40 hover:opacity-70",
                  )}
                  style={{
                    backgroundColor: active ? ICE : "#111",
                  }}
                />
              );
            })}
          </div>
        </Reveal>

        {/* Counter */}
        <div className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-foreground">
            {String(selected + 1).padStart(2, "0")}
          </span>
          <span className="mx-2 text-foreground/30">/</span>
          <span>{String(items.length).padStart(2, "0")}</span>
          <span className="ml-3 hidden sm:inline">- {activeItem?.name}</span>
        </div>
      </div>
    </section>
  );
}
