import { describe, it, expect } from "vitest";
import { generateHeapExtractMaxSteps } from "../step-generator";

describe("generateHeapExtractMaxSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHeapExtractMaxSteps({ array: [9, 7, 8, 3, 5, 6, 1] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHeapExtractMaxSteps({ array: [9, 7, 8, 3, 5, 6, 1] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHeapExtractMaxSteps({ array: [9, 7, 8, 3, 5, 6, 1] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateHeapExtractMaxSteps({ array: [9, 7, 8, 3, 5, 6, 1] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHeapExtractMaxSteps({ array: [9, 7, 8, 3, 5, 6, 1] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap has one fewer node than the input", () => {
    const inputSize = 7;
    const steps = generateHeapExtractMaxSteps({ array: [9, 7, 8, 3, 5, 6, 1] });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(inputSize - 1);
  });

  it("contains a heap-extract step", () => {
    const steps = generateHeapExtractMaxSteps({ array: [9, 7, 8, 3, 5, 6, 1] });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-extract");
  });

  it("handles a single-element heap", () => {
    const steps = generateHeapExtractMaxSteps({ array: [9] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("contains sift-down steps for multi-element heap", () => {
    const steps = generateHeapExtractMaxSteps({ array: [9, 7, 8, 3, 5, 6, 1] });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("sift-down");
  });
});
