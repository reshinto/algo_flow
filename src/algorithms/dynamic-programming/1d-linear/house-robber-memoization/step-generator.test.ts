import { describe, it, expect } from "vitest";
import { generateHouseRobberMemoizationSteps } from "./step-generator";

describe("generateHouseRobberMemoizationSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for base cases H(0) and H(1)", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("includes compute-cell steps for non-base-case houses", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(3);
  });

  it("includes push-call steps for recursive frames", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    expect(pushSteps.length).toBeGreaterThan(0);
  });

  it("includes pop-call steps matching each push-call", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    const pushCount = steps.filter((step) => step.type === "push-call").length;
    const popCount = steps.filter((step) => step.type === "pop-call").length;
    expect(popCount).toBe(pushCount);
  });

  it("includes read-cache steps for repeated subproblems", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("call stack is empty at the complete step", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "dp-table") {
      expect(completeStep.visualState.callStack).toHaveLength(0);
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles a single house without push-call steps", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [42] });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    expect(pushSteps.length).toBe(0);
  });

  it("handles an empty houses array with just initialize and complete steps", () => {
    const steps = generateHouseRobberMemoizationSteps({ houses: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });
});
