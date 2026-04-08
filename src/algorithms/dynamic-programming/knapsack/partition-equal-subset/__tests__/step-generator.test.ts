import { describe, it, expect } from "vitest";
import { generatePartitionEqualSubsetSteps } from "../step-generator";

describe("generatePartitionEqualSubsetSteps", () => {
  it("produces steps for the default input [1, 5, 11, 5]", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 5, 11, 5] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 5, 11, 5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 5, 11, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 5, 11, 5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for base case dp[0]=1", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 5, 11, 5] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("result is true for [1, 5, 11, 5]", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 5, 11, 5] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables.result).toBe(true);
  });

  it("result is false for [1, 2, 3, 5]", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 2, 3, 5] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables.result).toBe(false);
  });

  it("returns only initialize and complete steps for odd-sum input", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });

  it("has incrementing step indices", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 5, 11, 5] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes read-cache steps during table filling", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 5, 11, 5] });
    const readCacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(readCacheSteps.length).toBeGreaterThan(0);
  });

  it("includes compute-cell steps when a sum becomes achievable", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 5, 11, 5] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("result is true for [1, 1]", () => {
    const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 1] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables.result).toBe(true);
  });
});
