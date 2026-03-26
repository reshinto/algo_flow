import { describe, it, expect } from "vitest";
import { generateFibonacciSteps } from "./step-generator";

describe("generateFibonacciSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateFibonacciSteps({ targetIndex: 5 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFibonacciSteps({ targetIndex: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFibonacciSteps({ targetIndex: 5 });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces dp-table visual states", () => {
    const steps = generateFibonacciSteps({ targetIndex: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for base cases", () => {
    const steps = generateFibonacciSteps({ targetIndex: 5 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    /* At minimum, base cases F(0) and F(1) are filled */
    expect(fillSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("includes compute-cell steps for non-base cases", () => {
    const steps = generateFibonacciSteps({ targetIndex: 5 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    /* F(2) through F(5) = 4 compute steps */
    expect(computeSteps.length).toBe(4);
  });

  it("includes read-cache steps", () => {
    const steps = generateFibonacciSteps({ targetIndex: 5 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    /* Each compute reads 2 previous values: 4 computes * 2 reads = 8 */
    expect(cacheSteps.length).toBe(8);
  });

  it("has incrementing step indices", () => {
    const steps = generateFibonacciSteps({ targetIndex: 5 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles F(0) edge case", () => {
    const steps = generateFibonacciSteps({ targetIndex: 0 });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
  });
});
