import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateSentinelLinearSearchSteps } from "./step-generator";

describe("generateSentinelLinearSearchSteps", () => {
  it("generates steps for a basic search", () => {
    const steps = generateSentinelLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes visit steps for each element examined", () => {
    const steps = generateSentinelLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("visit");
  });

  it("includes compare steps for each element examined", () => {
    const steps = generateSentinelLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when the target exists", () => {
    const steps = generateSentinelLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("found");
  });

  it("does not include a found step when the target is absent", () => {
    const steps = generateSentinelLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 6,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).not.toContain("found");
  });

  it("does not include eliminate steps", () => {
    const steps = generateSentinelLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).not.toContain("eliminate");
  });

  it("produces correct visual state kind", () => {
    const steps = generateSentinelLinearSearchSteps({
      array: [10, 20, 30],
      targetValue: 20,
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
  });

  it("accumulates metrics correctly", () => {
    const steps = generateSentinelLinearSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const steps = generateSentinelLinearSearchSteps({
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

  it("finds the target at the last position", () => {
    const steps = generateSentinelLinearSearchSteps({
      array: [1, 2, 3, 4, 9],
      targetValue: 9,
    });
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("found");
  });

  it("handles a single element array when found", () => {
    const steps = generateSentinelLinearSearchSteps({ array: [42], targetValue: 42 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("found");
  });

  it("handles a single element array when not found", () => {
    const steps = generateSentinelLinearSearchSteps({ array: [42], targetValue: 99 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).not.toContain("found");
  });

  it("handles an empty array", () => {
    const steps = generateSentinelLinearSearchSteps({ array: [], targetValue: 5 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("stops early when the target is found before the sentinel position", () => {
    // Target 4 is at index 0 in a 4-element array — should visit only 1 element
    const steps = generateSentinelLinearSearchSteps({ array: [4, 2, 7, 1], targetValue: 4 });
    const visitSteps = steps.filter((step) => step.type === "visit");

    expect(visitSteps.length).toBe(1);
  });
});
