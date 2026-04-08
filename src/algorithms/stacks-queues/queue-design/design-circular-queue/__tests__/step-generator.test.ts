import { describe, it, expect } from "vitest";
import { generateDesignCircularQueueSteps } from "../step-generator";
import type { StackQueueVisualState } from "@/types";

const DEFAULT_INPUT = {
  operations: ["enqueue 1", "enqueue 2", "dequeue", "enqueue 3"],
  capacity: 3,
};

describe("generateDesignCircularQueueSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes a circular buffer in every visual state", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    for (const step of steps) {
      const visualState = step.visualState as StackQueueVisualState;
      expect(visualState.circularBuffer).toBeDefined();
    }
  });

  it("circular buffer has the correct capacity", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    const initialStep = steps[0]!;
    const visualState = initialStep.visualState as StackQueueVisualState;
    expect(visualState.circularBuffer?.capacity).toBe(DEFAULT_INPUT.capacity);
  });

  it("emits one enqueue step per successful enqueue operation", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    // DEFAULT_INPUT has 3 enqueue operations all succeeding
    expect(enqueueSteps.length).toBe(3);
  });

  it("emits one dequeue step per successful dequeue operation", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps.length).toBe(1);
  });

  it("records results in the complete step variables", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["results"]).toEqual(["true", "true", "1", "true"]);
  });

  it("emits peek steps for full-queue enqueue attempts", () => {
    const fullQueueInput = {
      operations: ["enqueue 1", "enqueue 2", "enqueue 3", "enqueue 4"],
      capacity: 3,
    };
    const steps = generateDesignCircularQueueSteps(fullQueueInput);
    const peekSteps = steps.filter((step) => step.type === "peek");
    expect(peekSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("emits a peek step for dequeue-from-empty attempts", () => {
    const emptyDequeueInput = {
      operations: ["dequeue"],
      capacity: 3,
    };
    const steps = generateDesignCircularQueueSteps(emptyDequeueInput);
    const peekSteps = steps.filter((step) => step.type === "peek");
    expect(peekSteps.length).toBe(1);
  });

  it("handles a single-operation input without errors", () => {
    const singleOpInput = { operations: ["enqueue 42"], capacity: 2 };
    const steps = generateDesignCircularQueueSteps(singleOpInput);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("circular buffer rear index advances modularly on wrap-around", () => {
    const wrapInput = {
      operations: ["enqueue 1", "enqueue 2", "dequeue", "enqueue 3"],
      capacity: 2,
    };
    const steps = generateDesignCircularQueueSteps(wrapInput);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    const lastEnqueue = enqueueSteps[enqueueSteps.length - 1]!;
    const visualState = lastEnqueue.visualState as StackQueueVisualState;
    // After dequeue from slot 0 then enqueue again, rear should be at slot 0 (wrapped)
    expect(visualState.circularBuffer?.rearIndex).toBe(0);
  });

  it("capacity is set in initialize step variables", () => {
    const steps = generateDesignCircularQueueSteps(DEFAULT_INPUT);
    const initStep = steps[0]!;
    expect(initStep.variables["capacity"]).toBe(DEFAULT_INPUT.capacity);
  });
});
