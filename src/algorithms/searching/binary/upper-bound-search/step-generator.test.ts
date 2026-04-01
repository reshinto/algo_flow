import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateUpperBoundSearchSteps } from "./step-generator";

describe("generateUpperBoundSearchSteps", () => {
  it("generates steps for a basic upper bound search", () => {
    const steps = generateUpperBoundSearchSteps({
      sortedArray: [1, 3, 3, 5, 5, 5, 8, 12],
      targetValue: 5,
    });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps", () => {
    const steps = generateUpperBoundSearchSteps({
      sortedArray: [1, 3, 3, 5, 5, 5, 8, 12],
      targetValue: 5,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when an upper bound candidate is identified", () => {
    const steps = generateUpperBoundSearchSteps({
      sortedArray: [1, 3, 5, 7, 9],
      targetValue: 5,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("found");
  });

  it("includes eliminate steps during the search", () => {
    const steps = generateUpperBoundSearchSteps({
      sortedArray: [1, 3, 5, 7, 9],
      targetValue: 3,
    });
    const eliminateSteps = steps.filter((step) => step.type === "eliminate");
    expect(eliminateSteps.length).toBeGreaterThan(0);
  });

  it("produces correct visual state kind", () => {
    const steps = generateUpperBoundSearchSteps({
      sortedArray: [10, 20, 30],
      targetValue: 20,
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;
    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateUpperBoundSearchSteps({
      sortedArray: [1, 3, 5, 7, 9],
      targetValue: 5,
    });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateUpperBoundSearchSteps({
      sortedArray: [2, 4, 6, 8],
      targetValue: 5,
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

  it("handles an empty array", () => {
    const steps = generateUpperBoundSearchSteps({
      sortedArray: [],
      targetValue: 5,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles a single element array", () => {
    const steps = generateUpperBoundSearchSteps({
      sortedArray: [10],
      targetValue: 5,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles target larger than all elements", () => {
    const steps = generateUpperBoundSearchSteps({
      sortedArray: [1, 2, 3],
      targetValue: 99,
    });
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
