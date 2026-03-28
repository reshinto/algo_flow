/**
 * Icon-only button that requires an accessible label.
 * Used for compact toolbar actions like playback controls and close buttons.
 */
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Applied as aria-label for screen reader accessibility. */
  label: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const SIZE_CLASSES: Record<string, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11", // 44px — meets WCAG 2.5.5 AAA touch target minimum
};

/** Square icon button with hover and focus states. Renders children as the icon. */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, size = "md", className = "", children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-md text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-tertiary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)] disabled:pointer-events-none disabled:opacity-50 ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});

export default IconButton;
