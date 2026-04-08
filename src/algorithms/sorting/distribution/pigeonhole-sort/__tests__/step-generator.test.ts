import { describe, it, expect } from "vitest";
import type { ArrayVisualState } from "@/types";
import { generatePigeonholeSortSteps } from "../step-generator";

describe("generatePigeonholeSortSteps", () => {
  it("generates steps for a simple array", () => {
    const steps = generatePigeonholeSortSteps([3, 1, 2]);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps for the place phase", () => {
    const steps = generatePigeonholeSortSteps([3, 1, 2]);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("includes swap steps for the collect phase", () => {
    const steps = generatePigeonholeSortSteps([3, 1, 2]);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("swap");
  });

  it("marks all elements sorted after collection", () => {
    const steps = generatePigeonholeSortSteps([3, 1, 2]);
    const markSortedSteps = steps.filter((step) => step.type === "mark-sorted");
    expect(markSortedSteps.length).toBe(3);
  });

  it("produces correct final visual state with all elements sorted", () => {
    const steps = generatePigeonholeSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
    for (const element of visualState.elements) {
      expect(element.state).toBe("sorted");
    }
  });

  it("accumulates metrics correctly", () => {
    const steps = generatePigeonholeSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generatePigeonholeSortSteps([3, 1, 2]);
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
    const steps = generatePigeonholeSortSteps([42]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles an empty array", () => {
    const steps = generatePigeonholeSortSteps([]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
