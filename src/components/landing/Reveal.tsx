import {
  m as motion, useReducedMotion, type Variants } from "framer-motion";
import { useMemo, type ReactNode } from "react";

const TAGS = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  li: motion.li,
  ul: motion.ul,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  header: motion.header,
  article: motion.article,
  aside: motion.aside,
  figure: motion.figure,
} as const;

function resolveTag(tag: keyof HTMLElementTagNameMap) {
  return (TAGS as Record<string, typeof motion.div>)[tag] ?? motion.div;
}

type Variant = "up" | "fade" | "tilt" | "scale" | "left" | "right";

const VARIANTS: Record<Variant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  tilt: {
    hidden: { opacity: 0, y: 40, rotateX: -14, transformPerspective: 900 },
    show: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 900 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0 },
  },
};

export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  variant = "up",
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  variant?: Variant;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}) {
  const reduce = useReducedMotion();
  const MotionTag = useMemo(() => resolveTag(Tag), [Tag]);

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      style={{ transformStyle: "preserve-3d" }}
      variants={VARIANTS[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: keyof HTMLElementTagNameMap;
}) {
  const reduce = useReducedMotion();
  const MotionTag = useMemo(() => resolveTag(Tag), [Tag]);
  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </MotionTag>
  );
}
