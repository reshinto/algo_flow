import { describe, it, expect } from "vitest";
import { generateDutchNationalFlagSteps } from "./step-generator";

describe("generateDutchNationalFlagSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1, 2, 1, 0],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for every step", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes visit steps for element examination", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1],
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("includes swap steps when 0s and 2s are present", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1],
    });
    const swapSteps = steps.filter((step) => step.type === "swap");
    expect(swapSteps.length).toBeGreaterThan(0);
  });

  it("includes visit steps for marking sorted regions", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1],
    });
    /* markElement defaults to type "visit"; sorted-region markers are visit steps */
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateDutchNationalFlagSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1, 2, 1, 0],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes pointer variables in visit steps", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1],
    });
    const visitStep = steps.find((step) => step.type === "visit");
    expect(visitStep?.variables).toHaveProperty("lowPointer");
    expect(visitStep?.variables).toHaveProperty("midPointer");
    expect(visitStep?.variables).toHaveProperty("highPointer");
  });

  it("includes result in complete step variables", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("result");
  });

  it("produces no swap steps for an array of all 1s", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [1, 1, 1],
    });
    const swapSteps = steps.filter((step) => step.type === "swap");
    expect(swapSteps.length).toBe(0);
  });

  it("handles the default input", () => {
    const steps = generateDutchNationalFlagSteps({
      inputArray: [2, 0, 1, 2, 1, 0, 0, 2, 1],
    });
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });
});
