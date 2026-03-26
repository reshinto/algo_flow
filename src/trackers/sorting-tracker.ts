/**
 * Tracker for sorting algorithm visualizations.
 *
 * Maintains a mutable array of elements and produces execution steps for
 * comparisons, swaps, and sorted-position markers. Each step captures an
 * array snapshot with per-element visual states (comparing, swapping, sorted).
 */
import type { ArrayElement, ArrayElementState, ArrayVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

/** Builds execution steps for sorting algorithms (bubble sort, etc.). */
export class SortingTracker extends BaseTracker {
  private elements: ArrayElement[];

  constructor(initialArray: number[], lineMap: LineMap) {
    super(lineMap);
    this.elements = initialArray.map((value) => ({ value, state: "default" as ArrayElementState }));
  }

  /**
   * Produce an immutable snapshot of the current array state.
   * Optionally overrides specific element states and attaches pointer positions.
   */
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

  /** Record the initial unsorted array state. */
  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize array for sorting",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Record a comparison between two elements, incrementing the comparisons metric. */
  compare(
    firstIndex: number,
    secondIndex: number,
    variables: Record<string, unknown>,
    description?: string,
  ): void {
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "compare",
      description:
        description ??
        `Compare elements at index ${firstIndex} (${this.elements[firstIndex]?.value}) and index ${secondIndex} (${this.elements[secondIndex]?.value})`,
      variables,
      visualState: this.snapshot(
        { [firstIndex]: "comparing", [secondIndex]: "comparing" },
        { firstIndex: firstIndex, secondIndex: secondIndex },
      ),
    });
  }

  /** Swap two elements in the internal array and record the step. */
  swap(
    firstIndex: number,
    secondIndex: number,
    variables: Record<string, unknown>,
    description?: string,
  ): void {
    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };

    const tempValue = this.elements[firstIndex]!.value;
    this.elements[firstIndex]!.value = this.elements[secondIndex]!.value;
    this.elements[secondIndex]!.value = tempValue;

    this.pushStep({
      type: "swap",
      description: description ?? `Swap elements at index ${firstIndex} and index ${secondIndex}`,
      variables,
      visualState: this.snapshot(
        { [firstIndex]: "swapping", [secondIndex]: "swapping" },
        { firstIndex: firstIndex, secondIndex: secondIndex },
      ),
    });
  }

  /** Permanently mark an element as in its final sorted position. */
  markSorted(sortedIndex: number, variables: Record<string, unknown>): void {
    this.elements[sortedIndex]!.state = "sorted";
    this.pushStep({
      type: "mark-sorted",
      description: `Element at index ${sortedIndex} is in its final sorted position`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark all elements as sorted and record the final completion step. */
  complete(variables: Record<string, unknown>): void {
    for (const element of this.elements) {
      element.state = "sorted";
    }
    this.pushStep({
      type: "complete",
      description: "Sorting complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
