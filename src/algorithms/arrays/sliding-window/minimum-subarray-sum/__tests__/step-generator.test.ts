import { describe, it, expect } from "vitest";
import { generateMinimumSubarraySumSteps } from "../step-generator";

describe("generateMinimumSubarraySumSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMinimumSubarraySumSteps({
      inputArray: [3, -4, 2, -3, -1, 7, -5],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMinimumSubarraySumSteps({
      inputArray: [3, -4, 2, -3, -1, 7, -5],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMinimumSubarraySumSteps({
      inputArray: [3, -4, 2, -3, -1, 7, -5],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces only array kind visual states", () => {
    const steps = generateMinimumSubarraySumSteps({
      inputArray: [3, -4, 2, -3, -1, 7, -5],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("produces n-1 compare steps for an n-element array", () => {
    /* One comparison step per element after the first, plus one visit step for the first element */
    const inputArray = [3, -4, 2, -3, -1, 7, -5];
    const steps = generateMinimumSubarraySumSteps({ inputArray });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBe(inputArray.length - 1);
  });

  it("handles empty array gracefully", () => {
    const steps = generateMinimumSubarraySumSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateMinimumSubarraySumSteps({
      inputArray: [3, -4, 2, -3, -1, 7, -5],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("complete step contains minSum in variables", () => {
    const steps = generateMinimumSubarraySumSteps({
      inputArray: [3, -4, 2, -3, -1, 7, -5],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("minSum");
  });

  it("handles single-element array", () => {
    const steps = generateMinimumSubarraySumSteps({ inputArray: [-5] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.minSum).toBe(-5);
  });
});
