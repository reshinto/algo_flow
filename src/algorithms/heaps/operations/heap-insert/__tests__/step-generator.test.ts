import { describe, it, expect } from "vitest";
import { generateHeapInsertSteps } from "../step-generator";

describe("generateHeapInsertSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHeapInsertSteps({ array: [1, 3, 5, 7, 9, 8, 6], value: 2 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHeapInsertSteps({ array: [1, 3, 5, 7, 9, 8, 6], value: 2 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHeapInsertSteps({ array: [1, 3, 5, 7, 9, 8, 6], value: 2 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateHeapInsertSteps({ array: [1, 3, 5, 7, 9, 8, 6], value: 2 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHeapInsertSteps({ array: [1, 3, 5, 7, 9, 8, 6], value: 2 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap has one more node than the input", () => {
    const inputSize = 7;
    const steps = generateHeapInsertSteps({ array: [1, 3, 5, 7, 9, 8, 6], value: 2 });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(inputSize + 1);
  });

  it("inserted value is present in the final heap", () => {
    const steps = generateHeapInsertSteps({ array: [1, 3, 5, 7, 9, 8, 6], value: 2 });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    const values = heapNodes.map((node) => node.value);
    expect(values).toContain(2);
  });

  it("final heap satisfies min-heap property", () => {
    const steps = generateHeapInsertSteps({ array: [1, 3, 5, 7, 9, 8, 6], value: 2 });
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

  it("inserts a new minimum — contains heap-insert and sift-up steps", () => {
    const steps = generateHeapInsertSteps({ array: [3, 5, 7, 9], value: 1 });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
    expect(stepTypes).toContain("sift-up");
  });

  it("handles inserting into an empty array", () => {
    const steps = generateHeapInsertSteps({ array: [], value: 5 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
