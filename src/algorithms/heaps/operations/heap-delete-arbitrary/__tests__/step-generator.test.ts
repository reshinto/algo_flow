import { describe, it, expect } from "vitest";
import { generateHeapDeleteArbitrarySteps } from "../step-generator";

describe("generateHeapDeleteArbitrarySteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHeapDeleteArbitrarySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 2,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHeapDeleteArbitrarySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHeapDeleteArbitrarySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 2,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces heap visual states throughout", () => {
    const steps = generateHeapDeleteArbitrarySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 2,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHeapDeleteArbitrarySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 2,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap has one fewer element", () => {
    const steps = generateHeapDeleteArbitrarySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 2,
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(6);
  });

  it("handles deleting the last element", () => {
    const steps = generateHeapDeleteArbitrarySteps({
      array: [1, 3, 5, 7, 9, 8, 6],
      targetIndex: 6,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles a single-element heap", () => {
    const steps = generateHeapDeleteArbitrarySteps({ array: [42], targetIndex: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
