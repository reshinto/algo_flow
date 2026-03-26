/**
 * Inline badge component for displaying short labels such as
 * complexity tags and algorithm category indicators.
 */
import type { ReactNode } from "react";

interface BadgeProps {
  variant?: "default" | "emerald" | "cyan" | "amber" | "rose";
  children: ReactNode;
}

const VARIANT_CLASSES: Record<string, string> = {
  default: "bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)]",
  emerald: "bg-emerald-950 text-[var(--color-accent-emerald)]",
  cyan: "bg-cyan-950 text-[var(--color-accent-cyan)]",
  amber: "bg-amber-950 text-[var(--color-accent-amber)]",
  rose: "bg-rose-950 text-[var(--color-accent-rose)]",
};

/** Colored pill badge with theme-aware accent variants. */
export default function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
}
