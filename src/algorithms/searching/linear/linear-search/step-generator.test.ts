import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateLinearSearchSteps } from "./step-generator";

describe("generateLinearSearchSteps", () => {
  it("generates steps for a basic search", () => {
    const steps = generateLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 7,
    });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes visit steps for each element examined", () => {
    const steps = generateLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 7,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("visit");
  });

  it("includes compare steps for each element examined", () => {
    const steps = generateLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 7,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when the target exists", () => {
    const steps = generateLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 7,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("found");
  });

  it("does not include a found step when the target is absent", () => {
    const steps = generateLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 6,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).not.toContain("found");
  });

  it("does not include eliminate steps", () => {
    const steps = generateLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 7,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).not.toContain("eliminate");
  });

  it("produces correct visual state kind", () => {
    const steps = generateLinearSearchSteps({
      array: [10, 20, 30],
      targetValue: 20,
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 7,
    });
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateLinearSearchSteps({
      array: [4, 2, 7, 1, 9],
      targetValue: 7,
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

  it("visits every element when the target is absent", () => {
    const inputArray = [4, 2, 7, 1];
    const steps = generateLinearSearchSteps({ array: inputArray, targetValue: 99 });
    const visitSteps = steps.filter((step) => step.type === "visit");

    expect(visitSteps.length).toBe(inputArray.length);
  });

  it("stops early when the target is found at index 0", () => {
    const steps = generateLinearSearchSteps({ array: [7, 2, 4, 1], targetValue: 7 });
    const visitSteps = steps.filter((step) => step.type === "visit");

    expect(visitSteps.length).toBe(1);
  });

  it("handles a single element array", () => {
    const steps = generateLinearSearchSteps({ array: [42], targetValue: 42 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles an empty array", () => {
    const steps = generateLinearSearchSteps({ array: [], targetValue: 5 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
