import { describe, it, expect } from "vitest";
import { generateTribonacciMemoizationSteps } from "./step-generator";

describe("generateTribonacciMemoizationSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for all three base cases", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(3);
  });

  it("includes compute-cell steps for non-base cases T(3)..T(5)", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(3);
  });

  it("includes push-call steps for recursive entries", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    expect(pushSteps.length).toBeGreaterThan(0);
  });

  it("includes pop-call steps matching push-call steps", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    const pushCount = steps.filter((step) => step.type === "push-call").length;
    const popCount = steps.filter((step) => step.type === "pop-call").length;
    expect(popCount).toBe(pushCount);
  });

  it("includes read-cache steps for cached lookups", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("callStack grows and shrinks during execution", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    const dpTableSteps = steps.filter((step) => step.visualState.kind === "dp-table");
    const maxDepth = Math.max(
      ...dpTableSteps.map((step) => {
        const visualState = step.visualState;
        return visualState.kind === "dp-table" ? (visualState.callStack?.length ?? 0) : 0;
      }),
    );
    expect(maxDepth).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 5 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles T(0) edge case", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles T(2) edge case with only base cases", () => {
    const steps = generateTribonacciMemoizationSteps({ targetIndex: 2 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(0);
  });
});
