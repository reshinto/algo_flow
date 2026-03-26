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

/** Convert kebab-case to UPPER_SNAKE_CASE (e.g. "bubble-sort" → "BUBBLE_SORT") */
function kebabToUpperSnake(kebab: string): string {
  return kebab.replace(/-/g, "_").toUpperCase();
}

/**
 * Discover all algorithm IDs by scanning TypeScript source file paths.
 * The filename stem (without .ts) IS the algorithm ID.
 * Returns a map of UPPER_SNAKE keys to kebab-case IDs:
 *   { BUBBLE_SORT: "bubble-sort", BFS: "bfs", ... }
 */
export function discoverAlgorithmIds(): Record<string, string> {
  const algorithmIdMap: Record<string, string> = {};

  for (const filePath of Object.keys(sourceModules)) {
    if (!filePath.endsWith(".ts")) continue;
    const filename = filePath.split("/").pop()!;
    const algorithmId = filename.replace(".ts", "");
    const enumKey = kebabToUpperSnake(algorithmId);
    algorithmIdMap[enumKey] = algorithmId;
  }

  return algorithmIdMap;
}

/**
 * Parse @step markers from a raw source string and build a map of
 * step key → line numbers. Markers are trailing comments like:
 *   // @step:initialize   (TypeScript/Java)
 *   # @step:initialize    (Python)
 *
 * A single line can carry multiple markers separated by commas:
 *   // @step:compare,inner-loop
 */
export function parseStepMarkers(source: string): Record<string, number[]> {
  const stepMap: Record<string, number[]> = {};
  const sourceLines = source.split("\n");

  for (let lineIndex = 0; lineIndex < sourceLines.length; lineIndex++) {
    const line = sourceLines[lineIndex]!;
    const markerMatch = line.match(/@step:([^\s*/)#]+)/);
    if (!markerMatch) continue;

    const stepKeys = markerMatch[1]!.split(",");
    for (const stepKey of stepKeys) {
      const trimmedKey = stepKey.trim();
      if (!trimmedKey) continue;
      (stepMap[trimmedKey] ??= []).push(lineIndex + 1);
    }
  }

  return stepMap;
}

/**
 * Build a full LineMap for an algorithm by loading all language source files,
 * parsing their @step markers, and combining them into a single lookup table.
 */
export function buildLineMapFromSources(
  algorithmId: string,
): Record<string, Record<SupportedLanguage, number[]>> {
  const languages: SupportedLanguage[] = ["typescript", "python", "java"];
  const allStepKeys = new Set<string>();
  const perLanguage: Record<SupportedLanguage, Record<string, number[]>> = {
    typescript: {},
    python: {},
    java: {},
  };

  for (const language of languages) {
    const source = loadSource(algorithmId, language);
    if (!source) continue;
    const markers = parseStepMarkers(source);
    perLanguage[language] = markers;
    for (const key of Object.keys(markers)) {
      allStepKeys.add(key);
    }
  }

  const lineMap: Record<string, Record<SupportedLanguage, number[]>> = {};
  for (const stepKey of allStepKeys) {
    lineMap[stepKey] = {
      typescript: perLanguage.typescript[stepKey] ?? [],
      python: perLanguage.python[stepKey] ?? [],
      java: perLanguage.java[stepKey] ?? [],
    };
  }

  return lineMap;
}
