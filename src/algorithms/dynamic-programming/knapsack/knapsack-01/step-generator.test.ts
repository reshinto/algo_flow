import { describe, it, expect } from "vitest";
import { generateKnapsack01Steps } from "./step-generator";

describe("generateKnapsack01Steps", () => {
  it("produces steps for the default input", () => {
    const steps = generateKnapsack01Steps({
      weights: [2, 3, 4, 5],
      values: [3, 4, 5, 6],
      capacity: 8,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateKnapsack01Steps({ weights: [2, 3], values: [3, 4], capacity: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateKnapsack01Steps({ weights: [2, 3], values: [3, 4], capacity: 5 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateKnapsack01Steps({ weights: [2, 3], values: [3, 4], capacity: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for the base case dp[0]=0", () => {
    const steps = generateKnapsack01Steps({ weights: [2, 3], values: [3, 4], capacity: 5 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps for each capacity slot updated per item", () => {
    // weights=[2], values=[3], capacity=3: item 0 updates capacity 3 and 2 → 2 compute-cell steps
    const steps = generateKnapsack01Steps({ weights: [2], values: [3], capacity: 3 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(2);
  });

  it("includes read-cache steps — two per eligible capacity slot per item", () => {
    // weights=[2], values=[3], capacity=3: slots 3 and 2 are eligible → 4 read-cache steps
    const steps = generateKnapsack01Steps({ weights: [2], values: [3], capacity: 3 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBe(4);
  });

  it("has incrementing step indices", () => {
    const steps = generateKnapsack01Steps({ weights: [2, 3], values: [3, 4], capacity: 5 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("produces correct final result for default input", () => {
    const steps = generateKnapsack01Steps({
      weights: [2, 3, 4, 5],
      values: [3, 4, 5, 6],
      capacity: 8,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
    expect(lastStep?.variables.result).toBe(10);
  });

  it("produces correct final result for weights=[1,2,3] values=[6,10,12] capacity=5", () => {
    const steps = generateKnapsack01Steps({
      weights: [1, 2, 3],
      values: [6, 10, 12],
      capacity: 5,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables.result).toBe(22);
  });

  it("handles capacity zero — only initialize and complete steps", () => {
    const steps = generateKnapsack01Steps({ weights: [2, 3], values: [3, 4], capacity: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(0);
  });

  it("handles empty items list — result is 0", () => {
    const steps = generateKnapsack01Steps({ weights: [], values: [], capacity: 5 });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables.result).toBe(0);
  });
});
