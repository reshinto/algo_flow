import { describe, it, expect } from "vitest";
import { generateHeapReplaceRootSteps } from "./step-generator";

describe("generateHeapReplaceRootSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHeapReplaceRootSteps({ array: [1, 3, 5, 7, 9, 8, 6], newValue: 10 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHeapReplaceRootSteps({ array: [1, 3, 5, 7, 9, 8, 6], newValue: 10 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHeapReplaceRootSteps({ array: [1, 3, 5, 7, 9, 8, 6], newValue: 10 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces heap visual states throughout", () => {
    const steps = generateHeapReplaceRootSteps({ array: [1, 3, 5, 7, 9, 8, 6], newValue: 10 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHeapReplaceRootSteps({ array: [1, 3, 5, 7, 9, 8, 6], newValue: 10 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap contains the new value and not the old root", () => {
    const steps = generateHeapReplaceRootSteps({ array: [1, 3, 5, 7, 9, 8, 6], newValue: 10 });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    const values = heapNodes.map((node) => node.value);
    expect(values.includes(10)).toBe(true);
    expect(values.includes(1)).toBe(false);
  });

  it("handles replacing root with a smaller-than-children value (no sift)", () => {
    const steps = generateHeapReplaceRootSteps({ array: [1, 3, 5, 7, 9, 8, 6], newValue: 2 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles a single-element heap", () => {
    const steps = generateHeapReplaceRootSteps({ array: [42], newValue: 7 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
