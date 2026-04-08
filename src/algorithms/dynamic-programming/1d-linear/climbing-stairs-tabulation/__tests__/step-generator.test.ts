import { describe, it, expect } from "vitest";
import { generateClimbingStairsTabulationSteps } from "../step-generator";

describe("generateClimbingStairsTabulationSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 5 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 5 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states", () => {
    const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for base cases", () => {
    const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 5 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("includes compute-cell steps for non-base cases S(2)..S(5)", () => {
    const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 5 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(4);
  });

  it("includes read-cache steps — two per non-base index", () => {
    const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 5 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBe(8);
  });

  it("has incrementing step indices", () => {
    const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 5 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles 0 stairs edge case", () => {
    const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces correct result for 7 stairs (default input)", () => {
    const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 7 });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
    expect(lastStep?.variables.result).toBe(21);
  });
});
