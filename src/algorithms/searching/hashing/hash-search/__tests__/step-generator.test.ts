import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";

import { generateHashSearchSteps } from "../step-generator";

describe("generateHashSearchSteps", () => {
  it("first step is initialize and last step is complete", () => {
    const steps = generateHashSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[0]!.index).toBe(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes visit steps during the build phase", () => {
    const steps = generateHashSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(8);
  });

  it("includes a compare step for the hash map lookup", () => {
    const steps = generateHashSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("includes a found step when the target exists", () => {
    const steps = generateHashSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("found");
  });

  it("does not include a found step when the target is absent", () => {
    const steps = generateHashSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 99,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).not.toContain("found");
  });

  it("produces correct visual state kind", () => {
    const steps = generateHashSearchSteps({
      array: [10, 20, 30],
      targetValue: 20,
    });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;
    expect(visualState.kind).toBe("array");
  });

  it("accumulates visit metrics equal to array length", () => {
    const inputArray = [4, 2, 7, 1, 9, 3, 8, 5];
    const steps = generateHashSearchSteps({ array: inputArray, targetValue: 9 });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBe(inputArray.length);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for visit steps", () => {
    const steps = generateHashSearchSteps({
      array: [4, 2, 7, 1, 9, 3, 8, 5],
      targetValue: 9,
    });
    const visitStep = steps.find((step) => step.type === "visit");
    expect(visitStep).toBeDefined();
    expect(visitStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = visitStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a single element array when found", () => {
    const steps = generateHashSearchSteps({ array: [42], targetValue: 42 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("found");
  });

  it("handles an empty array", () => {
    const steps = generateHashSearchSteps({ array: [], targetValue: 5 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
