import { describe, it, expect } from "vitest";
import { generateHeapPeekSteps } from "./step-generator";

describe("generateHeapPeekSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHeapPeekSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHeapPeekSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHeapPeekSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateHeapPeekSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHeapPeekSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("heap size is unchanged throughout all steps", () => {
    const inputSize = 7;
    const steps = generateHeapPeekSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    for (const step of steps) {
      const heapNodes = (step.visualState as { nodes: { index: number; value: number }[] }).nodes;
      expect(heapNodes.length).toBe(inputSize);
    }
  });

  it("contains exactly 3 steps: initialize, visit, complete", () => {
    const steps = generateHeapPeekSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    expect(steps.length).toBe(3);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[1]?.type).toBe("visit");
    expect(steps[2]?.type).toBe("complete");
  });

  it("visit step highlights the root node (index 0)", () => {
    const steps = generateHeapPeekSteps({ array: [1, 3, 5, 7, 9, 8, 6] });
    const visitStep = steps[1]!;
    const heapNodes = (
      visitStep.visualState as { nodes: { index: number; value: number; state: string }[] }
    ).nodes;
    expect(heapNodes[0]?.state).toBe("highlighted");
  });

  it("handles a single-element heap", () => {
    const steps = generateHeapPeekSteps({ array: [99] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
