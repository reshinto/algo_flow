import { describe, it, expect } from "vitest";
import type { ArrayVisualState } from "@/types";
import { generateSmoothSortSteps } from "../step-generator";

describe("generateSmoothSortSteps", () => {
  it("generates steps for a simple array", () => {
    const steps = generateSmoothSortSteps([3, 1, 2]);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare and swap steps", () => {
    const steps = generateSmoothSortSteps([3, 1, 2]);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("marks elements as sorted", () => {
    const steps = generateSmoothSortSteps([3, 1, 2]);
    const markSortedSteps = steps.filter((step) => step.type === "mark-sorted");
    expect(markSortedSteps.length).toBeGreaterThan(0);
  });

  it("produces correct final visual state with all elements sorted", () => {
    const steps = generateSmoothSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
    for (const element of visualState.elements) {
      expect(element.state).toBe("sorted");
    }
  });

  it("accumulates metrics correctly", () => {
    const steps = generateSmoothSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateSmoothSortSteps([3, 1, 2]);
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
    const steps = generateSmoothSortSteps([42]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles an already sorted array", () => {
    const steps = generateSmoothSortSteps([1, 2, 3]);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
    const visualState = lastStep.visualState as ArrayVisualState;
    expect(visualState.elements.map((el) => el.value)).toEqual([1, 2, 3]);
  });

  it("final visual state values match sorted order for default E2E input", () => {
    const input = [64, 34, 25, 12, 22, 11, 90];
    const steps = generateSmoothSortSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;
    const displayedValues = visualState.elements.map((element) => element.value);
    expect(displayedValues).toEqual([...input].sort((firstVal, secondVal) => firstVal - secondVal));
  });
});
