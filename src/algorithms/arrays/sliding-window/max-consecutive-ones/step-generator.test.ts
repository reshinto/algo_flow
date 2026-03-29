import { describe, it, expect } from "vitest";
import { generateMaxConsecutiveOnesSteps } from "./step-generator";

describe("generateMaxConsecutiveOnesSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMaxConsecutiveOnesSteps({
      inputArray: [1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
      maxFlips: 2,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMaxConsecutiveOnesSteps({
      inputArray: [1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
      maxFlips: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMaxConsecutiveOnesSteps({
      inputArray: [1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
      maxFlips: 2,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces only array kind visual states", () => {
    const steps = generateMaxConsecutiveOnesSteps({
      inputArray: [1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
      maxFlips: 2,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes expand-window steps equal to array length", () => {
    const inputArray = [1, 1, 0, 0, 1, 1, 1, 0, 1, 1];
    const steps = generateMaxConsecutiveOnesSteps({
      inputArray,
      maxFlips: 2,
    });
    const expandSteps = steps.filter((step) => step.type === "expand-window");
    expect(expandSteps.length).toBe(inputArray.length);
  });

  it("includes shrink-window steps when zero count exceeds maxFlips", () => {
    /* Third element is 0 and maxFlips=0 forces a shrink */
    const steps = generateMaxConsecutiveOnesSteps({
      inputArray: [1, 1, 0, 1],
      maxFlips: 0,
    });
    const shrinkSteps = steps.filter((step) => step.type === "shrink-window");
    expect(shrinkSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateMaxConsecutiveOnesSteps({
      inputArray: [],
      maxFlips: 2,
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateMaxConsecutiveOnesSteps({
      inputArray: [1, 1, 0, 0, 1, 1],
      maxFlips: 1,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("complete step contains maxLength in variables", () => {
    const steps = generateMaxConsecutiveOnesSteps({
      inputArray: [1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
      maxFlips: 2,
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("maxLength");
  });
});
