import { describe, it, expect } from "vitest";
import { generateBinaryNumbersSteps } from "../step-generator";

const DEFAULT_INPUT = { count: 5 };

describe("generateBinaryNumbersSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateBinaryNumbersSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBinaryNumbersSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBinaryNumbersSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateBinaryNumbersSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateBinaryNumbersSteps(DEFAULT_INPUT);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits one dequeue step per count iteration", () => {
    const steps = generateBinaryNumbersSteps(DEFAULT_INPUT);
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps.length).toBe(DEFAULT_INPUT.count);
  });

  it("emits two enqueue steps per count iteration plus the initial seed enqueue", () => {
    const steps = generateBinaryNumbersSteps(DEFAULT_INPUT);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    // 1 seed + (count * 2) child enqueues
    expect(enqueueSteps.length).toBe(1 + DEFAULT_INPUT.count * 2);
  });

  it("emits a single complete step", () => {
    const steps = generateBinaryNumbersSteps(DEFAULT_INPUT);
    const completeSteps = steps.filter((step) => step.type === "complete");
    expect(completeSteps.length).toBe(1);
  });

  it("tracks queue operations in metrics", () => {
    const steps = generateBinaryNumbersSteps(DEFAULT_INPUT);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.metrics.queueOperations).toBeGreaterThan(0);
  });

  it("handles count = 1 with a single dequeue step", () => {
    const steps = generateBinaryNumbersSteps({ count: 1 });
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps.length).toBe(1);
  });

  it("handles count = 0 with only initialize and complete steps", () => {
    const steps = generateBinaryNumbersSteps({ count: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps.length).toBe(0);
  });

  it("variables in the complete step include count and result", () => {
    const steps = generateBinaryNumbersSteps(DEFAULT_INPUT);
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("count");
    expect(completeStep?.variables).toHaveProperty("result");
  });
});
