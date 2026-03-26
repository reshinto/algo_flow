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
 * Supported algorithm categories that drive Sidebar grouping and Command Palette filtering.
 */
export type AlgorithmCategory =
  | "sorting"
  | "searching"
  | "graph"
  | "pathfinding"
  | "dynamic-programming"
  | "array-techniques";

/**
 * Programming Languages natively supported by the internal Vite AST source-loader parser.
 */
export type SupportedLanguage = "typescript" | "python" | "java";

/**
 * Mathematical Big-O bounds detailing an algorithm's execution stress across variable input scenarios.
 * Used entirely for rendering rigid statistics inside the UI.
 */
export interface ComplexitySpec {
  best: string;
  average: string;
  worst: string;
}

/**
 * Static read-only metadata displayed globally in headers before an algorithm is actually mathematically executed.
 */
export interface AlgorithmMeta {
  /** Underlying structural map ID mapping directly back to physical local TS files (e.g. `bubble-sort`) */
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  timeComplexity: ComplexitySpec;
  spaceComplexity: string;
  supportedLanguages: SupportedLanguage[];
  /** Generic parameter object dictating what the input fields default to statically */
  defaultInput: unknown;
}

/**
 * The holy-grail interface binding logic files to the visual React renderers.
 * Complete algorithm registration payload consumed explicitly by `src/registry.ts`.
 *
 * @typeParam TInput - Strict mathematical shape of the algorithm's input (e.g., `number[]` for Arrays, or custom tuple bounds in Grid setups).
 */
export interface AlgorithmDefinition<TInput = unknown> {
  /** Basic textual metadata like Name and Big-O Complexity */
  meta: AlgorithmMeta;

  /**
   * Validates correctness natively mimicking standard function output.
   * Mostly used natively inside Vitest logic to check the exact mathematical result independently from standard visual side-effects.
   */
  execute: (input: TInput) => unknown;

  /**
   * The structural heart of the visualization.
   * This generator iterates over the logic graph offline, freezing exact clones of memory mappings internally, returning a rigid static execution timeline.
   */
  generateSteps: (input: TInput) => ExecutionStep[];

  /** Raw Markdown text payload mapped exactly to the Right-Hand sliding Information panels. */
  educational: EducationalContent;

  /**
   * Raw strings mapping exactly to physical filesystem snippets, resolved entirely at Vite build-time.
   * @see source-loader.ts
   */
  sources: Record<SupportedLanguage, string>;
}
