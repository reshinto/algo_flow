import { describe, it, expect } from "vitest";
import { generateSortNearlySortedSteps } from "../step-generator";

describe("generateSortNearlySortedSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSortNearlySortedSteps({ array: [6, 5, 3, 2, 8, 10, 9], kValue: 3 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSortNearlySortedSteps({ array: [6, 5, 3, 2, 8, 10, 9], kValue: 3 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSortNearlySortedSteps({ array: [6, 5, 3, 2, 8, 10, 9], kValue: 3 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateSortNearlySortedSteps({ array: [6, 5, 3, 2, 8, 10, 9], kValue: 3 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSortNearlySortedSteps({ array: [6, 5, 3, 2, 8, 10, 9], kValue: 3 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("contains heap-insert and heap-extract steps", () => {
    const steps = generateSortNearlySortedSteps({ array: [6, 5, 3, 2, 8, 10, 9], kValue: 3 });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
    expect(stepTypes).toContain("heap-extract");
  });

  it("final complete step variables include sorted result", () => {
    const steps = generateSortNearlySortedSteps({ array: [6, 5, 3, 2, 8, 10, 9], kValue: 3 });
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { result: number[] };
    expect(variables.result).toEqual([2, 3, 5, 6, 8, 9, 10]);
  });

  it("final heap is empty (all elements drained)", () => {
    const steps = generateSortNearlySortedSteps({ array: [6, 5, 3, 2, 8, 10, 9], kValue: 3 });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: unknown[] }).nodes;
    expect(heapNodes.length).toBe(0);
  });

  it("handles k=0 (already sorted)", () => {
    const steps = generateSortNearlySortedSteps({ array: [1, 2, 3, 4, 5], kValue: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { result: number[] };
    expect(variables.result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles single element", () => {
    const steps = generateSortNearlySortedSteps({ array: [7], kValue: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { result: number[] };
    expect(variables.result).toEqual([7]);
  });

  it("handles k=1 correctly", () => {
    const steps = generateSortNearlySortedSteps({ array: [2, 1, 4, 3], kValue: 1 });
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { result: number[] };
    expect(variables.result).toEqual([1, 2, 3, 4]);
  });
});
