import { describe, it, expect } from "vitest";
import { generatePqDequeueSteps } from "./step-generator";

describe("generatePqDequeueSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generatePqDequeueSteps({ array: [2, 5, 3, 10, 15, 8, 7] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePqDequeueSteps({ array: [2, 5, 3, 10, 15, 8, 7] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePqDequeueSteps({ array: [2, 5, 3, 10, 15, 8, 7] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generatePqDequeueSteps({ array: [2, 5, 3, 10, 15, 8, 7] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generatePqDequeueSteps({ array: [2, 5, 3, 10, 15, 8, 7] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap has one fewer node than the input", () => {
    const inputSize = 7;
    const steps = generatePqDequeueSteps({ array: [2, 5, 3, 10, 15, 8, 7] });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(inputSize - 1);
  });

  it("contains heap-extract and sift-down steps", () => {
    const steps = generatePqDequeueSteps({ array: [2, 5, 3, 10, 15, 8, 7] });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-extract");
    expect(stepTypes).toContain("sift-down");
  });

  it("handles empty array — produces initialize and complete steps only", () => {
    const steps = generatePqDequeueSteps({ array: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles single-element queue", () => {
    const steps = generatePqDequeueSteps({ array: [5] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
