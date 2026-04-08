import { describe, it, expect } from "vitest";
import { generateMaxProductSubarraySteps } from "../step-generator";

describe("generateMaxProductSubarraySteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateMaxProductSubarraySteps({
      inputArray: [2, 3, -2, 4, -1, 2],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMaxProductSubarraySteps({
      inputArray: [2, 3, -2, 4, -1, 2],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMaxProductSubarraySteps({
      inputArray: [2, 3, -2, 4, -1, 2],
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generateMaxProductSubarraySteps({
      inputArray: [2, 3, -2, 4, -1, 2],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("produces visit steps equal to array length (one per element)", () => {
    const inputArray = [2, 3, -2, 4, -1, 2];
    const steps = generateMaxProductSubarraySteps({ inputArray });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(inputArray.length);
  });

  it("handles empty array gracefully", () => {
    const steps = generateMaxProductSubarraySteps({ inputArray: [] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles single element array", () => {
    const steps = generateMaxProductSubarraySteps({ inputArray: [5] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateMaxProductSubarraySteps({
      inputArray: [2, 3, -2, 4, -1, 2],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
