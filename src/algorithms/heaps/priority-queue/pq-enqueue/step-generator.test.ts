import { describe, it, expect } from "vitest";
import { generatePqEnqueueSteps } from "./step-generator";

describe("generatePqEnqueueSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generatePqEnqueueSteps({ array: [2, 5, 8, 10, 15], value: 3 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePqEnqueueSteps({ array: [2, 5, 8, 10, 15], value: 3 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePqEnqueueSteps({ array: [2, 5, 8, 10, 15], value: 3 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generatePqEnqueueSteps({ array: [2, 5, 8, 10, 15], value: 3 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generatePqEnqueueSteps({ array: [2, 5, 8, 10, 15], value: 3 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap has one more node than the input", () => {
    const inputSize = 5;
    const steps = generatePqEnqueueSteps({ array: [2, 5, 8, 10, 15], value: 3 });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(inputSize + 1);
  });

  it("enqueued value is present in the final heap", () => {
    const steps = generatePqEnqueueSteps({ array: [2, 5, 8, 10, 15], value: 3 });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    const values = heapNodes.map((node) => node.value);
    expect(values).toContain(3);
  });

  it("contains sift-up steps when the new value has high priority", () => {
    const steps = generatePqEnqueueSteps({ array: [5, 10, 15], value: 1 });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("sift-up");
  });

  it("handles enqueue into an empty queue", () => {
    const steps = generatePqEnqueueSteps({ array: [], value: 7 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
