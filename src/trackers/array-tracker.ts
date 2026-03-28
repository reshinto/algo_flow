/**
 * Array techniques tracker — builds execution steps for sliding window,
 * two-pointer, partitioning, and similar array algorithms. Tracks a movable
 * window range and element states, highlighting the active window region
 * in each step's visual state.
 */
import type { ArrayElement, ArrayElementState, ArrayVisualState } from "@/types";
import type { StepType } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class ArrayTracker extends BaseTracker {
  private elements: ArrayElement[];
  private windowStart: number = 0;
  private windowEnd: number = 0;
  private windowActive: boolean = false;
  private secondaryElements: ArrayElement[] | undefined;
  private secondaryLabel: string | undefined;

  constructor(initialArray: number[], lineMap: LineMap) {
    super(lineMap);
    this.elements = initialArray.map((value) => ({
      value,
      state: "default" as ArrayElementState,
    }));
  }

  /** Deep-copy elements with window overlay applied for an immutable step snapshot. */
  private snapshot(pointers?: Record<string, number>): ArrayVisualState {
    const elements = this.elements.map((element, elementIndex) => ({
      ...element,
      state:
        this.windowActive && elementIndex >= this.windowStart && elementIndex <= this.windowEnd
          ? ("in-window" as ArrayElementState)
          : element.state,
    }));
    const result: ArrayVisualState = {
      kind: "array",
      elements,
      pointers: pointers ?? {},
      windowRange: this.windowActive ? [this.windowStart, this.windowEnd] : undefined,
    };
    if (this.secondaryElements) {
      result.secondaryElements = this.secondaryElements.map((element) => ({ ...element }));
      result.secondaryLabel = this.secondaryLabel;
    }
    return result;
  }

  /** Enable or disable the window overlay for non-window algorithms. */
  setWindowActive(active: boolean): void {
    this.windowActive = active;
  }

  /** Set the secondary array for dual-array visualizations (prefix sum, merge, etc.). */
  setSecondaryArray(values: number[], label?: string): void {
    this.secondaryElements = values.map((value) => ({
      value,
      state: "default" as ArrayElementState,
    }));
    this.secondaryLabel = label;
  }

  /** Update a single element in the secondary array. */
  updateSecondaryElement(index: number, value: number, state?: ArrayElementState): void {
    if (!this.secondaryElements) return;
    if (index < this.secondaryElements.length) {
      this.secondaryElements[index] = { value, state: state ?? "default" };
    } else {
      /* Extend the secondary array if needed */
      while (this.secondaryElements.length <= index) {
        this.secondaryElements.push({ value: 0, state: "default" });
      }
      this.secondaryElements[index] = { value, state: state ?? "default" };
    }
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize array processing",
      variables,
      visualState: this.snapshot(),
    });
  }

  moveWindow(
    start: number,
    end: number,
    variables: Record<string, unknown>,
    description?: string,
  ): void {
    this.windowActive = true;
    this.windowStart = start;
    this.windowEnd = end;
    this.pushStep({
      type: "move-window",
      description: description ?? `Move window to [${start}, ${end}]`,
      variables,
      visualState: this.snapshot({ windowStart: start, windowEnd: end }),
    });
  }

  expandWindow(variables: Record<string, unknown>, description?: string): void {
    this.windowActive = true;
    this.windowEnd++;
    this.pushStep({
      type: "expand-window",
      description: description ?? `Expand window end to ${this.windowEnd}`,
      variables,
      visualState: this.snapshot({ windowStart: this.windowStart, windowEnd: this.windowEnd }),
    });
  }

  shrinkWindow(variables: Record<string, unknown>, description?: string): void {
    this.windowActive = true;
    this.windowStart++;
    this.pushStep({
      type: "shrink-window",
      description: description ?? `Shrink window start to ${this.windowStart}`,
      variables,
      visualState: this.snapshot({ windowStart: this.windowStart, windowEnd: this.windowEnd }),
    });
  }

  /** Swap two elements in-place and emit a swap step. */
  swap(
    indexA: number,
    indexB: number,
    variables: Record<string, unknown>,
    description?: string,
  ): void {
    const elementA = this.elements[indexA]!;
    const elementB = this.elements[indexB]!;
    const tempValue = elementA.value;
    elementA.value = elementB.value;
    elementB.value = tempValue;

    elementA.state = "swapping";
    elementB.state = "swapping";
    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };

    this.pushStep({
      type: "swap",
      description: description ?? `Swap elements at index ${indexA} and ${indexB}`,
      variables,
      visualState: this.snapshot({ swapA: indexA, swapB: indexB }),
    });

    elementA.state = "default";
    elementB.state = "default";
  }

  /** Compare two elements and emit a compare step with both marked as comparing. */
  compareTwo(
    indexA: number,
    indexB: number,
    variables: Record<string, unknown>,
    description?: string,
  ): void {
    this.elements[indexA]!.state = "comparing";
    this.elements[indexB]!.state = "comparing";
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };

    this.pushStep({
      type: "compare",
      description: description ?? `Compare elements at index ${indexA} and ${indexB}`,
      variables,
      visualState: this.snapshot({ left: indexA, right: indexB }),
    });

    this.elements[indexA]!.state = "default";
    this.elements[indexB]!.state = "default";
  }

  /** Mark a single element with an arbitrary state and emit a step. */
  markElement(
    index: number,
    state: ArrayElementState,
    variables: Record<string, unknown>,
    description?: string,
    stepType?: StepType,
  ): void {
    this.elements[index]!.state = state;

    this.pushStep({
      type: stepType ?? "visit",
      description: description ?? `Mark element at index ${index} as ${state}`,
      variables,
      visualState: this.snapshot({ markedIndex: index }),
    });
  }

  visit(index: number, variables: Record<string, unknown>, description?: string): void {
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "visit",
      description: description ?? `Visit element at index ${index}`,
      variables,
      visualState: this.snapshot({ currentIndex: index }),
    });
  }

  complete(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "complete",
      description: "Processing complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
