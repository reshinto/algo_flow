import { describe, it, expect } from "vitest";
import { generateHeapIncreaseKeySteps } from "./step-generator";

describe("generateHeapIncreaseKeySteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHeapIncreaseKeySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 1,
      newValue: 10,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHeapIncreaseKeySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 1,
      newValue: 10,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHeapIncreaseKeySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 1,
      newValue: 10,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces heap visual states throughout", () => {
    const steps = generateHeapIncreaseKeySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 1,
      newValue: 10,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHeapIncreaseKeySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 1,
      newValue: 10,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap contains the new value", () => {
    const steps = generateHeapIncreaseKeySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 1,
      newValue: 10,
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    const values = heapNodes.map((node) => node.value);
    expect(values.includes(10)).toBe(true);
    expect(values.includes(3)).toBe(false);
  });

  it("handles no sift needed (new value smaller than both children)", () => {
    const steps = generateHeapIncreaseKeySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 1,
      newValue: 5,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles increasing a leaf node", () => {
    const steps = generateHeapIncreaseKeySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 6,
      newValue: 100,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles single-element heap", () => {
    const steps = generateHeapIncreaseKeySteps({ array: [5], targetIndex: 0, newValue: 10 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
