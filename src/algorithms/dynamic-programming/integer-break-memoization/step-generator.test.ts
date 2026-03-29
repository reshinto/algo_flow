import { describe, it, expect } from "vitest";
import { generateIntegerBreakMemoizationSteps } from "./step-generator";

describe("generateIntegerBreakMemoizationSteps", () => {
  it("produces steps for the default input targetNumber=10", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for base case P(1)", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps for non-base-case integers", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("includes push-call steps for recursive frames", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    expect(pushSteps.length).toBeGreaterThan(0);
  });

  it("includes pop-call steps matching each push-call", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    const pushCount = steps.filter((step) => step.type === "push-call").length;
    const popCount = steps.filter((step) => step.type === "pop-call").length;
    expect(popCount).toBe(pushCount);
  });

  it("includes read-cache steps for repeated subproblems", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("call stack is empty at the complete step", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "dp-table") {
      expect(completeStep.visualState.callStack).toHaveLength(0);
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("push-call steps reference P(n) labels", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 5 });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    for (const step of pushSteps) {
      expect(step.description).toMatch(/^Call P\(\d+\)$/);
    }
  });

  it("targetNumber=2 produces push-call and pop-call steps", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 2 });
    expect(steps.filter((step) => step.type === "push-call").length).toBeGreaterThan(0);
    expect(steps.filter((step) => step.type === "pop-call").length).toBeGreaterThan(0);
  });

  it("targetNumber=4 produces a read-cache step for P(2) reuse", () => {
    const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 4 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });
});
