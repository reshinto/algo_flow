import { describe, it, expect } from "vitest";
import { generateHeapExtractMinSteps } from "./step-generator";

describe("generateHeapExtractMinSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHeapExtractMinSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHeapExtractMinSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHeapExtractMinSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateHeapExtractMinSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHeapExtractMinSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap has one fewer node than the input", () => {
    const inputSize = 7;
    const steps = generateHeapExtractMinSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(inputSize - 1);
  });

  it("contains a heap-extract step", () => {
    const steps = generateHeapExtractMinSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-extract");
  });

  it("final heap satisfies min-heap property", () => {
    const steps = generateHeapExtractMinSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    const values = heapNodes.map((node) => node.value);
    for (let parentIdx = 0; parentIdx < Math.floor(values.length / 2); parentIdx++) {
      const leftIdx = 2 * parentIdx + 1;
      const rightIdx = 2 * parentIdx + 2;
      if (leftIdx < values.length) expect(values[parentIdx]!).toBeLessThanOrEqual(values[leftIdx]!);
      if (rightIdx < values.length)
        expect(values[parentIdx]!).toBeLessThanOrEqual(values[rightIdx]!);
    }
  });

  it("handles a single-element heap", () => {
    const steps = generateHeapExtractMinSteps({ array: [1] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
