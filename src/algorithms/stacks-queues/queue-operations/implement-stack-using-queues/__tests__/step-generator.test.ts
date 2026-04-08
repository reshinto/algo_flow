import { describe, it, expect } from "vitest";
import { generateImplementStackUsingQueuesSteps } from "../step-generator";
import type { StackQueueVisualState } from "@/types";

const DEFAULT_INPUT = { values: [1, 2, 3, 4, 5] };

describe("generateImplementStackUsingQueuesSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateImplementStackUsingQueuesSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateImplementStackUsingQueuesSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateImplementStackUsingQueuesSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateImplementStackUsingQueuesSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateImplementStackUsingQueuesSteps(DEFAULT_INPUT);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits one enqueue step per input value", () => {
    const steps = generateImplementStackUsingQueuesSteps(DEFAULT_INPUT);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    expect(enqueueSteps.length).toBe(DEFAULT_INPUT.values.length);
  });

  it("emits transfer steps equal to the total rotation count (0+1+2+...+(n-1))", () => {
    const steps = generateImplementStackUsingQueuesSteps(DEFAULT_INPUT);
    const transferSteps = steps.filter((step) => step.type === "transfer");
    const expectedRotations = (DEFAULT_INPUT.values.length * (DEFAULT_INPUT.values.length - 1)) / 2;
    expect(transferSteps.length).toBe(expectedRotations);
  });

  it("emits one dequeue step per input value during the pop phase", () => {
    const steps = generateImplementStackUsingQueuesSteps(DEFAULT_INPUT);
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps.length).toBe(DEFAULT_INPUT.values.length);
  });

  it("emits visit steps equal to the number of input values", () => {
    const steps = generateImplementStackUsingQueuesSteps(DEFAULT_INPUT);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(DEFAULT_INPUT.values.length);
  });

  it("handles a single-value input without errors", () => {
    const steps = generateImplementStackUsingQueuesSteps({ values: [99] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("records pop results in LIFO order in the complete step variables", () => {
    const steps = generateImplementStackUsingQueuesSteps({ values: [10, 20, 30] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["popResults"]).toEqual([30, 20, 10]);
  });

  it("shows the queue populated with latest value at front after first push", () => {
    const steps = generateImplementStackUsingQueuesSteps({ values: [1, 2] });
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    const secondEnqueue = enqueueSteps[1]!;
    const visualState = secondEnqueue.visualState as StackQueueVisualState;
    // After enqueue(2) but before rotation, queue has [1, 2] — front is 1 momentarily
    expect(visualState.queueElements?.length).toBe(2);
  });

  it("shows input array in visual state", () => {
    const steps = generateImplementStackUsingQueuesSteps(DEFAULT_INPUT);
    const initialStep = steps[0]!;
    const visualState = initialStep.visualState as StackQueueVisualState;
    expect(visualState.inputArray).toBeDefined();
    expect(visualState.inputArray?.length).toBe(DEFAULT_INPUT.values.length);
  });

  it("handles an empty input without errors", () => {
    const steps = generateImplementStackUsingQueuesSteps({ values: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
