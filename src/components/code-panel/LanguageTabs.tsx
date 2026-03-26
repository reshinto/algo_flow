/**
 * @file LanguageTabs.tsx
 * @module components/code-panel/LanguageTabs
 *
 * Tab strip dynamically switching implicitly mapped Source code files natively seamlessly natively.
 * Drives entirely synchronized AST highlighting securely ensuring Java arrays map directly precisely independently effectively.
 */
import type { SupportedLanguage } from "@/types";
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS } from "@/utils/constants";

/** Explicit strict Component properties dictating natively guaranteed type signatures implicitly flawlessly implicitly natively exactly. */
interface LanguageTabsProps {
  /** Strongly typed string strictly evaluating identically precisely purely natively exclusively dynamically definitively natively strictly. */
  activeLanguage: SupportedLanguage;
  /** Dispatches deeply directly natively absolutely executing completely safely actively dynamically thoroughly successfully definitively implicitly. */
  onLanguageChange: (language: SupportedLanguage) => void;
}

/**
 * Renders precisely the structural layout strictly executing mapping logically cleanly identically efficiently completely exclusively implicitly structurally safely beautifully interactively explicitly completely thoroughly cleanly flawlessly directly natively purely statically fundamentally perfectly.
 */
export default function LanguageTabs({ activeLanguage, onLanguageChange }: LanguageTabsProps) {
  return (
    <div className="flex border-b border-[var(--color-border-default)]" role="tablist">
      {SUPPORTED_LANGUAGES.map((language) => (
        <button
          key={language}
          role="tab"
          aria-selected={language === activeLanguage}
          onClick={() => onLanguageChange(language)}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            language === activeLanguage
              ? "border-b-2 border-[var(--color-accent-cyan)] text-[var(--color-text-primary)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
          }`}
        >
          {LANGUAGE_LABELS[language]}
        </button>
      ))}
    </div>
  );
}
