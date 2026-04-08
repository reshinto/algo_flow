import { describe, it, expect } from "vitest";
import { generateMinCostClimbingStairsTabulationSteps } from "../step-generator";

describe("generateMinCostClimbingStairsTabulationSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateMinCostClimbingStairsTabulationSteps({ costs: [10, 15, 20] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMinCostClimbingStairsTabulationSteps({ costs: [10, 15, 20] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMinCostClimbingStairsTabulationSteps({ costs: [10, 15, 20] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states", () => {
    const steps = generateMinCostClimbingStairsTabulationSteps({ costs: [10, 15, 20] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for base cases C(0) and C(1)", () => {
    const steps = generateMinCostClimbingStairsTabulationSteps({ costs: [10, 15, 20] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("includes compute-cell steps for indices 2 up to costs.length", () => {
    // costs has 5 elements → steps 2..5 = 4 compute-cell steps
    const steps = generateMinCostClimbingStairsTabulationSteps({
      costs: [10, 15, 20, 5, 25],
    });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(4);
  });

  it("includes read-cache steps — two per non-base index", () => {
    // costs has 5 elements → 4 non-base indices × 2 = 8 read-cache steps
    const steps = generateMinCostClimbingStairsTabulationSteps({
      costs: [10, 15, 20, 5, 25],
    });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBe(8);
  });

  it("has incrementing step indices", () => {
    const steps = generateMinCostClimbingStairsTabulationSteps({ costs: [10, 15, 20] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles empty costs array edge case", () => {
    const steps = generateMinCostClimbingStairsTabulationSteps({ costs: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces correct result for default input [10, 15, 20, 5, 25, 10]", () => {
    const steps = generateMinCostClimbingStairsTabulationSteps({
      costs: [10, 15, 20, 5, 25, 10],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
    expect(lastStep?.variables.result).toBe(30);
  });
});
