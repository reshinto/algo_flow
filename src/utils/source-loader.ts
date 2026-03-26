/**
 * @file source-loader.ts
 * @module utils/source-loader
 *
 * Native Vite Filesystem Compiler & Linker.
 * Leverages Vite's `import.meta.glob` API to traverse the literal file system at Build-Time.
 * Extracts the raw, un-minified `.ts`, `.py`, and `.java` text documents and dynamically translates
 * their structural `// @step:XYZ` line markers into mapped highlight pointers so the Editor Panel tracks the exact active lines!
 */
import type { SupportedLanguage } from "@/types";

/**
 * Executes explicitly during Vite compilation.
 * Eagerly pulls every raw algorithm display file into a giant RAM dictionary cache.
 * Uses `?raw` to demand plain-text strings instead of compiled Javascript bytecode.
 */
const sourceModules = import.meta.glob("/src/algorithms/*/*/sources/*", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Type-safe dictionary converting language keys to strict native file suffixes. */
const LANGUAGE_EXTENSIONS: Record<SupportedLanguage, string> = {
  typescript: ".ts",
  python: ".py",
  java: ".java",
};

/**
 * Queries the generic Vite RAM cache constructed by `sourceModules`.
 *
 * @param algorithmId The directory suffix (e.g., 'bubble-sort')
 * @param language The exact formatting (e.g., 'python' triggers '.py' resolution)
 * @returns The raw literal code string injected directly into Monaco, or undefined if the algorithm lacks that file.
 */
export function loadSource(algorithmId: string, language: SupportedLanguage): string | undefined {
  const extension = LANGUAGE_EXTENSIONS[language];

  // Perform a full scan across the loaded absolute Vite paths and snatch the correct string bucket
  for (const [filePath, content] of Object.entries(sourceModules)) {
    if (filePath.includes(`/${algorithmId}/sources/`) && filePath.endsWith(extension)) {
      return content;
    }
  }

  return undefined;
}

/** Diagnostic tool exposing all active loaded virtual URIs to the Vitest test-runner. */
export function getAllSourcePaths(): string[] {
  return Object.keys(sourceModules);
}

/**
 * Mutates string identifiers for universal access.
 * Converts `bubble-sort` into `BUBBLE_SORT` allowing constant auto-complete mapping.
 */
function kebabToUpperSnake(kebab: string): string {
  return kebab.replace(/-/g, "_").toUpperCase();
}

/**
 * Automagic Identifier Bootstrap.
 * Dynamically traverses the TypeScript `sources` paths mapped by Vite.
 * Reads the literal filename `[algorithmId].ts` and generates a universal Constant lookup map.
 *
 * @example
 * // Output format:
 * { BUBBLE_SORT: "bubble-sort", BFS: "bfs" }
 */
export function discoverAlgorithmIds(): Record<string, string> {
  const algorithmIdMap: Record<string, string> = {};

  for (const filePath of Object.keys(sourceModules)) {
    // Only parse the foundational TypeScript paths as the source of truth for Algorithm definitions
    if (!filePath.endsWith(".ts")) continue;

    // Snatch the literal filename off the end of the URI
    const filename = filePath.split("/").pop()!;
    const algorithmId = filename.replace(".ts", "");
    const enumKey = kebabToUpperSnake(algorithmId);

    algorithmIdMap[enumKey] = algorithmId;
  }

  return algorithmIdMap;
}

/**
 * The AST Parser.
 * Scans a 50+ line raw string (like Dijkstra's TS code). Regex scans for `// @step:initialize,trace` hooks.
 * Extracts the explicit index numbers so the React Visualizer can forcibly highlight Line 10 in Monaco when the graph `initialize` step executes.
 *
 * @param source Raw generic string literal representing a programming language document.
 * @returns Object mapping a step key (e.g. "loop") to physical array line rows [10, 11]
 */
export function parseStepMarkers(source: string): Record<string, number[]> {
  const stepMap: Record<string, number[]> = {};
  const sourceLines = source.split("\n");

  for (let lineIndex = 0; lineIndex < sourceLines.length; lineIndex++) {
    const line = sourceLines[lineIndex]!;
    // Target any text matching `// @step:[text]` or `# @step:[text]` syntax
    const markerMatch = line.match(/@step:([^\s*/)#]+)/);
    if (!markerMatch) continue;

    // Split multiple identifiers stacked on the exact same row (e.g. @step:init,begin)
    const stepKeys = markerMatch[1]!.split(",");
    for (const stepKey of stepKeys) {
      const trimmedKey = stepKey.trim();
      if (!trimmedKey) continue;

      // Store lineIndex + 1 because Monaco UI is 1-based indexing, not 0-based.
      (stepMap[trimmedKey] ??= []).push(lineIndex + 1);
    }
  }

  return stepMap;
}

/**
 * Giant generic orchestrator combining `loadSource` and `parseStepMarkers`.
 * Emits a mega-dictionary matching `stepKey` -> `{ typescript: [lines], python: [lines] }`
 * ensuring the visualizer accurately highlights identical logic nodes across radically different logic syntaxes securely.
 */
export function buildLineMapFromSources(
  algorithmId: string,
): Record<string, Record<SupportedLanguage, number[]>> {
  const languages: SupportedLanguage[] = ["typescript", "python", "java"];
  const allStepKeys = new Set<string>();

  // Construct empty tracking schema scaffolding
  const perLanguage: Record<SupportedLanguage, Record<string, number[]>> = {
    typescript: {},
    python: {},
    java: {},
  };

  // Compile individual dictionaries mapping active markers inside each individual parsed language payload
  for (const language of languages) {
    const source = loadSource(algorithmId, language);
    if (!source) continue;
    const markers = parseStepMarkers(source);
    perLanguage[language] = markers;

    // Globally register unique identifiers like "sort_swap"
    for (const key of Object.keys(markers)) {
      allStepKeys.add(key);
    }
  }

  const lineMap: Record<string, Record<SupportedLanguage, number[]>> = {};

  // Format the disjointed marker arrays structurally for fast React Object lookups
  for (const stepKey of allStepKeys) {
    lineMap[stepKey] = {
      typescript: perLanguage.typescript[stepKey] ?? [],
      python: perLanguage.python[stepKey] ?? [],
      java: perLanguage.java[stepKey] ?? [],
    };
  }

  return lineMap;
}
