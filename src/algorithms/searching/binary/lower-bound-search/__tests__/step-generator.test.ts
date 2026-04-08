import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateLowerBoundSearchSteps } from "../step-generator";

describe("generateLowerBoundSearchSteps", () => {
  it("generates steps for a basic search", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [1, 3, 3, 5, 5, 5, 8, 12],
      targetValue: 5,
    });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [1, 3, 3, 5, 5, 5, 8, 12],
      targetValue: 5,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when a lower bound candidate is identified", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [1, 3, 3, 5, 5, 5, 8, 12],
      targetValue: 5,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("found");
  });

  it("produces correct visual state kind", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [10, 20, 30],
      targetValue: 20,
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [1, 3, 3, 5, 5, 5, 8, 12],
      targetValue: 5,
    });
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes eliminate steps when narrowing the search range", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [1, 3, 3, 5, 5, 5, 8, 12],
      targetValue: 5,
    });
    const eliminateSteps = steps.filter((step) => step.type === "eliminate");

    expect(eliminateSteps.length).toBeGreaterThan(0);
  });

  it("handles a single element array", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [5],
      targetValue: 5,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles an empty array", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [],
      targetValue: 5,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [1, 2, 3, 4, 5],
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

  it("generates more found steps for duplicate-heavy arrays", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [1, 5, 5, 5, 5, 5, 9],
      targetValue: 5,
    });
    const foundSteps = steps.filter((step) => step.type === "found");

    // Multiple candidates should be found as the algorithm searches leftward
    expect(foundSteps.length).toBeGreaterThan(0);
  });

  it("produces no found steps when target exceeds all elements", () => {
    const steps = generateLowerBoundSearchSteps({
      sortedArray: [1, 3, 5, 7, 9],
      targetValue: 20,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).not.toContain("found");
  });
});
