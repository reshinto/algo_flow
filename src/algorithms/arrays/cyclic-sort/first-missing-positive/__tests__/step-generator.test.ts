import { describe, it, expect } from "vitest";
import { generateFirstMissingPositiveSteps } from "../step-generator";

describe("generateFirstMissingPositiveSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFirstMissingPositiveSteps({
      inputArray: [3, 4, -1, 1, 7, 5, 2],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFirstMissingPositiveSteps({
      inputArray: [3, 4, -1, 1, 7, 5, 2],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFirstMissingPositiveSteps({
      inputArray: [3, 4, -1, 1, 7, 5, 2],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("all steps have array visual state kind", () => {
    const steps = generateFirstMissingPositiveSteps({
      inputArray: [3, 4, -1, 1, 7, 5, 2],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFirstMissingPositiveSteps({
      inputArray: [3, 4, -1, 1, 7, 5, 2],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles empty array gracefully", () => {
    const steps = generateFirstMissingPositiveSteps({ inputArray: [] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("complete step contains missingPositive of 6 for default input", () => {
    /* Values present in [3,4,-1,1,7,5,2]: 1,2,3,4,5,7 — missing: 6 */
    const steps = generateFirstMissingPositiveSteps({
      inputArray: [3, 4, -1, 1, 7, 5, 2],
    });
    const lastStep = steps[steps.length - 1]!;
    const vars = lastStep.variables as { missingPositive: number };
    expect(vars.missingPositive).toBe(6);
  });

  it("includes swap steps during placement phase", () => {
    const steps = generateFirstMissingPositiveSteps({
      inputArray: [3, 4, -1, 1, 7, 5, 2],
    });
    const swapSteps = steps.filter((step) => step.type === "swap");
    expect(swapSteps.length).toBeGreaterThan(0);
  });

  it("includes visit steps during scan phase", () => {
    const steps = generateFirstMissingPositiveSteps({
      inputArray: [3, 4, -1, 1, 7, 5, 2],
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("returns n+1 when all values 1..n are present", () => {
    const steps = generateFirstMissingPositiveSteps({ inputArray: [1, 2, 3] });
    const lastStep = steps[steps.length - 1]!;
    const vars = lastStep.variables as { missingPositive: number };
    expect(vars.missingPositive).toBe(4);
  });
});
