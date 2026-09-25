import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Eyebrow - small pill with a black circular icon chip on the left, then
 * label. Matches the "FAQ" reference: soft rounded pill, subtle border,
 * light shadow, black filled icon disc.
 */
export function Eyebrow({
  icon: Icon,
  label,
  className,
  align = "start",
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={cn("flex", align === "center" ? "justify-center" : "justify-start")}>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-[color:var(--light-gray)] bg-white pl-1.5 pr-4 py-1.5 text-sm font-medium text-foreground shadow-[0_6px_18px_-10px_rgba(22,22,22,0.25)]",
          className,
        )}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
        <span className="tracking-tight">{label}</span>
      </span>
    </div>
  );
}
