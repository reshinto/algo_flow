import { describe, it, expect } from "vitest";
import { generateCountingSortSteps } from "./step-generator";

describe("generateCountingSortSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateCountingSortSteps({ inputArray: [3, 1, 2] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCountingSortSteps({ inputArray: [3, 1, 2] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCountingSortSteps({ inputArray: [3, 1, 2] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states", () => {
    const steps = generateCountingSortSteps({ inputArray: [3, 1, 2] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("has secondary elements representing the count array", () => {
    const steps = generateCountingSortSteps({ inputArray: [3, 1, 2] });
    const lastStep = steps[steps.length - 1];
    if (lastStep?.visualState.kind === "array") {
      expect(lastStep.visualState.secondaryElements).toBeDefined();
      expect(lastStep.visualState.secondaryLabel).toBe("Count Array");
    }
  });

  it("handles empty array gracefully", () => {
    const steps = generateCountingSortSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("includes visit steps for counting pass", () => {
    const steps = generateCountingSortSteps({ inputArray: [2, 1, 3] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateCountingSortSteps({ inputArray: [2, 1, 3] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("produces more steps for larger arrays", () => {
    const smallSteps = generateCountingSortSteps({ inputArray: [1, 2] });
    const largeSteps = generateCountingSortSteps({ inputArray: [4, 2, 2, 8, 3, 3, 1, 7, 5] });
    expect(largeSteps.length).toBeGreaterThan(smallSteps.length);
  });
});
