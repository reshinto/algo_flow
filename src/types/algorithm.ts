/**
 * Core algorithm type definitions for the registry-driven architecture.
 * Every algorithm self-registers an {@link AlgorithmDefinition} that the
 * generic UI consumes without algorithm-specific logic.
 */

import type { EducationalContent } from "./educational";
import type { ExecutionStep } from "./execution";

/** Supported algorithm categories that drive sidebar grouping and tracker selection. */
export type AlgorithmCategory =
  | "sorting"
  | "searching"
  | "graph"
  | "pathfinding"
  | "dynamic-programming"
  | "array-techniques";

/** Languages for which real source files and line mappings must exist. */
export type SupportedLanguage = "typescript" | "python" | "java";

/** Big-O bounds for an algorithm's time complexity across input scenarios. */
export interface ComplexitySpec {
  best: string;
  average: string;
  worst: string;
}

/** Static metadata displayed in the UI and used for filtering/grouping. */
export interface AlgorithmMeta {
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
 * Complete algorithm registration payload consumed by the registry.
 *
 * @typeParam TInput - Shape of the algorithm's input (e.g., number[] for sorting).
 *
 * - `execute` runs the pure algorithm (used in correctness tests).
 * - `generateSteps` eagerly produces the full step array for playback.
 * - `sources` maps each language to its raw source string loaded via Vite `?raw`.
 */
export interface AlgorithmDefinition<TInput = unknown> {
  meta: AlgorithmMeta;
  execute: (input: TInput) => unknown;
  generateSteps: (input: TInput) => ExecutionStep[];
  educational: EducationalContent;
  sources: Record<SupportedLanguage, string>;
}
