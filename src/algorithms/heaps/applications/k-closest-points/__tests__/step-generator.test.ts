import { describe, it, expect } from "vitest";
import { generateKClosestPointsSteps } from "../step-generator";
import type { KClosestPointsInput } from "../step-generator";

const defaultInput: KClosestPointsInput = {
  points: [
    [3, 3],
    [5, -1],
    [-2, 4],
    [1, 1],
    [0, 2],
    [-1, -1],
    [4, 0],
  ],
  kValue: 3,
};

describe("generateKClosestPointsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateKClosestPointsSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateKClosestPointsSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateKClosestPointsSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateKClosestPointsSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateKClosestPointsSteps(defaultInput);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("final heap has exactly k nodes", () => {
    const steps = generateKClosestPointsSteps(defaultInput);
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(defaultInput.kValue);
  });

  it("contains heap-insert steps for initial fill", () => {
    const steps = generateKClosestPointsSteps(defaultInput);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
  });

  it("contains heap-extract steps when closer points replace root", () => {
    const steps = generateKClosestPointsSteps(defaultInput);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-extract");
  });

  it("works with k=1", () => {
    const singleInput: KClosestPointsInput = {
      points: [
        [3, 3],
        [1, 0],
      ],
      kValue: 1,
    };
    const steps = generateKClosestPointsSteps(singleInput);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
