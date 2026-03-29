import { describe, it, expect } from "vitest";
import { generateThreeSumSteps } from "./step-generator";

describe("generateThreeSumSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateThreeSumSteps({ inputArray: [-1, 0, 1, 2, -1, -4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateThreeSumSteps({ inputArray: [-1, 0, 1, 2, -1, -4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateThreeSumSteps({ inputArray: [-1, 0, 1, 2, -1, -4] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generateThreeSumSteps({ inputArray: [-1, 0, 1, 2, -1, -4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare-two steps for the two-pointer search", () => {
    const steps = generateThreeSumSteps({ inputArray: [-1, 0, 1, 2, -1, -4] });
    const compareTwoSteps = steps.filter((step) => step.type === "compare");
    expect(compareTwoSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array — returns initialize and complete only", () => {
    const steps = generateThreeSumSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles array with fewer than three elements", () => {
    const steps = generateThreeSumSteps({ inputArray: [1, 2] });
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateThreeSumSteps({ inputArray: [-1, 0, 1, 2, -1, -4] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("stores found triplets in the complete step variables", () => {
    const steps = generateThreeSumSteps({ inputArray: [-1, 0, 1, 2, -1, -4] });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables).toHaveProperty("triplets");
    const triplets = lastStep.variables["triplets"] as number[][];
    expect(triplets).toHaveLength(2);
  });
});
