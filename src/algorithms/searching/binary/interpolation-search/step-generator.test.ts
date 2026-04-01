import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateInterpolationSearchSteps } from "./step-generator";

describe("generateInterpolationSearchSteps", () => {
  it("generates steps for a basic search", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when the target exists", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("found");
  });

  it("does not include a found step when the target is absent", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 50,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).not.toContain("found");
  });

  it("produces correct visual state kind", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [10, 20, 30],
      targetValue: 20,
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    });
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("handles eliminate steps when narrowing the range", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 72,
    });
    const eliminateSteps = steps.filter((step) => step.type === "eliminate");

    expect(eliminateSteps.length).toBeGreaterThan(0);
  });

  it("handles a single element array", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [42],
      targetValue: 42,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles an empty array", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [],
      targetValue: 5,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [10, 20, 30, 40, 50],
      targetValue: 30,
    });
    const compareStep = steps.find((step) => step.type === "compare");

    expect(compareStep).toBeDefined();
    expect(compareStep!.highlightedLines.length).toBeGreaterThan(0);
  });

  it("handles uniform-value array via division-by-zero guard", () => {
    const steps = generateInterpolationSearchSteps({
      sortedArray: [5, 5, 5, 5, 5],
      targetValue: 5,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("found");
  });
});
