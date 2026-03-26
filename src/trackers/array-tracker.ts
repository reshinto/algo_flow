import type { ArrayElement, ArrayElementState, ArrayVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class ArrayTracker extends BaseTracker {
  private elements: ArrayElement[];
  private windowStart: number = 0;
  private windowEnd: number = 0;

  constructor(initialArray: number[], lineMap: LineMap) {
    super(lineMap);
    this.elements = initialArray.map((value) => ({
      value,
      state: "default" as ArrayElementState,
    }));
  }

  private snapshot(pointers?: Record<string, number>): ArrayVisualState {
    const elements = this.elements.map((element, elementIndex) => ({
      ...element,
      state:
        elementIndex >= this.windowStart && elementIndex <= this.windowEnd
          ? ("in-window" as ArrayElementState)
          : element.state,
    }));
    return {
      kind: "array",
      elements,
      pointers: pointers ?? {},
      windowRange: [this.windowStart, this.windowEnd],
    };
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
    this.windowEnd++;
    this.pushStep({
      type: "expand-window",
      description: description ?? `Expand window end to ${this.windowEnd}`,
      variables,
      visualState: this.snapshot({ windowStart: this.windowStart, windowEnd: this.windowEnd }),
    });
  }

  shrinkWindow(variables: Record<string, unknown>, description?: string): void {
    this.windowStart++;
    this.pushStep({
      type: "shrink-window",
      description: description ?? `Shrink window start to ${this.windowStart}`,
      variables,
      visualState: this.snapshot({ windowStart: this.windowStart, windowEnd: this.windowEnd }),
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
