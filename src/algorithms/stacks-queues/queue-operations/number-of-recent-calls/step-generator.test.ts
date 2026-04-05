import { describe, it, expect } from "vitest";
import { generateNumberOfRecentCallsSteps } from "./step-generator";

const DEFAULT_INPUT = { timestamps: [1, 100, 3001, 3002] };

describe("generateNumberOfRecentCallsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateNumberOfRecentCallsSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateNumberOfRecentCallsSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateNumberOfRecentCallsSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateNumberOfRecentCallsSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateNumberOfRecentCallsSteps(DEFAULT_INPUT);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits one visit step per timestamp", () => {
    const steps = generateNumberOfRecentCallsSteps(DEFAULT_INPUT);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(DEFAULT_INPUT.timestamps.length);
  });

  it("emits one enqueue step per timestamp", () => {
    const steps = generateNumberOfRecentCallsSteps(DEFAULT_INPUT);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    expect(enqueueSteps.length).toBe(DEFAULT_INPUT.timestamps.length);
  });

  it("emits a dequeue step when a timestamp expires", () => {
    // timestamp=1 expires at t=3002 (1 < 3002-3000 = 2)
    const steps = generateNumberOfRecentCallsSteps(DEFAULT_INPUT);
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps.length).toBe(1);
  });

  it("emits one complete step per timestamp", () => {
    const steps = generateNumberOfRecentCallsSteps(DEFAULT_INPUT);
    const completeSteps = steps.filter((step) => step.type === "complete");
    expect(completeSteps.length).toBe(DEFAULT_INPUT.timestamps.length);
  });

  it("handles an empty timestamps array", () => {
    const steps = generateNumberOfRecentCallsSteps({ timestamps: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps.length).toBe(1);
  });

  it("emits no dequeue steps when all timestamps fit in the window", () => {
    const steps = generateNumberOfRecentCallsSteps({ timestamps: [1, 500, 1000, 2000] });
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps.length).toBe(0);
  });

  it("tracks queue operations in metrics", () => {
    const steps = generateNumberOfRecentCallsSteps(DEFAULT_INPUT);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.metrics.queueOperations).toBeGreaterThan(0);
  });
});
