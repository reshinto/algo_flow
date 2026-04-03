import { describe, it, expect } from "vitest";
import type { ArrayVisualState } from "@/types";
import { generateDoubleSelectionSortSteps } from "./step-generator";

describe("generateDoubleSelectionSortSteps", () => {
  it("generates steps for a simple array", () => {
    const steps = generateDoubleSelectionSortSteps([3, 1, 2]);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare and swap steps", () => {
    const steps = generateDoubleSelectionSortSteps([3, 1, 4]);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
    expect(stepTypes).toContain("swap");
  });

  it("marks both ends as sorted each pass", () => {
    const steps = generateDoubleSelectionSortSteps([4, 2, 6, 1]);
    const markSortedSteps = steps.filter((step) => step.type === "mark-sorted");
    // Two elements sorted per pass for even-length array
    expect(markSortedSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("produces correct final visual state with all elements sorted", () => {
    const steps = generateDoubleSelectionSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
    for (const element of visualState.elements) {
      expect(element.state).toBe("sorted");
    }
  });

  it("accumulates metrics correctly", () => {
    const steps = generateDoubleSelectionSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateDoubleSelectionSortSteps([3, 1, 2]);
    const compareStep = steps.find((step) => step.type === "compare");

    expect(compareStep).toBeDefined();
    expect(compareStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = compareStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a single element array", () => {
    const steps = generateDoubleSelectionSortSteps([42]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
