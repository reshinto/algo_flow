import { describe, it, expect } from "vitest";
import { generateTopKFrequentHeapSteps } from "./step-generator";

describe("generateTopKFrequentHeapSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateTopKFrequentHeapSteps({
      array: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4],
      kValue: 2,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTopKFrequentHeapSteps({
      array: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4],
      kValue: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTopKFrequentHeapSteps({
      array: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4],
      kValue: 2,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateTopKFrequentHeapSteps({
      array: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4],
      kValue: 2,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateTopKFrequentHeapSteps({
      array: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4],
      kValue: 2,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap has exactly k nodes", () => {
    const kValue = 2;
    const steps = generateTopKFrequentHeapSteps({
      array: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4],
      kValue,
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(kValue);
  });

  it("contains a heap-insert step", () => {
    const steps = generateTopKFrequentHeapSteps({
      array: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4],
      kValue: 2,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
  });

  it("contains a compare step", () => {
    const steps = generateTopKFrequentHeapSteps({
      array: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4],
      kValue: 2,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("handles k=1 returning single most-frequent element", () => {
    const steps = generateTopKFrequentHeapSteps({
      array: [1, 1, 1, 2, 2, 3],
      kValue: 1,
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(1);
  });

  it("handles array with all identical elements", () => {
    const steps = generateTopKFrequentHeapSteps({ array: [7, 7, 7], kValue: 1 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
