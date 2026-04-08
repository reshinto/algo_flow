import { describe, it, expect } from "vitest";
import { generateMaxSubarrayKadaneSteps } from "../step-generator";

describe("generateMaxSubarrayKadaneSteps", () => {
  it("produces steps for a standard input", () => {
    const steps = generateMaxSubarrayKadaneSteps({ array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMaxSubarrayKadaneSteps({ array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMaxSubarrayKadaneSteps({ array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateMaxSubarrayKadaneSteps({ array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for the base case", () => {
    const steps = generateMaxSubarrayKadaneSteps({ array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps for each non-base index", () => {
    const inputArray = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    const steps = generateMaxSubarrayKadaneSteps({ array: inputArray });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(inputArray.length - 1);
  });

  it("includes read-cache steps — one per non-base index", () => {
    const inputArray = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    const steps = generateMaxSubarrayKadaneSteps({ array: inputArray });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBe(inputArray.length - 1);
  });

  it("has incrementing step indices", () => {
    const steps = generateMaxSubarrayKadaneSteps({ array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles single-element array edge case", () => {
    const steps = generateMaxSubarrayKadaneSteps({ array: [42] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
