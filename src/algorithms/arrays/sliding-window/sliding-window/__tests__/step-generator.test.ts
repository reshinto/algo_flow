import { describe, it, expect } from "vitest";
import { generateSlidingWindowSteps } from "../step-generator";

describe("generateSlidingWindowSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateSlidingWindowSteps({
      inputArray: [2, 1, 5, 1, 3, 2],
      windowSize: 3,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSlidingWindowSteps({
      inputArray: [2, 1, 5, 1, 3, 2],
      windowSize: 3,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSlidingWindowSteps({
      inputArray: [2, 1, 5, 1, 3, 2],
      windowSize: 3,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states", () => {
    const steps = generateSlidingWindowSteps({
      inputArray: [2, 1, 5, 1, 3, 2],
      windowSize: 3,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes move-window step for initial window", () => {
    const steps = generateSlidingWindowSteps({
      inputArray: [2, 1, 5, 1, 3, 2],
      windowSize: 3,
    });
    const moveSteps = steps.filter((step) => step.type === "move-window");
    expect(moveSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes shrink and expand steps for sliding", () => {
    const steps = generateSlidingWindowSteps({
      inputArray: [2, 1, 5, 1, 3, 2],
      windowSize: 3,
    });
    const shrinkSteps = steps.filter((step) => step.type === "shrink-window");
    const expandSteps = steps.filter((step) => step.type === "expand-window");
    /* 6 elements - 3 window size = 3 slides */
    expect(shrinkSteps.length).toBe(3);
    expect(expandSteps.length).toBe(3);
  });

  it("handles empty array gracefully", () => {
    const steps = generateSlidingWindowSteps({
      inputArray: [],
      windowSize: 3,
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateSlidingWindowSteps({
      inputArray: [2, 1, 5, 1, 3, 2],
      windowSize: 3,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
