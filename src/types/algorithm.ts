/**
 * @file algorithm.ts
 * @module types/algorithm
 *
 * Core algorithm type definitions for the registry-driven architecture.
 * Every algorithm self-registers an {@link AlgorithmDefinition} that the
 * generic UI consumes without requiring any algorithmic-specific layout logic.
 */
import type { EducationalContent } from "./educational";
import type { ExecutionStep } from "./execution";

/**
 * Algorithm category identifier — matches the directory name under `src/algorithms/`.
 * Categories are auto-discovered from the filesystem via `discoverCategoryLabels()`.
 * Use the `CATEGORY` constant from `@/utils/constants` for type-safe access.
 */
export type AlgorithmCategory = string;

/** Languages with source file implementations. */
export type SupportedLanguage = "typescript" | "python" | "java";

/** Best/average/worst time complexity for UI display. */
export interface ComplexitySpec {
  best: string;
  average: string;
  worst: string;
}

/** Read-only metadata shown in the algorithm header. */
export interface AlgorithmMeta {
  /** Kebab-case identifier matching the algorithm's directory name (e.g. `bubble-sort`). */
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  timeComplexity: ComplexitySpec;
  spaceComplexity: string;
  supportedLanguages: SupportedLanguage[];
  defaultInput: unknown;
}

/**
 * Complete algorithm registration consumed by the registry.
 *
 * @typeParam TInput - Shape of the algorithm's input.
 */
export interface AlgorithmDefinition<TInput = unknown> {
  meta: AlgorithmMeta;

  /** Runs the algorithm and returns its result (used in correctness tests). */
  execute: (input: TInput) => unknown;

  /** Produces the full ExecutionStep[] timeline for playback. */
  generateSteps: (input: TInput) => ExecutionStep[];

  /** Educational content for the info drawer. */
  educational: EducationalContent;

  /**
   * Source code strings per language, resolved at build time.
   * @see source-loader.ts
   */
  sources: Record<SupportedLanguage, string>;
}
