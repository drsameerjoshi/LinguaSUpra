import type { ReactNode } from "react";

/**
 * SectionBackdrop - soft radial pastel spotlights + a subtle grid overlay
 * (masked to fade at the edges) + light SVG grain. Each section picks a
 * palette variant, and can pass a `motif` node (a small contextual
 * decoration) so each section carries its own visual accent instead of the
 * generic dashed orbital ring the earlier version used everywhere.
 */

type Variant = "blush" | "sky" | "mint" | "lilac" | "butter" | "cream" | "dark";

const PALETTES: Record<Variant, string> = {
  blush:
    "radial-gradient(55% 55% at 12% 18%, color-mix(in oklab, var(--pastel-blush) 80%, transparent), transparent 65%), radial-gradient(50% 55% at 88% 82%, color-mix(in oklab, var(--ice-blue) 75%, transparent), transparent 70%)",
  sky:
    "radial-gradient(55% 55% at 85% 15%, color-mix(in oklab, var(--pastel-sky) 80%, transparent), transparent 65%), radial-gradient(50% 55% at 10% 90%, color-mix(in oklab, var(--pastel-blush) 60%, transparent), transparent 70%)",
  mint:
    "radial-gradient(55% 55% at 15% 80%, color-mix(in oklab, var(--pastel-mint) 80%, transparent), transparent 65%), radial-gradient(50% 55% at 85% 20%, color-mix(in oklab, var(--ice-blue) 75%, transparent), transparent 70%)",
  lilac:
    "radial-gradient(55% 55% at 82% 20%, color-mix(in oklab, var(--pastel-lilac) 75%, transparent), transparent 65%), radial-gradient(50% 55% at 18% 82%, color-mix(in oklab, var(--pastel-sky) 65%, transparent), transparent 70%)",
  butter:
    "radial-gradient(55% 55% at 10% 20%, color-mix(in oklab, var(--pastel-butter) 80%, transparent), transparent 65%), radial-gradient(50% 55% at 90% 85%, color-mix(in oklab, var(--pastel-blush) 60%, transparent), transparent 70%)",
  cream:
    "radial-gradient(55% 55% at 20% 20%, color-mix(in oklab, var(--pastel-cream) 90%, transparent), transparent 65%), radial-gradient(50% 55% at 82% 82%, color-mix(in oklab, var(--pastel-mint) 55%, transparent), transparent 70%)",
  dark:
    "radial-gradient(60% 60% at 80% 20%, color-mix(in oklab, var(--pastel-sky) 22%, transparent), transparent 70%), radial-gradient(60% 60% at 20% 80%, color-mix(in oklab, var(--pastel-lilac) 22%, transparent), transparent 70%)",
};

export function SectionBackdrop({
  variant = "blush",
  grid = true,
  grain = true,
  motif,
}: {
  variant?: Variant;
  grid?: boolean;
  grain?: boolean;
  /** Optional contextual decoration rendered above the backdrop layers. */
  motif?: ReactNode;
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: PALETTES[variant] }}
      />
      {grid ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 45%, black 40%, transparent 80%)",
          }}
        />
      ) : null}
      {grain ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
          }}
        />
      ) : null}
      {motif ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {motif}
        </div>
      ) : null}
    </>
  );
}
