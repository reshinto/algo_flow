import { describe, it, expect } from "vitest";
import { generateHeapifySingleNodeSteps } from "../step-generator";

describe("generateHeapifySingleNodeSteps", () => {
  it("produces steps for the default 9-element input at index 0", () => {
    const steps = generateHeapifySingleNodeSteps({
      array: [9, 1, 7, 2, 3, 8, 5, 6, 4],
      targetIndex: 0,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHeapifySingleNodeSteps({
      array: [9, 1, 7, 2, 3, 8, 5, 6, 4],
      targetIndex: 0,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHeapifySingleNodeSteps({
      array: [9, 1, 7, 2, 3, 8, 5, 6, 4],
      targetIndex: 0,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces heap visual states throughout", () => {
    const steps = generateHeapifySingleNodeSteps({
      array: [9, 1, 7, 2, 3, 8, 5, 6, 4],
      targetIndex: 0,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHeapifySingleNodeSteps({
      array: [9, 1, 7, 2, 3, 8, 5, 6, 4],
      targetIndex: 0,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap state has minimum at root after heapifying index 0", () => {
    const steps = generateHeapifySingleNodeSteps({
      array: [9, 1, 7, 2, 3, 8, 5, 6, 4],
      targetIndex: 0,
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    const rootValue = heapNodes.find((node) => node.index === 0)?.value;
    expect(rootValue).toBe(1);
  });

  it("handles a leaf node target — produces minimal steps", () => {
    const steps = generateHeapifySingleNodeSteps({
      array: [1, 2, 3, 4, 5],
      targetIndex: 4,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles a single-element array", () => {
    const steps = generateHeapifySingleNodeSteps({ array: [42], targetIndex: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles already-valid subtree — settles immediately", () => {
    const steps = generateHeapifySingleNodeSteps({
      array: [1, 2, 3, 4, 5, 6, 7],
      targetIndex: 0,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
