import { describe, it, expect } from "vitest";
import { generateLastStoneWeightSteps } from "./step-generator";

describe("generateLastStoneWeightSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLastStoneWeightSteps({ array: [2, 7, 4, 1, 8, 1] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLastStoneWeightSteps({ array: [2, 7, 4, 1, 8, 1] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLastStoneWeightSteps({ array: [2, 7, 4, 1, 8, 1] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateLastStoneWeightSteps({ array: [2, 7, 4, 1, 8, 1] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLastStoneWeightSteps({ array: [2, 7, 4, 1, 8, 1] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("contains a heap-extract step", () => {
    const steps = generateLastStoneWeightSteps({ array: [2, 7, 4, 1, 8, 1] });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-extract");
  });

  it("final complete step variables include result = 1 for default input", () => {
    const steps = generateLastStoneWeightSteps({ array: [2, 7, 4, 1, 8, 1] });
    const lastStep = steps[steps.length - 1]!;
    expect((lastStep.variables as { result: number }).result).toBe(1);
  });

  it("final heap has 0 or 1 nodes", () => {
    const steps = generateLastStoneWeightSteps({ array: [2, 7, 4, 1, 8, 1] });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBeLessThanOrEqual(1);
  });

  it("single stone produces correct result", () => {
    const steps = generateLastStoneWeightSteps({ array: [5] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const lastStep = steps[steps.length - 1]!;
    expect((lastStep.variables as { result: number }).result).toBe(5);
  });

  it("two equal stones produce result = 0", () => {
    const steps = generateLastStoneWeightSteps({ array: [3, 3] });
    const lastStep = steps[steps.length - 1]!;
    expect((lastStep.variables as { result: number }).result).toBe(0);
  });

  it("two unequal stones produce the difference", () => {
    const steps = generateLastStoneWeightSteps({ array: [3, 7] });
    const lastStep = steps[steps.length - 1]!;
    expect((lastStep.variables as { result: number }).result).toBe(4);
  });

  it("contains a heap-insert step when stones differ (reinsert difference)", () => {
    const steps = generateLastStoneWeightSteps({ array: [3, 7] });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
  });
});
