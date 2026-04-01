import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateTernarySearchSteps } from "./step-generator";

describe("generateTernarySearchSteps", () => {
  it("first step is initialize and last step is complete", () => {
    const steps = generateTernarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 72,
    });
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[0]!.index).toBe(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes compare steps", () => {
    const steps = generateTernarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 72,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("includes at least two compare steps per iteration", () => {
    const steps = generateTernarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 38,
    });
    const compareCount = steps.filter((step) => step.type === "compare").length;
    expect(compareCount).toBeGreaterThanOrEqual(2);
  });

  it("includes a found step when the target exists", () => {
    const steps = generateTernarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 72,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("found");
  });

  it("does not include a found step when the target is absent", () => {
    const steps = generateTernarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 99,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).not.toContain("found");
  });

  it("includes eliminate steps when narrowing the search range", () => {
    const steps = generateTernarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 72,
    });
    const eliminateSteps = steps.filter((step) => step.type === "eliminate");
    expect(eliminateSteps.length).toBeGreaterThan(0);
  });

  it("produces correct visual state kind", () => {
    const steps = generateTernarySearchSteps({
      sortedArray: [10, 20, 30],
      targetValue: 20,
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;
    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateTernarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 72,
    });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for compare steps", () => {
    const steps = generateTernarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 72,
    });
    const compareStep = steps.find((step) => step.type === "compare");
    expect(compareStep).toBeDefined();
    expect(compareStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = compareStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("variables include low, high, mid1, and mid2 pointers on compare steps", () => {
    const steps = generateTernarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 72,
    });
    const compareStep = steps.find((step) => step.type === "compare");
    expect(compareStep).toBeDefined();
    expect(compareStep!.variables).toHaveProperty("lowIndex");
    expect(compareStep!.variables).toHaveProperty("highIndex");
    expect(compareStep!.variables).toHaveProperty("mid1Index");
    expect(compareStep!.variables).toHaveProperty("mid2Index");
  });

  it("handles a single element array", () => {
    const steps = generateTernarySearchSteps({ sortedArray: [42], targetValue: 42 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles an empty array", () => {
    const steps = generateTernarySearchSteps({ sortedArray: [], targetValue: 5 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
