import { describe, it, expect } from "vitest";
import { generateProductExceptSelfSteps } from "../step-generator";

describe("generateProductExceptSelfSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateProductExceptSelfSteps({ inputArray: [1, 2, 3, 4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateProductExceptSelfSteps({ inputArray: [1, 2, 3, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateProductExceptSelfSteps({ inputArray: [1, 2, 3, 4] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generateProductExceptSelfSteps({ inputArray: [1, 2, 3, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes visit steps for the prefix pass", () => {
    const steps = generateProductExceptSelfSteps({ inputArray: [1, 2, 3, 4] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThanOrEqual(4);
  });

  it("handles empty array gracefully with initialize and complete steps", () => {
    const steps = generateProductExceptSelfSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateProductExceptSelfSteps({ inputArray: [1, 2, 3, 4, 5] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("produces the correct number of steps for five elements", () => {
    /* 1 initialize + 5 prefix visits + 5 suffix markElement calls + 1 complete = 12 */
    const steps = generateProductExceptSelfSteps({ inputArray: [1, 2, 3, 4, 5] });
    expect(steps.length).toBe(12);
  });

  it("stores result array in the complete step variables", () => {
    const steps = generateProductExceptSelfSteps({ inputArray: [1, 2, 3, 4] });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables).toHaveProperty("resultArray");
    expect(lastStep.variables["resultArray"]).toEqual([24, 12, 8, 6]);
  });
});
