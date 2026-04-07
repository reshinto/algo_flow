import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";
import type { LineMap } from "./base-tracker";

import { SortingTracker } from "./sorting-tracker";

const MOCK_LINE_MAP: LineMap = {
  initialize: { typescript: [1], python: [1], java: [1], rust: [], cpp: [], go: [] },
  compare: { typescript: [3, 4], python: [3], java: [4, 5], rust: [], cpp: [], go: [] },
  swap: { typescript: [5, 6, 7], python: [4, 5], java: [6, 7, 8], rust: [], cpp: [], go: [] },
  "mark-sorted": { typescript: [8], python: [6], java: [9], rust: [], cpp: [], go: [] },
  complete: { typescript: [10], python: [8], java: [11], rust: [], cpp: [], go: [] },
};

describe("SortingTracker", () => {
  it("initializes with the correct array state", () => {
    const tracker = new SortingTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.initialize({ arrayLength: 3 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("initialize");

    const visualState = steps[0]!.visualState as ArrayVisualState;
    expect(visualState.kind).toBe("array");
    expect(visualState.elements).toHaveLength(3);
    expect(visualState.elements[0]!.value).toBe(5);
    expect(visualState.elements[0]!.state).toBe("default");
  });

  it("records a compare step with correct metrics", () => {
    const tracker = new SortingTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.compare(0, 1, { outerIndex: 0, innerIndex: 1 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("compare");
    expect(steps[0]!.metrics.comparisons).toBe(1);
    expect(steps[0]!.metrics.swaps).toBe(0);

    const visualState = steps[0]!.visualState as ArrayVisualState;
    expect(visualState.elements[0]!.state).toBe("comparing");
    expect(visualState.elements[1]!.state).toBe("comparing");
    expect(visualState.elements[2]!.state).toBe("default");
  });

  it("records a swap step and mutates element values", () => {
    const tracker = new SortingTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.swap(0, 1, { outerIndex: 0, innerIndex: 1 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("swap");
    expect(steps[0]!.metrics.swaps).toBe(1);

    const visualState = steps[0]!.visualState as ArrayVisualState;
    expect(visualState.elements[0]!.value).toBe(3);
    expect(visualState.elements[1]!.value).toBe(5);
    expect(visualState.elements[0]!.state).toBe("swapping");
    expect(visualState.elements[1]!.state).toBe("swapping");
  });

  it("marks an element as sorted", () => {
    const tracker = new SortingTracker([1, 2, 3], MOCK_LINE_MAP);
    tracker.markSorted(2, { sortedIndex: 2 });

    const steps = tracker.getSteps();
    const visualState = steps[0]!.visualState as ArrayVisualState;
    expect(visualState.elements[2]!.state).toBe("sorted");
  });

  it("marks all elements sorted on complete", () => {
    const tracker = new SortingTracker([1, 2, 3], MOCK_LINE_MAP);
    tracker.complete({});

    const steps = tracker.getSteps();
    const visualState = steps[0]!.visualState as ArrayVisualState;
    for (const element of visualState.elements) {
      expect(element.state).toBe("sorted");
    }
  });

  it("accumulates metrics across multiple steps", () => {
    const tracker = new SortingTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.compare(0, 1, {});
    tracker.swap(0, 1, {});
    tracker.compare(1, 2, {});
    tracker.swap(1, 2, {});

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(4);

    const lastStep = steps[3]!;
    expect(lastStep.metrics.comparisons).toBe(2);
    expect(lastStep.metrics.swaps).toBe(2);
    expect(lastStep.metrics.elapsedSteps).toBe(4);
  });

  it("includes correct highlighted lines from line map", () => {
    const tracker = new SortingTracker([5, 3], MOCK_LINE_MAP);
    tracker.compare(0, 1, {});

    const steps = tracker.getSteps();
    const highlightedLines = steps[0]!.highlightedLines;

    const tsHighlight = highlightedLines.find((highlight) => highlight.language === "typescript");
    expect(tsHighlight?.lines).toEqual([3, 4]);

    const pyHighlight = highlightedLines.find((highlight) => highlight.language === "python");
    expect(pyHighlight?.lines).toEqual([3]);
  });

  it("produces snapshot variables that are independent copies", () => {
    const tracker = new SortingTracker([5, 3], MOCK_LINE_MAP);
    const variables = { outerIndex: 0 };
    tracker.compare(0, 1, variables);

    variables.outerIndex = 99;

    const steps = tracker.getSteps();
    expect(steps[0]!.variables.outerIndex).toBe(0);
  });
});
