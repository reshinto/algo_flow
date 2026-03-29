import { describe, it, expect } from "vitest";
import { generateContainerWithMostWaterSteps } from "./step-generator";

describe("generateContainerWithMostWaterSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateContainerWithMostWaterSteps({
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateContainerWithMostWaterSteps({
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateContainerWithMostWaterSteps({
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generateContainerWithMostWaterSteps({
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("complete step reports maxArea=49 for default input", () => {
    const steps = generateContainerWithMostWaterSteps({
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.maxArea).toBe(49);
  });

  it("complete step reports maxArea=1 for [1,1]", () => {
    const steps = generateContainerWithMostWaterSteps({ heights: [1, 1] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.maxArea).toBe(1);
  });

  it("handles empty array gracefully", () => {
    const steps = generateContainerWithMostWaterSteps({ heights: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles single element gracefully", () => {
    const steps = generateContainerWithMostWaterSteps({ heights: [5] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.maxArea).toBe(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateContainerWithMostWaterSteps({
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("initialize step includes heights and arrayLength variables", () => {
    const steps = generateContainerWithMostWaterSteps({
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    });
    expect(steps[0]?.variables).toHaveProperty("heights");
    expect(steps[0]?.variables).toHaveProperty("arrayLength");
  });

  it("includes compare steps during two-pointer convergence", () => {
    const steps = generateContainerWithMostWaterSteps({
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("complete step has leftIndex and rightIndex properties", () => {
    const steps = generateContainerWithMostWaterSteps({
      heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("leftIndex");
    expect(completeStep?.variables).toHaveProperty("rightIndex");
  });

  it("complete step for [5,5,5,5] reports maxArea=15", () => {
    const steps = generateContainerWithMostWaterSteps({ heights: [5, 5, 5, 5] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.maxArea).toBe(15);
  });
});
