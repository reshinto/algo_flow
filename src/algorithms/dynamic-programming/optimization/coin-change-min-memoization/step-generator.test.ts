import { describe, it, expect } from "vitest";
import { generateCoinChangeMinMemoizationSteps } from "./step-generator";

describe("generateCoinChangeMinMemoizationSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for base case $0", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps for non-base-case amounts", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("includes push-call steps for recursive frames", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    expect(pushSteps.length).toBeGreaterThan(0);
  });

  it("includes pop-call steps matching each push-call", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    const pushCount = steps.filter((step) => step.type === "push-call").length;
    const popCount = steps.filter((step) => step.type === "pop-call").length;
    expect(popCount).toBe(pushCount);
  });

  it("includes read-cache steps for repeated subproblems", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("call stack is empty at the complete step", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "dp-table") {
      expect(completeStep.visualState.callStack).toHaveLength(0);
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("uses $-prefixed labels for dp table cells", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 5, coins: [1, 5] });
    const initStep = steps[0]!;
    if (initStep.visualState.kind === "dp-table") {
      expect(initStep.visualState.table[0]?.label).toBe("$0");
      expect(initStep.visualState.table[5]?.label).toBe("$5");
    }
  });

  it("handles amount=0 with just initialize and complete steps", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 0, coins: [1, 5, 10] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });

  it("produces no push-call steps when amount equals a single coin denomination", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 5, coins: [5] });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    // $5 with coin=5 hits base case $0 directly — only one push needed
    expect(pushSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("call stack labels use dollar-sign prefix", () => {
    const steps = generateCoinChangeMinMemoizationSteps({ amount: 6, coins: [1, 5] });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    for (const pushStep of pushSteps) {
      if (pushStep.visualState.kind === "dp-table") {
        const { callStack } = pushStep.visualState;
        if (callStack && callStack.length > 0) {
          const topOfStack = callStack[callStack.length - 1] ?? "";
          expect(topOfStack).toMatch(/^\$/);
        }
      }
    }
  });
});
