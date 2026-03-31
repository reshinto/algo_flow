import { describe, it, expect } from "vitest";
import { generateMergeKSortedArraysSteps } from "./step-generator";

describe("generateMergeKSortedArraysSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMergeKSortedArraysSteps({
      arrays: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMergeKSortedArraysSteps({
      arrays: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMergeKSortedArraysSteps({
      arrays: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateMergeKSortedArraysSteps({
      arrays: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMergeKSortedArraysSteps({
      arrays: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap has zero nodes after all elements extracted", () => {
    const steps = generateMergeKSortedArraysSteps({
      arrays: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(0);
  });

  it("contains a heap-extract step", () => {
    const steps = generateMergeKSortedArraysSteps({
      arrays: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-extract");
  });

  it("contains a heap-insert step", () => {
    const steps = generateMergeKSortedArraysSteps({
      arrays: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
  });

  it("handles a single array", () => {
    const steps = generateMergeKSortedArraysSteps({ arrays: [[1, 2, 3]] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles single-element arrays", () => {
    const steps = generateMergeKSortedArraysSteps({ arrays: [[3], [1], [2]] });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces more steps for larger inputs", () => {
    const smallSteps = generateMergeKSortedArraysSteps({ arrays: [[1], [2]] });
    const largeSteps = generateMergeKSortedArraysSteps({
      arrays: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
    });
    expect(largeSteps.length).toBeGreaterThan(smallSteps.length);
  });
});
