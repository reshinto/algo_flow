import { describe, it, expect } from "vitest";
import { generateSingleNumberSteps } from "../step-generator";

describe("generateSingleNumberSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateSingleNumberSteps({ inputArray: [4, 1, 2, 1, 2] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSingleNumberSteps({ inputArray: [4, 1, 2, 1, 2] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSingleNumberSteps({ inputArray: [4, 1, 2, 1, 2] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generateSingleNumberSteps({ inputArray: [4, 1, 2, 1, 2] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("complete step reports correct unique element for [4,1,2,1,2]", () => {
    const steps = generateSingleNumberSteps({ inputArray: [4, 1, 2, 1, 2] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.uniqueElement).toBe(4);
  });

  it("complete step reports correct unique element for [1,1,2,2,3]", () => {
    const steps = generateSingleNumberSteps({ inputArray: [1, 1, 2, 2, 3] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.uniqueElement).toBe(3);
  });

  it("handles empty array gracefully", () => {
    const steps = generateSingleNumberSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles single element array", () => {
    const steps = generateSingleNumberSteps({ inputArray: [42] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.uniqueElement).toBe(42);
  });

  it("has incrementing step indices", () => {
    const steps = generateSingleNumberSteps({ inputArray: [4, 1, 2, 1, 2] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("complete step has uniqueElement property", () => {
    const steps = generateSingleNumberSteps({ inputArray: [4, 1, 2, 1, 2] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("uniqueElement");
  });

  it("initialize step includes inputArray and arrayLength variables", () => {
    const steps = generateSingleNumberSteps({ inputArray: [4, 1, 2, 1, 2] });
    expect(steps[0]?.variables).toHaveProperty("inputArray");
    expect(steps[0]?.variables).toHaveProperty("arrayLength");
  });

  it("includes visit steps for each element except the last (which is marked found)", () => {
    const steps = generateSingleNumberSteps({ inputArray: [4, 1, 2, 1, 2] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    /* 5 elements: 4 visit + 1 found-mark */
    expect(visitSteps.length).toBe(4);
  });
});
