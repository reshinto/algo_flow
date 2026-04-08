import { describe, it, expect } from "vitest";
import type { ArrayVisualState } from "@/types";
import { generateCountingSortSteps } from "../step-generator";

describe("generateCountingSortSteps", () => {
  it("generates steps for a simple array", () => {
    const steps = generateCountingSortSteps([3, 1, 2]);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps for counting phase", () => {
    const steps = generateCountingSortSteps([3, 1, 2]);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("includes swap steps for placement phase", () => {
    const steps = generateCountingSortSteps([3, 1, 2]);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("swap");
  });

  it("marks all elements as sorted before complete", () => {
    const steps = generateCountingSortSteps([3, 1, 2]);
    const markSortedSteps = steps.filter((step) => step.type === "mark-sorted");
    expect(markSortedSteps.length).toBe(3);
  });

  it("produces correct final visual state with all elements sorted", () => {
    const steps = generateCountingSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
    for (const element of visualState.elements) {
      expect(element.state).toBe("sorted");
    }
  });

  it("accumulates metrics correctly", () => {
    const steps = generateCountingSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateCountingSortSteps([3, 1, 2]);
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
    const steps = generateCountingSortSteps([42]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles an empty array", () => {
    const steps = generateCountingSortSteps([]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
