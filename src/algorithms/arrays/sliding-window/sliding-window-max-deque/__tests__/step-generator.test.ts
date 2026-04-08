import { describe, it, expect } from "vitest";
import { generateSlidingWindowMaxDequeSteps } from "../step-generator";

describe("generateSlidingWindowMaxDequeSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSlidingWindowMaxDequeSteps({
      inputArray: [1, 3, -1, -3, 5, 3, 6, 7],
      windowSize: 3,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSlidingWindowMaxDequeSteps({
      inputArray: [1, 3, -1, -3, 5, 3, 6, 7],
      windowSize: 3,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSlidingWindowMaxDequeSteps({
      inputArray: [1, 3, -1, -3, 5, 3, 6, 7],
      windowSize: 3,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generateSlidingWindowMaxDequeSteps({
      inputArray: [1, 3, -1, -3, 5, 3, 6, 7],
      windowSize: 3,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes move-window steps for window advancement", () => {
    const steps = generateSlidingWindowMaxDequeSteps({
      inputArray: [1, 3, -1, -3, 5, 3, 6, 7],
      windowSize: 3,
    });
    const moveSteps = steps.filter((step) => step.type === "move-window");
    expect(moveSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateSlidingWindowMaxDequeSteps({ inputArray: [], windowSize: 3 });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateSlidingWindowMaxDequeSteps({
      inputArray: [1, 3, -1, -3, 5, 3, 6, 7],
      windowSize: 3,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("final complete step variables contain result array", () => {
    const steps = generateSlidingWindowMaxDequeSteps({
      inputArray: [1, 3, -1, -3, 5, 3, 6, 7],
      windowSize: 3,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables).toHaveProperty("result");
    expect(lastStep?.variables["result"]).toEqual([3, 3, 5, 5, 6, 7]);
  });
});
