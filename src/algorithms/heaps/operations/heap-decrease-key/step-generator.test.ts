import { describe, it, expect } from "vitest";
import { generateHeapDecreaseKeySteps } from "./step-generator";

describe("generateHeapDecreaseKeySteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHeapDecreaseKeySteps({
      array: [1, 5, 3, 7, 9, 8, 6],
      targetIndex: 3,
      newValue: 2,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHeapDecreaseKeySteps({
      array: [1, 5, 3, 7, 9, 8, 6],
      targetIndex: 3,
      newValue: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHeapDecreaseKeySteps({
      array: [1, 5, 3, 7, 9, 8, 6],
      targetIndex: 3,
      newValue: 2,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces heap visual states throughout", () => {
    const steps = generateHeapDecreaseKeySteps({
      array: [1, 5, 3, 7, 9, 8, 6],
      targetIndex: 3,
      newValue: 2,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHeapDecreaseKeySteps({
      array: [1, 5, 3, 7, 9, 8, 6],
      targetIndex: 3,
      newValue: 2,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap contains the new value", () => {
    const steps = generateHeapDecreaseKeySteps({
      array: [1, 5, 3, 7, 9, 8, 6],
      targetIndex: 3,
      newValue: 2,
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    const values = heapNodes.map((node) => node.value);
    expect(values.includes(2)).toBe(true);
    expect(values.includes(7)).toBe(false);
  });

  it("handles no sift needed (new value stays in place)", () => {
    const steps = generateHeapDecreaseKeySteps({
      array: [1, 5, 3, 7, 9, 8, 6],
      targetIndex: 3,
      newValue: 6,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles single-element heap", () => {
    const steps = generateHeapDecreaseKeySteps({ array: [10], targetIndex: 0, newValue: 5 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
