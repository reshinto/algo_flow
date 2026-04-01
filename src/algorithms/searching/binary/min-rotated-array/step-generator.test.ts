import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateMinRotatedArraySteps } from "./step-generator";

describe("generateMinRotatedArraySteps", () => {
  it("generates steps for a rotated array", () => {
    const steps = generateMinRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
    });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps during the search", () => {
    const steps = generateMinRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when minimum is located", () => {
    const steps = generateMinRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("found");
  });

  it("includes eliminate steps when narrowing the range", () => {
    const steps = generateMinRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
    });
    const eliminateSteps = steps.filter((step) => step.type === "eliminate");

    expect(eliminateSteps.length).toBeGreaterThan(0);
  });

  it("produces correct visual state kind", () => {
    const steps = generateMinRotatedArraySteps({
      sortedArray: [3, 1, 2],
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateMinRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
    });
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateMinRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
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
    const steps = generateMinRotatedArraySteps({
      sortedArray: [42],
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles a non-rotated array", () => {
    const steps = generateMinRotatedArraySteps({
      sortedArray: [1, 2, 3, 4, 5],
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("found step variables include the minimum value", () => {
    const steps = generateMinRotatedArraySteps({
      sortedArray: [4, 5, 6, 7, 0, 1, 2],
    });
    const foundStep = steps.find((step) => step.type === "found");

    expect(foundStep).toBeDefined();
    expect(foundStep!.variables["minimumValue"]).toBe(0);
  });
});
