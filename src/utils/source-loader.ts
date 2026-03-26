import type { SupportedLanguage } from "@/types";

/* Eagerly load all algorithm source files via Vite glob import. */
const sourceModules = import.meta.glob("/src/algorithms/*/*/sources/*", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** File extension mapping for each supported language */
const LANGUAGE_EXTENSIONS: Record<SupportedLanguage, string> = {
  typescript: ".ts",
  python: ".py",
  java: ".java",
};

/**
 * Load the raw source code for a given algorithm and language.
 * Returns the source string or undefined if not found.
 */
export function loadSource(algorithmId: string, language: SupportedLanguage): string | undefined {
  const extension = LANGUAGE_EXTENSIONS[language];

  for (const [filePath, content] of Object.entries(sourceModules)) {
    if (filePath.includes(`/${algorithmId}/sources/`) && filePath.endsWith(extension)) {
      return content;
    }
  }

  return undefined;
}

/** Get all available source file paths (for testing/debugging) */
export function getAllSourcePaths(): string[] {
  return Object.keys(sourceModules);
}
