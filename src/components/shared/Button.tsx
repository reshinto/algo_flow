/**
 * General-purpose button primitive used across the application.
 * Supports visual variants and sizes while forwarding native button attributes.
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  children: ReactNode;
}

const VARIANT_CLASSES: Record<string, string> = {
  primary: "bg-[var(--color-accent-emerald)] text-[var(--color-surface-primary)] hover:opacity-90",
  secondary:
    "bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-tertiary)]",
};

const SIZE_CLASSES: Record<string, string> = {
  sm: "h-7 px-2 text-xs",
  md: "h-9 px-3 text-sm",
};

/** Themed button with variant styling and focus-visible ring for accessibility. */
export default function Button({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)] disabled:pointer-events-none disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
