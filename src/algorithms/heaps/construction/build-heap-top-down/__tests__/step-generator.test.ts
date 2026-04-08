import { describe, it, expect } from "vitest";
import { generateBuildHeapTopDownSteps } from "../step-generator";

describe("generateBuildHeapTopDownSteps", () => {
  it("produces steps for the default 9-element input", () => {
    const steps = generateBuildHeapTopDownSteps({ array: [9, 5, 7, 1, 3, 8, 2, 6, 4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBuildHeapTopDownSteps({ array: [9, 5, 7, 1, 3, 8, 2, 6, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBuildHeapTopDownSteps({ array: [9, 5, 7, 1, 3, 8, 2, 6, 4] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces heap visual states throughout", () => {
    const steps = generateBuildHeapTopDownSteps({ array: [9, 5, 7, 1, 3, 8, 2, 6, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateBuildHeapTopDownSteps({ array: [9, 5, 7, 1, 3, 8, 2, 6, 4] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap state satisfies min-heap property", () => {
    const steps = generateBuildHeapTopDownSteps({ array: [9, 5, 7, 1, 3, 8, 2, 6, 4] });
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

  it("handles a single-element array", () => {
    const steps = generateBuildHeapTopDownSteps({ array: [1] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles an already sorted ascending array", () => {
    const steps = generateBuildHeapTopDownSteps({ array: [1, 2, 3, 4, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
