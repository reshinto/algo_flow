import { describe, it, expect } from "vitest";
import { generateKthLargestElementSteps } from "./step-generator";

describe("generateKthLargestElementSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateKthLargestElementSteps({ array: [3, 1, 5, 12, 2, 11, 7, 9], kValue: 3 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateKthLargestElementSteps({ array: [3, 1, 5, 12, 2, 11, 7, 9], kValue: 3 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateKthLargestElementSteps({ array: [3, 1, 5, 12, 2, 11, 7, 9], kValue: 3 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateKthLargestElementSteps({ array: [3, 1, 5, 12, 2, 11, 7, 9], kValue: 3 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateKthLargestElementSteps({ array: [3, 1, 5, 12, 2, 11, 7, 9], kValue: 3 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap has exactly k nodes", () => {
    const kValue = 3;
    const steps = generateKthLargestElementSteps({
      array: [3, 1, 5, 12, 2, 11, 7, 9],
      kValue,
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(kValue);
  });

  it("contains a heap-insert step", () => {
    const steps = generateKthLargestElementSteps({ array: [3, 1, 5, 12, 2, 11, 7, 9], kValue: 3 });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
  });

  it("contains a visit step (markHighlighted for answer)", () => {
    const steps = generateKthLargestElementSteps({ array: [3, 1, 5, 12, 2, 11, 7, 9], kValue: 3 });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("visit");
  });

  it("final complete step variables include the correct result", () => {
    const steps = generateKthLargestElementSteps({ array: [3, 1, 5, 12, 2, 11, 7, 9], kValue: 3 });
    const lastStep = steps[steps.length - 1]!;
    expect((lastStep.variables as { result: number }).result).toBe(9);
  });

  it("handles k = 1 (finds the maximum)", () => {
    const steps = generateKthLargestElementSteps({ array: [3, 1, 5, 12], kValue: 1 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const lastStep = steps[steps.length - 1]!;
    expect((lastStep.variables as { result: number }).result).toBe(12);
  });

  it("handles a single-element array", () => {
    const steps = generateKthLargestElementSteps({ array: [7], kValue: 1 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
