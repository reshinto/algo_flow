import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateExponentialSearchSteps } from "./step-generator";

describe("generateExponentialSearchSteps", () => {
  it("generates steps for a basic search", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 8,
    });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes visit steps during the exponential probing phase", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 56,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("visit");
  });

  it("includes compare steps during the binary search phase", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 8,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when the target exists", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 8,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("found");
  });

  it("does not include a found step when the target is absent", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 50,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).not.toContain("found");
  });

  it("finds the first element immediately with a visit and found step", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [2, 5, 8, 12, 16],
      targetValue: 2,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("found");
  });

  it("produces correct visual state kind", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [10, 20, 30],
      targetValue: 20,
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 8,
    });
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("handles an empty array", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [],
      targetValue: 5,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles a single element array", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [42],
      targetValue: 42,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes eliminate steps during binary search phase", () => {
    const steps = generateExponentialSearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    });
    const eliminateSteps = steps.filter((step) => step.type === "eliminate");

    expect(eliminateSteps.length).toBeGreaterThan(0);
  });
});
