import { describe, it, expect } from "vitest";
import { generateCoinChangeMinTabulationSteps } from "../step-generator";

describe("generateCoinChangeMinTabulationSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateCoinChangeMinTabulationSteps({ amount: 5, coins: [1, 5] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCoinChangeMinTabulationSteps({ amount: 5, coins: [1, 5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCoinChangeMinTabulationSteps({ amount: 5, coins: [1, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateCoinChangeMinTabulationSteps({ amount: 5, coins: [1, 5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for the base case dp[0]=0", () => {
    const steps = generateCoinChangeMinTabulationSteps({ amount: 5, coins: [1, 5] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps — one per amount from 1 to amount", () => {
    const steps = generateCoinChangeMinTabulationSteps({ amount: 4, coins: [1, 2] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(4);
  });

  it("includes read-cache steps — one per eligible coin per amount", () => {
    // amount=3, coins=[1,2]: amount=1→1 coin eligible, amount=2→2 eligible, amount=3→2 eligible = 5 total
    const steps = generateCoinChangeMinTabulationSteps({ amount: 3, coins: [1, 2] });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBe(5);
  });

  it("has incrementing step indices", () => {
    const steps = generateCoinChangeMinTabulationSteps({ amount: 5, coins: [1, 5] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles amount=0 edge case", () => {
    const steps = generateCoinChangeMinTabulationSteps({ amount: 0, coins: [1] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces correct result for default input amount=11 coins=[1,5,10,25]", () => {
    const steps = generateCoinChangeMinTabulationSteps({
      amount: 11,
      coins: [1, 5, 10, 25],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
    expect(lastStep?.variables.result).toBe(2);
  });
});
