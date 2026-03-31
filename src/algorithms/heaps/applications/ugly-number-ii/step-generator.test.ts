import { describe, it, expect } from "vitest";
import { generateUglyNumberIiSteps } from "./step-generator";
import type { UglyNumberIiInput } from "./step-generator";

const defaultInput: UglyNumberIiInput = { nthPosition: 10 };

describe("generateUglyNumberIiSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateUglyNumberIiSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateUglyNumberIiSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateUglyNumberIiSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateUglyNumberIiSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateUglyNumberIiSteps(defaultInput);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("contains heap-extract steps", () => {
    const steps = generateUglyNumberIiSteps(defaultInput);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-extract");
  });

  it("contains heap-insert steps for new candidates", () => {
    const steps = generateUglyNumberIiSteps(defaultInput);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
  });

  it("contains sift-down steps for restoring heap after extraction", () => {
    const steps = generateUglyNumberIiSteps(defaultInput);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("sift-down");
  });

  it("works for n=1 (single extraction)", () => {
    const steps = generateUglyNumberIiSteps({ nthPosition: 1 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces more steps for larger n", () => {
    const stepsForFive = generateUglyNumberIiSteps({ nthPosition: 5 });
    const stepsForTen = generateUglyNumberIiSteps({ nthPosition: 10 });
    expect(stepsForTen.length).toBeGreaterThan(stepsForFive.length);
  });
});
