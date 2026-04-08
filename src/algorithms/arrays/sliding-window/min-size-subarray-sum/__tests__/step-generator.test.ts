import { describe, it, expect } from "vitest";
import { generateMinSizeSubarraySumSteps } from "../step-generator";

describe("generateMinSizeSubarraySumSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMinSizeSubarraySumSteps({
      inputArray: [2, 3, 1, 2, 4, 3],
      target: 7,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMinSizeSubarraySumSteps({
      inputArray: [2, 3, 1, 2, 4, 3],
      target: 7,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMinSizeSubarraySumSteps({
      inputArray: [2, 3, 1, 2, 4, 3],
      target: 7,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces only array kind visual states", () => {
    const steps = generateMinSizeSubarraySumSteps({
      inputArray: [2, 3, 1, 2, 4, 3],
      target: 7,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes expand-window steps", () => {
    const steps = generateMinSizeSubarraySumSteps({
      inputArray: [2, 3, 1, 2, 4, 3],
      target: 7,
    });
    const expandSteps = steps.filter((step) => step.type === "expand-window");
    expect(expandSteps.length).toBeGreaterThan(0);
  });

  it("includes shrink-window steps when sum exceeds target", () => {
    const steps = generateMinSizeSubarraySumSteps({
      inputArray: [2, 3, 1, 2, 4, 3],
      target: 7,
    });
    const shrinkSteps = steps.filter((step) => step.type === "shrink-window");
    expect(shrinkSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateMinSizeSubarraySumSteps({
      inputArray: [],
      target: 7,
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateMinSizeSubarraySumSteps({
      inputArray: [2, 3, 1, 2, 4, 3],
      target: 7,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("complete step contains minLength in variables", () => {
    const steps = generateMinSizeSubarraySumSteps({
      inputArray: [2, 3, 1, 2, 4, 3],
      target: 7,
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("minLength");
  });
});
