import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateMetaBinarySearchSteps } from "../step-generator";

describe("generateMetaBinarySearchSteps", () => {
  it("generates steps for a basic search", () => {
    const steps = generateMetaBinarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps during bit evaluation", () => {
    const steps = generateMetaBinarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when target exists", () => {
    const steps = generateMetaBinarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("found");
  });

  it("does not include a found step when target is absent", () => {
    const steps = generateMetaBinarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 50,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).not.toContain("found");
  });

  it("includes eliminate steps when advancing position", () => {
    const steps = generateMetaBinarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    });
    const eliminateSteps = steps.filter((step) => step.type === "eliminate");

    expect(eliminateSteps.length).toBeGreaterThan(0);
  });

  it("produces correct visual state kind", () => {
    const steps = generateMetaBinarySearchSteps({
      sortedArray: [10, 20, 30],
      targetValue: 20,
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateMetaBinarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
    });
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateMetaBinarySearchSteps({
      sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      targetValue: 23,
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
    const steps = generateMetaBinarySearchSteps({
      sortedArray: [],
      targetValue: 5,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles a single element array when found", () => {
    const steps = generateMetaBinarySearchSteps({
      sortedArray: [42],
      targetValue: 42,
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
