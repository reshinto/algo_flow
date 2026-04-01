import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateSearchRotatedArraySteps } from "./step-generator";

describe("generateSearchRotatedArraySteps", () => {
  it("generates steps for a basic rotated array search", () => {
    const steps = generateSearchRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
      targetValue: 0,
    });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps", () => {
    const steps = generateSearchRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
      targetValue: 0,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when the target exists", () => {
    const steps = generateSearchRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
      targetValue: 0,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("found");
  });

  it("does not include a found step when the target is absent", () => {
    const steps = generateSearchRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
      targetValue: 3,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).not.toContain("found");
  });

  it("includes eliminate steps when narrowing the search range", () => {
    const steps = generateSearchRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
      targetValue: 5,
    });
    const eliminateSteps = steps.filter((step) => step.type === "eliminate");
    expect(eliminateSteps.length).toBeGreaterThan(0);
  });

  it("produces correct visual state kind", () => {
    const steps = generateSearchRotatedArraySteps({
      sortedArray: [3, 4, 5, 1, 2],
      targetValue: 4,
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;
    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateSearchRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
      targetValue: 0,
    });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateSearchRotatedArraySteps({
      sortedArray: [5, 6, 1, 2, 3, 4],
      targetValue: 3,
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

  it("handles a single element array", () => {
    const steps = generateSearchRotatedArraySteps({
      sortedArray: [42],
      targetValue: 42,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
