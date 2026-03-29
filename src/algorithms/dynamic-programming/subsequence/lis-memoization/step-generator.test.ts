import { describe, it, expect } from "vitest";
import { generateLisMemoizationSteps } from "./step-generator";

describe("generateLisMemoizationSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes compute-cell steps", () => {
    const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("includes push-call steps for recursive frames", () => {
    const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    expect(pushSteps.length).toBeGreaterThan(0);
  });

  it("includes pop-call steps matching each push-call", () => {
    const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    const pushCount = steps.filter((step) => step.type === "push-call").length;
    const popCount = steps.filter((step) => step.type === "pop-call").length;
    expect(popCount).toBe(pushCount);
  });

  it("includes read-cache steps for repeated subproblems", () => {
    const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("call stack is empty at the complete step", () => {
    const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "dp-table") {
      expect(completeStep.visualState.callStack).toHaveLength(0);
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles an empty sequence with just initialize and complete steps", () => {
    const steps = generateLisMemoizationSteps({ sequence: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });

  it("handles a single-element sequence without push-call steps", () => {
    const steps = generateLisMemoizationSteps({ sequence: [5] });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    expect(pushSteps.length).toBe(1);
  });

  it("push-call labels use L(i) format", () => {
    const steps = generateLisMemoizationSteps({ sequence: [1, 2, 3] });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    for (const step of pushSteps) {
      expect(step.description).toMatch(/^Call L\(\d+\)$/);
    }
  });

  it("dp-table cells use L(i) labels", () => {
    const steps = generateLisMemoizationSteps({ sequence: [1, 2] });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "dp-table") {
      expect(firstStep.visualState.table[0]?.label).toBe("L(0)");
      expect(firstStep.visualState.table[1]?.label).toBe("L(1)");
    }
  });
});
