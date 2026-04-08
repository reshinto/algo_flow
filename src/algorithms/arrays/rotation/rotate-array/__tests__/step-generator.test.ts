import { describe, it, expect } from "vitest";
import { generateRotateArraySteps } from "../step-generator";

describe("generateRotateArraySteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5, 6, 7],
      rotateCount: 3,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5],
      rotateCount: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5],
      rotateCount: 2,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for every step", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5],
      rotateCount: 2,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes swap steps for the reversal operations", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5, 6, 7],
      rotateCount: 3,
    });
    const swapSteps = steps.filter((step) => step.type === "swap");
    expect(swapSteps.length).toBeGreaterThan(0);
  });

  it("includes move-window steps to highlight reversal segments", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5, 6, 7],
      rotateCount: 3,
    });
    const moveWindowSteps = steps.filter((step) => step.type === "move-window");
    /* At least 3 move-window steps for the three phases */
    expect(moveWindowSteps.length).toBeGreaterThanOrEqual(3);
  });

  it("handles empty array gracefully", () => {
    const steps = generateRotateArraySteps({ inputArray: [], rotateCount: 3 });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles k=0 with minimal steps", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5],
      rotateCount: 0,
    });
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles k equal to array length as no-op", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5],
      rotateCount: 5,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5, 6, 7],
      rotateCount: 3,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes phase variable in swap steps", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5],
      rotateCount: 2,
    });
    const swapStep = steps.find((step) => step.type === "swap");
    expect(swapStep?.variables).toHaveProperty("phase");
  });

  it("includes result in complete step variables", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5, 6, 7],
      rotateCount: 3,
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("result");
  });

  it("handles k larger than array length", () => {
    const steps = generateRotateArraySteps({
      inputArray: [1, 2, 3, 4, 5],
      rotateCount: 7,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });
});
