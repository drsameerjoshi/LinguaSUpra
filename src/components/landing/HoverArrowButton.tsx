import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type HoverArrowButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: string;
  variant?: "dark" | "light" | "whatsapp";
  leading?: ReactNode;
};

/**
 * HoverArrowButton - pill button.
 * Idle: horizontal arrow (→).
 * Hover: arrow rotates -45° (↗) and the label slides upward at medium
 * speed, revealing a duplicate label rising in from the bottom.
 */
export const HoverArrowButton = forwardRef<HTMLAnchorElement, HoverArrowButtonProps>(
  ({ children, variant = "dark", leading, className, ...rest }, ref) => {
    const isDark = variant === "dark";
    const isWhatsapp = variant === "whatsapp";
    return (
      <a
        ref={ref}
        {...rest}
        className={cn(
          "slide-parent group inline-flex items-center gap-3 rounded-full pl-5 pr-2 py-2 text-sm font-medium transition-shadow",
          isWhatsapp
            ? "bg-[#25D366] text-white shadow-[0_16px_36px_-18px_rgba(37,211,102,0.65)] hover:bg-[#1FB855]"
            : isDark
              ? "bg-foreground text-background shadow-[0_16px_36px_-18px_rgba(22,22,22,0.6)]"
              : "bg-white text-foreground border border-[color:var(--light-gray)] shadow-[0_10px_24px_-16px_rgba(22,22,22,0.35)]",
          className,
        )}
      >
        {leading}
        <span className="slide-mask">
          <span className="slide-inner">
            <span className="slide-line">{children}</span>
          </span>
        </span>
        <span
          className={cn(
            "arrow-chip h-8 w-8 rounded-full",
            isWhatsapp
              ? "bg-white text-[#25D366]"
              : isDark
                ? "bg-background text-foreground"
                : "bg-foreground text-background",
          )}
        >
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
        </span>
      </a>
    );
  },
);
HoverArrowButton.displayName = "HoverArrowButton";
