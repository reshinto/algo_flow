import { describe, it, expect } from "vitest";
import { generateIntegerBreakTabulationSteps } from "../step-generator";

describe("generateIntegerBreakTabulationSteps", () => {
  it("produces steps for a standard input", () => {
    const steps = generateIntegerBreakTabulationSteps({ targetNumber: 10 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateIntegerBreakTabulationSteps({ targetNumber: 10 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateIntegerBreakTabulationSteps({ targetNumber: 10 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for all steps", () => {
    const steps = generateIntegerBreakTabulationSteps({ targetNumber: 10 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for base case P(1)", () => {
    const steps = generateIntegerBreakTabulationSteps({ targetNumber: 10 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps for each split index from 2 to n", () => {
    const targetNumber = 5;
    const steps = generateIntegerBreakTabulationSteps({ targetNumber });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    // splitIndex=2: 1 split; splitIndex=3: 2 splits; splitIndex=4: 3 splits; splitIndex=5: 4 splits
    expect(computeSteps.length).toBe(1 + 2 + 3 + 4);
  });

  it("includes read-cache steps — one per (splitIndex, partIndex) pair", () => {
    const targetNumber = 4;
    const steps = generateIntegerBreakTabulationSteps({ targetNumber });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    // splitIndex=2: 1 read; splitIndex=3: 2 reads; splitIndex=4: 3 reads
    expect(cacheSteps.length).toBe(1 + 2 + 3);
  });

  it("has incrementing step indices", () => {
    const steps = generateIntegerBreakTabulationSteps({ targetNumber: 6 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("final complete step reflects correct result for targetNumber 10", () => {
    const steps = generateIntegerBreakTabulationSteps({ targetNumber: 10 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    expect(completeStep.variables["result"]).toBe(36);
  });

  it("final complete step reflects correct result for targetNumber 8", () => {
    const steps = generateIntegerBreakTabulationSteps({ targetNumber: 8 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(18);
  });

  it("handles minimum valid input targetNumber 2", () => {
    const steps = generateIntegerBreakTabulationSteps({ targetNumber: 2 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps[steps.length - 1]?.variables["result"]).toBe(1);
  });
});
