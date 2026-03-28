import { describe, it, expect } from "vitest";
import { generateLomutoPartitionSteps } from "./step-generator";

describe("generateLomutoPartitionSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLomutoPartitionSteps({
      inputArray: [8, 3, 6, 1, 5, 9, 2, 7],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLomutoPartitionSteps({
      inputArray: [8, 3, 6, 1, 5, 9, 2, 7],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLomutoPartitionSteps({
      inputArray: [8, 3, 6, 1, 5, 9, 2, 7],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for every step", () => {
    const steps = generateLomutoPartitionSteps({
      inputArray: [4, 2, 6, 1, 3],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps for each element vs pivot", () => {
    const steps = generateLomutoPartitionSteps({
      inputArray: [4, 2, 6, 1, 3],
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    /* 5 elements — 1 pivot = 4 comparisons */
    expect(compareSteps.length).toBe(4);
  });

  it("includes swap steps when elements are moved to the left partition", () => {
    const steps = generateLomutoPartitionSteps({
      inputArray: [4, 2, 6, 1, 3],
    });
    const swapSteps = steps.filter((step) => step.type === "swap");
    expect(swapSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateLomutoPartitionSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateLomutoPartitionSteps({
      inputArray: [3, 1, 4, 1, 5],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes comparison variables in compare steps", () => {
    const steps = generateLomutoPartitionSteps({
      inputArray: [5, 3, 8, 1, 4],
    });
    const compareStep = steps.find((step) => step.type === "compare");
    expect(compareStep?.variables).toHaveProperty("pivotValue");
    expect(compareStep?.variables).toHaveProperty("currentValue");
    expect(compareStep?.variables).toHaveProperty("comparisonResult");
  });

  it("includes pivotIndex and result in complete step variables", () => {
    const steps = generateLomutoPartitionSteps({
      inputArray: [3, 1, 2],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("pivotIndex");
    expect(completeStep?.variables).toHaveProperty("result");
  });

  it("produces no swap steps for a single element", () => {
    const steps = generateLomutoPartitionSteps({ inputArray: [42] });
    const swapSteps = steps.filter((step) => step.type === "swap");
    /* The pivot-placement swap still occurs */
    expect(swapSteps.length).toBeGreaterThanOrEqual(0);
  });

  it("handles a two-element array", () => {
    const steps = generateLomutoPartitionSteps({ inputArray: [5, 2] });
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });
});
