/**
 * Tab strip for switching between language implementations (TypeScript, Python, Java)
 * in the code panel. Drives synchronized line highlighting via the editor store.
 */
import type { SupportedLanguage } from "@/types";
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS } from "@/utils/constants";

interface LanguageTabsProps {
  activeLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

/** Renders a horizontal tab bar for selecting the displayed source language. */
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
