import { describe, it, expect } from "vitest";
import { generateFibonacciMemoizationSteps } from "./step-generator";

describe("generateFibonacciMemoizationSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateFibonacciMemoizationSteps({ targetIndex: 5 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFibonacciMemoizationSteps({ targetIndex: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFibonacciMemoizationSteps({ targetIndex: 5 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states", () => {
    const steps = generateFibonacciMemoizationSteps({ targetIndex: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for base cases F(0) and F(1)", () => {
    const steps = generateFibonacciMemoizationSteps({ targetIndex: 5 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("includes compute-cell steps for non-base cases", () => {
    const steps = generateFibonacciMemoizationSteps({ targetIndex: 5 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(4);
  });

  it("includes read-cache steps for cached lookups", () => {
    const steps = generateFibonacciMemoizationSteps({ targetIndex: 5 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateFibonacciMemoizationSteps({ targetIndex: 5 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
