import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateSqrtBinarySearchSteps } from "../step-generator";

describe("generateSqrtBinarySearchSteps", () => {
  it("generates steps for the default example", () => {
    const steps = generateSqrtBinarySearchSteps({ targetValue: 49 });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps", () => {
    const steps = generateSqrtBinarySearchSteps({ targetValue: 49 });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when an exact square root exists", () => {
    const steps = generateSqrtBinarySearchSteps({ targetValue: 49 });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("found");
  });

  it("includes eliminate steps when narrowing the search", () => {
    const steps = generateSqrtBinarySearchSteps({ targetValue: 49 });
    const eliminateSteps = steps.filter((step) => step.type === "eliminate");
    expect(eliminateSteps.length).toBeGreaterThan(0);
  });

  it("produces correct visual state kind", () => {
    const steps = generateSqrtBinarySearchSteps({ targetValue: 25 });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;
    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateSqrtBinarySearchSteps({ targetValue: 49 });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateSqrtBinarySearchSteps({ targetValue: 16 });
    const compareStep = steps.find((step) => step.type === "compare");
    expect(compareStep).toBeDefined();
    expect(compareStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = compareStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles targetValue of 0", () => {
    const steps = generateSqrtBinarySearchSteps({ targetValue: 0 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles targetValue of 1", () => {
    const steps = generateSqrtBinarySearchSteps({ targetValue: 1 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles a non-perfect square", () => {
    const steps = generateSqrtBinarySearchSteps({ targetValue: 8 });
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
