import { describe, it, expect } from "vitest";
import { generateImplementQueueUsingStacksSteps } from "../step-generator";
import type { StackQueueVisualState } from "@/types";

const DEFAULT_INPUT = { values: [1, 2, 3, 4, 5] };

describe("generateImplementQueueUsingStacksSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateImplementQueueUsingStacksSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateImplementQueueUsingStacksSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateImplementQueueUsingStacksSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateImplementQueueUsingStacksSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateImplementQueueUsingStacksSteps(DEFAULT_INPUT);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits one push step per input value", () => {
    const steps = generateImplementQueueUsingStacksSteps(DEFAULT_INPUT);
    const pushSteps = steps.filter((step) => step.type === "push");
    expect(pushSteps.length).toBe(DEFAULT_INPUT.values.length);
  });

  it("emits transfer steps equal to the number of values", () => {
    const steps = generateImplementQueueUsingStacksSteps(DEFAULT_INPUT);
    const transferSteps = steps.filter((step) => step.type === "transfer");
    expect(transferSteps.length).toBe(DEFAULT_INPUT.values.length);
  });

  it("emits one dequeue step per input value", () => {
    const steps = generateImplementQueueUsingStacksSteps(DEFAULT_INPUT);
    const dequeueSteps = steps.filter(
      (step) => step.type === "dequeue" || step.type === "dequeue-rear",
    );
    expect(dequeueSteps.length).toBe(DEFAULT_INPUT.values.length);
  });

  it("includes visit steps during the push phase", () => {
    const steps = generateImplementQueueUsingStacksSteps(DEFAULT_INPUT);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(DEFAULT_INPUT.values.length);
  });

  it("handles a single-value input without errors", () => {
    const steps = generateImplementQueueUsingStacksSteps({ values: [99] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("records dequeue results in FIFO order in the complete step variables", () => {
    const steps = generateImplementQueueUsingStacksSteps({ values: [10, 20, 30] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["dequeueResults"]).toEqual([10, 20, 30]);
  });

  it("shows the input stack populated after the push phase", () => {
    const steps = generateImplementQueueUsingStacksSteps({ values: [1, 2, 3] });
    // Last push step should show all values on the stack
    const pushSteps = steps.filter((step) => step.type === "push");
    const lastPushStep = pushSteps[pushSteps.length - 1]!;
    const visualState = lastPushStep.visualState as StackQueueVisualState;
    expect(visualState.stackElements.length).toBe(3);
  });

  it("shows input array in visual state", () => {
    const steps = generateImplementQueueUsingStacksSteps(DEFAULT_INPUT);
    const initialStep = steps[0]!;
    const visualState = initialStep.visualState as StackQueueVisualState;
    expect(visualState.inputArray).toBeDefined();
    expect(visualState.inputArray?.length).toBe(DEFAULT_INPUT.values.length);
  });
});
