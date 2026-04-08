import { describe, it, expect } from "vitest";
import { generateDifferenceArraySteps } from "../step-generator";

describe("generateDifferenceArraySteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateDifferenceArraySteps({
      arrayLength: 5,
      updates: [[1, 3, 3]],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDifferenceArraySteps({
      arrayLength: 5,
      updates: [[1, 3, 3]],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDifferenceArraySteps({
      arrayLength: 5,
      updates: [[1, 3, 3]],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states", () => {
    const steps = generateDifferenceArraySteps({
      arrayLength: 5,
      updates: [[1, 3, 3]],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("has secondary elements representing the difference array", () => {
    const steps = generateDifferenceArraySteps({
      arrayLength: 5,
      updates: [[1, 3, 3]],
    });
    const lastStep = steps[steps.length - 1];
    if (lastStep?.visualState.kind === "array") {
      expect(lastStep.visualState.secondaryElements).toBeDefined();
      expect(lastStep.visualState.secondaryLabel).toBe("Difference Array");
    }
  });

  it("handles no updates gracefully", () => {
    const steps = generateDifferenceArraySteps({
      arrayLength: 4,
      updates: [],
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateDifferenceArraySteps({
      arrayLength: 5,
      updates: [[0, 4, 2]],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("produces more steps for multiple updates", () => {
    const singleUpdateSteps = generateDifferenceArraySteps({
      arrayLength: 5,
      updates: [[1, 3, 3]],
    });
    const multiUpdateSteps = generateDifferenceArraySteps({
      arrayLength: 5,
      updates: [
        [1, 3, 3],
        [0, 2, 1],
        [2, 4, 2],
      ],
    });
    expect(multiUpdateSteps.length).toBeGreaterThan(singleUpdateSteps.length);
  });
});
