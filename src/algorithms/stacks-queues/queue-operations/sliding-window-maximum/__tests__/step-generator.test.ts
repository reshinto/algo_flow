import { describe, it, expect } from "vitest";
import { generateSlidingWindowMaximumSteps } from "../step-generator";

const DEFAULT_INPUT = { nums: [1, 3, -1, -3, 5, 3, 6, 7], windowSize: 3 };

describe("generateSlidingWindowMaximumSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSlidingWindowMaximumSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSlidingWindowMaximumSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSlidingWindowMaximumSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateSlidingWindowMaximumSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSlidingWindowMaximumSteps(DEFAULT_INPUT);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits a visit step for each element", () => {
    const steps = generateSlidingWindowMaximumSteps(DEFAULT_INPUT);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(DEFAULT_INPUT.nums.length);
  });

  it("emits peek steps equal to the number of windows", () => {
    const steps = generateSlidingWindowMaximumSteps(DEFAULT_INPUT);
    const peekSteps = steps.filter((step) => step.type === "peek");
    const expectedWindowCount = DEFAULT_INPUT.nums.length - DEFAULT_INPUT.windowSize + 1;
    expect(peekSteps.length).toBe(expectedWindowCount);
  });

  it("records the correct window maxima in complete step variables", () => {
    const steps = generateSlidingWindowMaximumSteps(DEFAULT_INPUT);
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toEqual([3, 3, 5, 5, 6, 7]);
  });

  it("emits enqueue steps equal to the number of elements", () => {
    const steps = generateSlidingWindowMaximumSteps(DEFAULT_INPUT);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    expect(enqueueSteps.length).toBe(DEFAULT_INPUT.nums.length);
  });
});
