import { describe, it, expect } from "vitest";
import { generateCyclicSortSteps } from "./step-generator";

describe("generateCyclicSortSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateCyclicSortSteps({
      inputArray: [3, 5, 2, 1, 4, 6],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCyclicSortSteps({
      inputArray: [3, 5, 2, 1, 4, 6],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCyclicSortSteps({
      inputArray: [3, 5, 2, 1, 4, 6],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for every step", () => {
    const steps = generateCyclicSortSteps({
      inputArray: [3, 1, 2],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes visit steps for examining elements", () => {
    const steps = generateCyclicSortSteps({
      inputArray: [3, 1, 2],
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("includes swap steps when elements need to move", () => {
    const steps = generateCyclicSortSteps({
      inputArray: [3, 1, 2],
    });
    const swapSteps = steps.filter((step) => step.type === "swap");
    expect(swapSteps.length).toBeGreaterThan(0);
  });

  it("produces no swap steps for an already-sorted array", () => {
    const steps = generateCyclicSortSteps({
      inputArray: [1, 2, 3, 4],
    });
    const swapSteps = steps.filter((step) => step.type === "swap");
    expect(swapSteps.length).toBe(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateCyclicSortSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateCyclicSortSteps({
      inputArray: [3, 5, 2, 1, 4, 6],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes position tracking variables in visit steps", () => {
    const steps = generateCyclicSortSteps({
      inputArray: [2, 1, 3],
    });
    const visitStep = steps.find((step) => step.type === "visit");
    expect(visitStep?.variables).toHaveProperty("currentIndex");
    expect(visitStep?.variables).toHaveProperty("currentValue");
    expect(visitStep?.variables).toHaveProperty("correctIndex");
  });

  it("includes result and swapCount in complete step variables", () => {
    const steps = generateCyclicSortSteps({
      inputArray: [2, 1, 3],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("result");
    expect(completeStep?.variables).toHaveProperty("swapCount");
  });

  it("handles single-element array", () => {
    const steps = generateCyclicSortSteps({ inputArray: [1] });
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });
});
