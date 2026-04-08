import { describe, it, expect } from "vitest";
import { generateDesignCircularDequeSteps } from "../step-generator";
import type { StackQueueVisualState } from "@/types";

const DEFAULT_INPUT = {
  operations: ["pushBack 1", "pushFront 2", "popBack", "pushBack 3"],
  capacity: 3,
};

describe("generateDesignCircularDequeSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateDesignCircularDequeSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDesignCircularDequeSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDesignCircularDequeSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateDesignCircularDequeSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateDesignCircularDequeSteps(DEFAULT_INPUT);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes a circular buffer in every visual state", () => {
    const steps = generateDesignCircularDequeSteps(DEFAULT_INPUT);
    for (const step of steps) {
      const visualState = step.visualState as StackQueueVisualState;
      expect(visualState.circularBuffer).toBeDefined();
    }
  });

  it("circular buffer has the correct capacity", () => {
    const steps = generateDesignCircularDequeSteps(DEFAULT_INPUT);
    const initialStep = steps[0]!;
    const visualState = initialStep.visualState as StackQueueVisualState;
    expect(visualState.circularBuffer?.capacity).toBe(DEFAULT_INPUT.capacity);
  });

  it("emits one enqueue step per successful pushBack operation", () => {
    const pushBackInput = {
      operations: ["pushBack 1", "pushBack 2", "pushBack 3"],
      capacity: 3,
    };
    const steps = generateDesignCircularDequeSteps(pushBackInput);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    expect(enqueueSteps.length).toBe(3);
  });

  it("emits one enqueue-front step per successful pushFront operation", () => {
    const pushFrontInput = {
      operations: ["pushBack 1", "pushFront 2"],
      capacity: 3,
    };
    const steps = generateDesignCircularDequeSteps(pushFrontInput);
    const enqueueFrontSteps = steps.filter((step) => step.type === "enqueue-front");
    expect(enqueueFrontSteps.length).toBe(1);
  });

  it("emits one dequeue step per successful popFront operation", () => {
    const popFrontInput = {
      operations: ["pushBack 1", "pushBack 2", "popFront"],
      capacity: 3,
    };
    const steps = generateDesignCircularDequeSteps(popFrontInput);
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps.length).toBe(1);
  });

  it("emits one dequeue-rear step per successful popBack operation", () => {
    const popBackInput = {
      operations: ["pushBack 1", "pushBack 2", "popBack"],
      capacity: 3,
    };
    const steps = generateDesignCircularDequeSteps(popBackInput);
    const dequeueRearSteps = steps.filter((step) => step.type === "dequeue-rear");
    expect(dequeueRearSteps.length).toBe(1);
  });

  it("records results in the complete step variables", () => {
    const steps = generateDesignCircularDequeSteps(DEFAULT_INPUT);
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["results"]).toEqual(["true", "true", "1", "true"]);
  });

  it("emits peek steps for full-deque push attempts", () => {
    const fullDequeInput = {
      operations: ["pushBack 1", "pushBack 2", "pushBack 3", "pushBack 4"],
      capacity: 3,
    };
    const steps = generateDesignCircularDequeSteps(fullDequeInput);
    const peekSteps = steps.filter((step) => step.type === "peek");
    expect(peekSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("emits a peek step for popFront-from-empty attempts", () => {
    const emptyPopInput = {
      operations: ["popFront"],
      capacity: 3,
    };
    const steps = generateDesignCircularDequeSteps(emptyPopInput);
    const peekSteps = steps.filter((step) => step.type === "peek");
    expect(peekSteps.length).toBe(1);
  });

  it("emits a peek step for popBack-from-empty attempts", () => {
    const emptyPopBackInput = {
      operations: ["popBack"],
      capacity: 3,
    };
    const steps = generateDesignCircularDequeSteps(emptyPopBackInput);
    const peekSteps = steps.filter((step) => step.type === "peek");
    expect(peekSteps.length).toBe(1);
  });

  it("handles a single-operation input without errors", () => {
    const singleOpInput = { operations: ["pushBack 42"], capacity: 2 };
    const steps = generateDesignCircularDequeSteps(singleOpInput);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("circular buffer rear index advances modularly on wrap-around for pushBack", () => {
    const wrapInput = {
      operations: ["pushBack 1", "pushBack 2", "popFront", "pushBack 3"],
      capacity: 2,
    };
    const steps = generateDesignCircularDequeSteps(wrapInput);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    const lastEnqueue = enqueueSteps[enqueueSteps.length - 1]!;
    const visualState = lastEnqueue.visualState as StackQueueVisualState;
    // After dequeue from slot 0 then pushBack again, rear should wrap to slot 0
    expect(visualState.circularBuffer?.rearIndex).toBe(0);
  });

  it("capacity is set in initialize step variables", () => {
    const steps = generateDesignCircularDequeSteps(DEFAULT_INPUT);
    const initStep = steps[0]!;
    expect(initStep.variables["capacity"]).toBe(DEFAULT_INPUT.capacity);
  });

  it("emits peek steps for peekFront and peekRear operations", () => {
    const peekInput = {
      operations: ["pushBack 5", "pushBack 10", "peekFront", "peekRear"],
      capacity: 3,
    };
    const steps = generateDesignCircularDequeSteps(peekInput);
    const peekSteps = steps.filter((step) => step.type === "peek");
    expect(peekSteps.length).toBe(2);
  });
});
