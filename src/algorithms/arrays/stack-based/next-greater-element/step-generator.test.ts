import { describe, it, expect } from "vitest";
import { generateNextGreaterElementSteps } from "./step-generator";

describe("generateNextGreaterElementSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [4, 5, 2, 10, 8] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [4, 5, 2, 10, 8] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [4, 5, 2, 10, 8] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [4, 5, 2, 10, 8] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("complete step reports correct resultArray for [4,5,2,10,8]", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [4, 5, 2, 10, 8] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.resultArray).toEqual([5, 10, 10, -1, -1]);
  });

  it("complete step reports all -1 for strictly decreasing input", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [4, 3, 2, 1] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.resultArray).toEqual([-1, -1, -1, -1]);
  });

  it("handles empty array gracefully", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles single element array", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [42] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.resultArray).toEqual([-1]);
  });

  it("has incrementing step indices", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [4, 5, 2, 10, 8] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("initialize step includes inputArray and arrayLength variables", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [4, 5, 2, 10, 8] });
    expect(steps[0]?.variables).toHaveProperty("inputArray");
    expect(steps[0]?.variables).toHaveProperty("arrayLength");
  });

  it("complete step includes resultArray variable", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [4, 5, 2, 10, 8] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("resultArray");
  });

  it("includes visit steps during scan", () => {
    const steps = generateNextGreaterElementSteps({ inputArray: [1, 2, 3] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("complete step for default input [4,5,2,10,8,1,3] → [5,10,10,-1,-1,3,-1]", () => {
    const steps = generateNextGreaterElementSteps({
      inputArray: [4, 5, 2, 10, 8, 1, 3],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.resultArray).toEqual([5, 10, 10, -1, -1, 3, -1]);
  });
});
