import { describe, it, expect } from "vitest";
import { generateFirstNegativeInWindowSteps } from "../step-generator";

describe("generateFirstNegativeInWindowSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateFirstNegativeInWindowSteps({
      inputArray: [12, -1, -7, 8, -15, 30, 16, 28],
      windowSize: 3,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFirstNegativeInWindowSteps({
      inputArray: [12, -1, -7, 8, -15, 30, 16, 28],
      windowSize: 3,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFirstNegativeInWindowSteps({
      inputArray: [12, -1, -7, 8, -15, 30, 16, 28],
      windowSize: 3,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generateFirstNegativeInWindowSteps({
      inputArray: [12, -1, -7, 8, -15, 30, 16, 28],
      windowSize: 3,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes a move-window step for the initial window", () => {
    const steps = generateFirstNegativeInWindowSteps({
      inputArray: [12, -1, -7, 8, -15, 30, 16, 28],
      windowSize: 3,
    });
    const moveSteps = steps.filter((step) => step.type === "move-window");
    expect(moveSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compare steps equal to the number of sliding windows (excluding initial)", () => {
    const inputArray = [12, -1, -7, 8, -15, 30, 16, 28];
    const windowSize = 3;
    const steps = generateFirstNegativeInWindowSteps({ inputArray, windowSize });
    const compareSteps = steps.filter((step) => step.type === "compare");
    /* Initial window is covered by move-window; compare steps cover the n-k sliding positions */
    const slidingWindows = inputArray.length - windowSize;
    expect(compareSteps.length).toBe(slidingWindows);
  });

  it("handles empty array gracefully", () => {
    const steps = generateFirstNegativeInWindowSteps({ inputArray: [], windowSize: 3 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles all-positive array with no shrink steps", () => {
    const steps = generateFirstNegativeInWindowSteps({
      inputArray: [1, 2, 3, 4, 5],
      windowSize: 3,
    });
    const shrinkSteps = steps.filter((step) => step.type === "shrink-window");
    expect(shrinkSteps.length).toBe(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateFirstNegativeInWindowSteps({
      inputArray: [12, -1, -7, 8, -15, 30, 16, 28],
      windowSize: 3,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
