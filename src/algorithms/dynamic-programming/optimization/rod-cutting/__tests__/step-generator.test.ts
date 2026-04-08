import { describe, it, expect } from "vitest";
import { generateRodCuttingSteps } from "../step-generator";

describe("generateRodCuttingSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateRodCuttingSteps({ prices: [1, 5] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRodCuttingSteps({ prices: [1, 5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRodCuttingSteps({ prices: [1, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateRodCuttingSteps({ prices: [1, 5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for the base case dp[0]=0", () => {
    const steps = generateRodCuttingSteps({ prices: [1, 5] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps — one per length from 1 to n", () => {
    const steps = generateRodCuttingSteps({ prices: [1, 5, 8] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(3);
  });

  it("includes read-cache steps — one per cut per length", () => {
    // prices=[1,5]: length=1 → 1 cut, length=2 → 2 cuts = 3 total read-cache steps
    const steps = generateRodCuttingSteps({ prices: [1, 5] });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBe(3);
  });

  it("has incrementing step indices", () => {
    const steps = generateRodCuttingSteps({ prices: [1, 5] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles empty prices array (zero-length rod)", () => {
    const steps = generateRodCuttingSteps({ prices: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces correct result for default input prices=[1,5,8,9,10,17,17,20]", () => {
    const steps = generateRodCuttingSteps({
      prices: [1, 5, 8, 9, 10, 17, 17, 20],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
    expect(lastStep?.variables.result).toBe(22);
  });

  it("produces correct result for prices=[1,5]", () => {
    const steps = generateRodCuttingSteps({ prices: [1, 5] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables.result).toBe(5);
  });

  it("produces correct result for prices=[3,5,8]", () => {
    const steps = generateRodCuttingSteps({ prices: [3, 5, 8] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables.result).toBe(9);
  });

  it("produces correct result for prices=[1]", () => {
    const steps = generateRodCuttingSteps({ prices: [1] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables.result).toBe(1);
  });
});
