import { describe, it, expect } from "vitest";
import { generateMovingAverageFromStreamSteps } from "./step-generator";

describe("generateMovingAverageFromStreamSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMovingAverageFromStreamSteps({ values: [1, 10, 3, 5], windowSize: 3 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMovingAverageFromStreamSteps({ values: [1, 10, 3, 5], windowSize: 3 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMovingAverageFromStreamSteps({ values: [1, 10, 3, 5], windowSize: 3 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateMovingAverageFromStreamSteps({ values: [1, 10, 3, 5], windowSize: 3 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMovingAverageFromStreamSteps({ values: [1, 10, 3, 5], windowSize: 3 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits one visit step per value", () => {
    const steps = generateMovingAverageFromStreamSteps({ values: [1, 10, 3, 5], windowSize: 3 });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps).toHaveLength(4);
  });

  it("emits one enqueue step per value", () => {
    const steps = generateMovingAverageFromStreamSteps({ values: [1, 10, 3, 5], windowSize: 3 });
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    expect(enqueueSteps).toHaveLength(4);
  });

  it("emits dequeue steps only when the window overflows", () => {
    // [1,10,3,5] with k=3 — overflow happens once (at value 5)
    const steps = generateMovingAverageFromStreamSteps({ values: [1, 10, 3, 5], windowSize: 3 });
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps).toHaveLength(1);
  });

  it("emits no dequeue steps when stream is shorter than window", () => {
    const steps = generateMovingAverageFromStreamSteps({ values: [1, 2], windowSize: 5 });
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps).toHaveLength(0);
  });

  it("emits a dequeue step for each element beyond the window", () => {
    // 6 values with k=2 — dequeue happens 4 times
    const steps = generateMovingAverageFromStreamSteps({
      values: [1, 2, 3, 4, 5, 6],
      windowSize: 2,
    });
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps).toHaveLength(4);
  });

  it("records windowSize and totalValues in the complete step variables", () => {
    const steps = generateMovingAverageFromStreamSteps({ values: [1, 10, 3, 5], windowSize: 3 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables).toMatchObject({ windowSize: 3, totalValues: 4 });
  });
});
