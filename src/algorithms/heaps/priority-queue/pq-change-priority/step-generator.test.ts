import { describe, it, expect } from "vitest";
import { generatePqChangePrioritySteps } from "./step-generator";

describe("generatePqChangePrioritySteps", () => {
  it("produces steps for the default input (decrease value — sift up)", () => {
    const steps = generatePqChangePrioritySteps({
      array: [2, 5, 3, 10, 15, 8, 7],
      targetIndex: 4,
      newValue: 1,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePqChangePrioritySteps({
      array: [2, 5, 3, 10, 15, 8, 7],
      targetIndex: 4,
      newValue: 1,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePqChangePrioritySteps({
      array: [2, 5, 3, 10, 15, 8, 7],
      targetIndex: 4,
      newValue: 1,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generatePqChangePrioritySteps({
      array: [2, 5, 3, 10, 15, 8, 7],
      targetIndex: 4,
      newValue: 1,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generatePqChangePrioritySteps({
      array: [2, 5, 3, 10, 15, 8, 7],
      targetIndex: 4,
      newValue: 1,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("contains sift-up steps when value is decreased", () => {
    const steps = generatePqChangePrioritySteps({
      array: [2, 5, 3, 10, 15, 8, 7],
      targetIndex: 4,
      newValue: 1,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("sift-up");
  });

  it("contains sift-down steps when value is increased", () => {
    const steps = generatePqChangePrioritySteps({
      array: [2, 5, 3, 10, 15, 8, 7],
      targetIndex: 0,
      newValue: 20,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("sift-down");
  });

  it("heap size remains the same after changing priority", () => {
    const inputSize = 7;
    const steps = generatePqChangePrioritySteps({
      array: [2, 5, 3, 10, 15, 8, 7],
      targetIndex: 4,
      newValue: 1,
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(inputSize);
  });

  it("new value appears in the final heap", () => {
    const steps = generatePqChangePrioritySteps({
      array: [2, 5, 3, 10, 15, 8, 7],
      targetIndex: 4,
      newValue: 1,
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    const values = heapNodes.map((node) => node.value);
    expect(values).toContain(1);
  });
});
