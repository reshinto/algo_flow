import { describe, it, expect } from "vitest";
import { generateTribonacciTabulationSteps } from "./step-generator";

describe("generateTribonacciTabulationSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateTribonacciTabulationSteps({ targetIndex: 5 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTribonacciTabulationSteps({ targetIndex: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTribonacciTabulationSteps({ targetIndex: 5 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states", () => {
    const steps = generateTribonacciTabulationSteps({ targetIndex: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for all three base cases", () => {
    const steps = generateTribonacciTabulationSteps({ targetIndex: 5 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(3);
  });

  it("includes compute-cell steps for non-base cases T(3)..T(5)", () => {
    const steps = generateTribonacciTabulationSteps({ targetIndex: 5 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(3);
  });

  it("includes read-cache steps — three per non-base index", () => {
    const steps = generateTribonacciTabulationSteps({ targetIndex: 5 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBe(9);
  });

  it("has incrementing step indices", () => {
    const steps = generateTribonacciTabulationSteps({ targetIndex: 5 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles T(0) edge case", () => {
    const steps = generateTribonacciTabulationSteps({ targetIndex: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
