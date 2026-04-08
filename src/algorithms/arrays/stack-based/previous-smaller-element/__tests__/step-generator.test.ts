import { describe, it, expect } from "vitest";
import { generatePreviousSmallerElementSteps } from "../step-generator";

describe("generatePreviousSmallerElementSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generatePreviousSmallerElementSteps({ inputArray: [4, 10, 5, 8, 20, 15, 3, 12] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePreviousSmallerElementSteps({ inputArray: [4, 10, 5, 8, 20, 15, 3, 12] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePreviousSmallerElementSteps({ inputArray: [4, 10, 5, 8, 20, 15, 3, 12] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generatePreviousSmallerElementSteps({ inputArray: [4, 10, 5, 8, 20, 15, 3, 12] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes visit steps for each element", () => {
    const steps = generatePreviousSmallerElementSteps({ inputArray: [4, 10, 5, 8, 20, 15, 3, 12] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array — returns initialize and complete only", () => {
    const steps = generatePreviousSmallerElementSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles single element array", () => {
    const steps = generatePreviousSmallerElementSteps({ inputArray: [5] });
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generatePreviousSmallerElementSteps({ inputArray: [4, 10, 5, 8, 20, 15, 3, 12] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("stores the result array in the complete step variables", () => {
    const steps = generatePreviousSmallerElementSteps({ inputArray: [4, 10, 5, 8, 20, 15, 3, 12] });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables).toHaveProperty("resultArray");
    const resultArray = lastStep.variables["resultArray"] as number[];
    expect(resultArray).toEqual([-1, 4, 4, 5, 8, 8, -1, 3]);
  });
});
