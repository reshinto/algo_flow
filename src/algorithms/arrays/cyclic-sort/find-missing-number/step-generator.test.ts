import { describe, it, expect } from "vitest";
import { generateFindMissingNumberSteps } from "./step-generator";

describe("generateFindMissingNumberSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [3, 0, 1] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [3, 0, 1] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [3, 0, 1] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [3, 0, 1] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes visit steps for range and array passes", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [3, 0, 1] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    /* 4 range values (0..3) + 3 array elements = 7 visit steps */
    expect(visitSteps.length).toBe(7);
  });

  it("complete step reports correct missing number for [3,0,1]", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [3, 0, 1] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.missingNumber).toBe(2);
  });

  it("complete step reports missing 0 for [1,2,3]", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [1, 2, 3] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.missingNumber).toBe(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [3, 0, 1] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("complete step has missingNumber property", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [3, 0, 1] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("missingNumber");
  });

  it("initialize step includes inputArray and arrayLength variables", () => {
    const steps = generateFindMissingNumberSteps({ inputArray: [3, 0, 1] });
    expect(steps[0]?.variables).toHaveProperty("inputArray");
    expect(steps[0]?.variables).toHaveProperty("arrayLength");
  });
});
