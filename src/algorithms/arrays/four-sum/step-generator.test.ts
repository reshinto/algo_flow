import { describe, it, expect } from "vitest";
import { generateFourSumSteps } from "./step-generator";

describe("generateFourSumSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFourSumSteps({ inputArray: [1, 0, -1, 0, -2, 2], target: 0 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFourSumSteps({ inputArray: [1, 0, -1, 0, -2, 2], target: 0 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFourSumSteps({ inputArray: [1, 0, -1, 0, -2, 2], target: 0 });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generateFourSumSteps({ inputArray: [1, 0, -1, 0, -2, 2], target: 0 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps for the two-pointer search", () => {
    const steps = generateFourSumSteps({ inputArray: [1, 0, -1, 0, -2, 2], target: 0 });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array — returns initialize and complete only", () => {
    const steps = generateFourSumSteps({ inputArray: [], target: 0 });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles fewer than four elements", () => {
    const steps = generateFourSumSteps({ inputArray: [1, 2, 3], target: 6 });
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateFourSumSteps({ inputArray: [1, 0, -1, 0, -2, 2], target: 0 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("stores found quadruplets in the complete step variables", () => {
    const steps = generateFourSumSteps({ inputArray: [1, 0, -1, 0, -2, 2], target: 0 });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables).toHaveProperty("quadruplets");
    const quadruplets = lastStep.variables["quadruplets"] as number[][];
    expect(quadruplets).toHaveLength(3);
  });
});
