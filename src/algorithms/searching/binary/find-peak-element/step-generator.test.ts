import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateFindPeakElementSteps } from "./step-generator";

describe("generateFindPeakElementSteps", () => {
  it("generates steps for the default example", () => {
    const steps = generateFindPeakElementSteps({
      array: [1, 3, 20, 4, 1, 0],
    });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps", () => {
    const steps = generateFindPeakElementSteps({
      array: [1, 3, 20, 4, 1, 0],
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when the peak is identified", () => {
    const steps = generateFindPeakElementSteps({
      array: [1, 3, 20, 4, 1, 0],
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("found");
  });

  it("includes eliminate steps when narrowing the search range", () => {
    const steps = generateFindPeakElementSteps({
      array: [1, 2, 3, 4, 5, 3, 1],
    });
    const eliminateSteps = steps.filter((step) => step.type === "eliminate");
    expect(eliminateSteps.length).toBeGreaterThan(0);
  });

  it("produces correct visual state kind", () => {
    const steps = generateFindPeakElementSteps({
      array: [1, 5, 3],
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;
    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateFindPeakElementSteps({
      array: [1, 3, 20, 4, 1, 0],
    });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateFindPeakElementSteps({
      array: [2, 5, 1, 3, 4],
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
    const steps = generateFindPeakElementSteps({
      array: [42],
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles a strictly increasing array — peak at end", () => {
    const steps = generateFindPeakElementSteps({
      array: [1, 2, 3, 4, 5],
    });
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
