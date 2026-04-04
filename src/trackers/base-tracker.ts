/**
 * Base tracker abstraction for building algorithm execution steps.
 *
 * Each category-specific tracker (sorting, searching, etc.) extends this class
 * and provides domain-specific methods that internally call `pushStep()` to
 * record an `ExecutionStep` with the correct visual state and per-language
 * line mappings. Step generators use these trackers to eagerly produce the
 * full step array consumed by playback.
 */
import type { ExecutionStep, LineHighlight, StepMetrics, StepType, VisualState } from "@/types";
import type { SupportedLanguage } from "@/types";

/**
 * Maps a logical step key (e.g. "compare", "swap") to the corresponding
 * source-file line numbers for each supported language, enabling synchronized
 * code highlighting during playback.
 */
export type LineMap = Record<string, Record<SupportedLanguage, number[]>>;

/** Parameters required to construct a single execution step. */
export interface StepInput {
  type: StepType;
  description: string;
  variables: Record<string, unknown>;
  visualState: VisualState;
  /** Override the line-map lookup key when it differs from the step type. */
  lineMapKey?: string;
}

/**
 * Abstract base for all category-specific trackers.
 *
 * Manages the accumulated step list and running metrics. Subclasses add
 * domain methods (e.g. `compare`, `swap`, `enqueue`) that mutate internal
 * visual state and delegate to `pushStep()`.
 */
export abstract class BaseTracker {
  protected steps: ExecutionStep[] = [];
  protected metrics: StepMetrics = {
    comparisons: 0,
    swaps: 0,
    visits: 0,
    cacheHits: 0,
    queueOperations: 0,
    elapsedSteps: 0,
  };

  protected lineMap: LineMap;

  constructor(lineMap: LineMap) {
    this.lineMap = lineMap;
  }

  /** Maximum steps any single step generator may produce before being cut off. */
  private static readonly MAX_STEPS = 10_000;

  /** Record a new execution step, resolving line highlights from the line map. */
  protected pushStep(input: StepInput): void {
    if (this.steps.length >= BaseTracker.MAX_STEPS) {
      throw new Error(
        `Step limit (${String(BaseTracker.MAX_STEPS)}) exceeded — likely an infinite loop ` +
          "caused by invalid input (duplicates, out-of-range values, or unsorted data). " +
          "Check the algorithm's input constraints.",
      );
    }

    const highlightedLines = this.resolveLines(input.lineMapKey ?? input.type);
    this.metrics = { ...this.metrics, elapsedSteps: this.metrics.elapsedSteps + 1 };

    this.steps.push({
      index: this.steps.length,
      type: input.type,
      description: input.description,
      highlightedLines,
      variables: { ...input.variables },
      visualState: input.visualState,
      metrics: { ...this.metrics },
    });
  }

  /** Convert a line-map key into an array of per-language line highlights. */
  private resolveLines(key: string): LineHighlight[] {
    const mapping = this.lineMap[key];
    if (!mapping) return [];

    return Object.entries(mapping).map(([language, lines]) => ({
      language: language as SupportedLanguage,
      lines,
    }));
  }

  /** Return all recorded execution steps. */
  getSteps(): ExecutionStep[] {
    return this.steps;
  }

  /** Return a snapshot of the current cumulative metrics. */
  getMetrics(): StepMetrics {
    return { ...this.metrics };
  }
}
