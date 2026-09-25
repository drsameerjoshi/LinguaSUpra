/**
 * HoloHeart - outlined heart character (♡) rendered inline with no
 * extra padding so it sits flush next to surrounding text.
 */
export function HoloHeart({ className }: { className?: string }) {
  return (
    <span
      className={className}
      aria-label="love"
      role="img"
      style={{
        display: "inline",
        lineHeight: 1,
        fontFamily: "inherit",
        color: "currentColor",
      }}
    >
      ♡
    </span>
  );
}
