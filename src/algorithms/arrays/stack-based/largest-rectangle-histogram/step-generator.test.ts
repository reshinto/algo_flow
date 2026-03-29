import { describe, it, expect } from "vitest";
import { generateLargestRectangleHistogramSteps } from "./step-generator";

describe("generateLargestRectangleHistogramSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLargestRectangleHistogramSteps({ heights: [2, 1, 5, 6, 2, 3] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLargestRectangleHistogramSteps({ heights: [2, 1, 5, 6, 2, 3] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLargestRectangleHistogramSteps({ heights: [2, 1, 5, 6, 2, 3] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generateLargestRectangleHistogramSteps({ heights: [2, 1, 5, 6, 2, 3] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps when stack elements are popped", () => {
    const steps = generateLargestRectangleHistogramSteps({ heights: [2, 1, 5, 6, 2, 3] });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array with initialize and complete only", () => {
    const steps = generateLargestRectangleHistogramSteps({ heights: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateLargestRectangleHistogramSteps({ heights: [2, 1, 5, 6, 2, 3] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("final complete step variables contain maxArea", () => {
    const steps = generateLargestRectangleHistogramSteps({ heights: [2, 1, 5, 6, 2, 3] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables).toHaveProperty("maxArea");
    expect(lastStep?.variables["maxArea"]).toBe(10);
  });

  it("handles single bar input", () => {
    const steps = generateLargestRectangleHistogramSteps({ heights: [7] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables["maxArea"]).toBe(7);
  });
});
