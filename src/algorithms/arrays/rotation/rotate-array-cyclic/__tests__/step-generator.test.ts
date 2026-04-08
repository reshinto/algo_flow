import { describe, it, expect } from "vitest";
import { generateRotateArrayCyclicSteps } from "../step-generator";

describe("generateRotateArrayCyclicSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateRotateArrayCyclicSteps({
      inputArray: [1, 2, 3, 4, 5, 6],
      rotateCount: 2,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRotateArrayCyclicSteps({
      inputArray: [1, 2, 3, 4, 5, 6],
      rotateCount: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRotateArrayCyclicSteps({
      inputArray: [1, 2, 3, 4, 5, 6],
      rotateCount: 2,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("all steps have array visual state kind", () => {
    const steps = generateRotateArrayCyclicSteps({
      inputArray: [1, 2, 3, 4, 5, 6],
      rotateCount: 2,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRotateArrayCyclicSteps({
      inputArray: [1, 2, 3, 4, 5, 6],
      rotateCount: 2,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles empty array gracefully", () => {
    const steps = generateRotateArrayCyclicSteps({ inputArray: [], rotateCount: 3 });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles rotate count of 0 gracefully", () => {
    const steps = generateRotateArrayCyclicSteps({ inputArray: [1, 2, 3], rotateCount: 0 });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("includes visit steps for cycle starts", () => {
    const steps = generateRotateArrayCyclicSteps({
      inputArray: [1, 2, 3, 4, 5, 6],
      rotateCount: 2,
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("includes compare steps for destination calculation", () => {
    const steps = generateRotateArrayCyclicSteps({
      inputArray: [1, 2, 3, 4, 5, 6],
      rotateCount: 2,
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("complete step variables contain result and rotateCount", () => {
    const steps = generateRotateArrayCyclicSteps({
      inputArray: [1, 2, 3, 4, 5, 6],
      rotateCount: 2,
    });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables).toHaveProperty("result");
    expect(lastStep.variables).toHaveProperty("rotateCount");
  });
});
