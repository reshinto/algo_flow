/**
 * Tracker for searching algorithm visualizations (e.g. binary search).
 *
 * Maintains an array with per-element visual states and tracks which regions
 * have been eliminated during the search. Produces steps for visits,
 * comparisons, eliminations, and found/not-found outcomes.
 */
import type { ArrayElement, ArrayElementState, ArrayVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

/** Builds execution steps for searching algorithms. */
export class SearchingTracker extends BaseTracker {
  private elements: ArrayElement[];
  private targetValue: number;

  constructor(initialArray: number[], targetValue: number, lineMap: LineMap) {
    super(lineMap);
    this.targetValue = targetValue;
    this.elements = initialArray.map((value) => ({
      value,
      state: "default" as ArrayElementState,
    }));
  }

  /** Produce an immutable snapshot, optionally overriding element states and pointers. */
  private snapshot(
    overrides?: Partial<Record<number, ArrayElementState>>,
    pointers?: Record<string, number>,
  ): ArrayVisualState {
    const elements = this.elements.map((element, elementIndex) => ({
      ...element,
      state: overrides?.[elementIndex] ?? element.state,
    }));
    return { kind: "array", elements, pointers: pointers ?? {} };
  }

  /** Record the initial array state before searching begins. */
  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: `Initialize binary search for target ${this.targetValue}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Record visiting an element at the given index for inspection. */
  visit(index: number, pointers: Record<string, number>, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "visit",
      description: `Check element at index ${index} (value: ${this.elements[index]?.value})`,
      variables,
      visualState: this.snapshot({ [index]: "current" }, pointers),
    });
  }

  compare(
    index: number,
    pointers: Record<string, number>,
    variables: Record<string, unknown>,
    description: string,
  ): void {
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "compare",
      description,
      variables,
      visualState: this.snapshot({ [index]: "comparing" }, pointers),
    });
  }

  eliminate(
    startIndex: number,
    endIndex: number,
    pointers: Record<string, number>,
    variables: Record<string, unknown>,
    description: string,
  ): void {
    const overrides: Partial<Record<number, ArrayElementState>> = {};
    for (let idx = startIndex; idx <= endIndex; idx++) {
      this.elements[idx]!.state = "eliminated";
      overrides[idx] = "eliminated";
    }
    this.pushStep({
      type: "eliminate",
      description,
      variables,
      visualState: this.snapshot(overrides, pointers),
    });
  }

  found(index: number, variables: Record<string, unknown>): void {
    this.pushStep({
      type: "found",
      description: `Target ${this.targetValue} found at index ${index}`,
      variables,
      visualState: this.snapshot({ [index]: "found" }),
    });
  }

  complete(variables: Record<string, unknown>, found: boolean): void {
    this.pushStep({
      type: "complete",
      description: found
        ? `Search complete: target ${this.targetValue} was found`
        : `Search complete: target ${this.targetValue} was not found`,
      variables,
      visualState: this.snapshot(),
    });
  }
}
