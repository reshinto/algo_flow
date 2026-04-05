import { describe, it, expect } from "vitest";
import { generateInterleaveFirstHalfQueueSteps } from "./step-generator";

const DEFAULT_INPUT = { values: [1, 2, 3, 4, 5, 6] };

describe("generateInterleaveFirstHalfQueueSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits push steps for phase 1 and phase 4 (halfSize each)", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    const pushSteps = steps.filter((step) => step.type === "push");
    // halfSize = 3 pushes in phase 1, 3 pushes in phase 4
    expect(pushSteps.length).toBe(6);
  });

  it("emits pop steps during the interleave phase", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    const popSteps = steps.filter((step) => step.type === "pop");
    // Phase 2 emits 3 popFromStack steps (reversing first half back to queue)
    // Phase 5 emits 3 popFromStack steps (interleave) — total = 6
    expect(popSteps.length).toBe(6);
  });

  it("emits a single complete step", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    const completeSteps = steps.filter((step) => step.type === "complete");
    expect(completeSteps.length).toBe(1);
  });

  it("tracks queue operations in metrics", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.metrics.queueOperations).toBeGreaterThan(0);
  });

  it("handles a single-element input", () => {
    const steps = generateInterleaveFirstHalfQueueSteps({ values: [7] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles an empty input", () => {
    const steps = generateInterleaveFirstHalfQueueSteps({ values: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("complete step variables include values and result", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("values");
    expect(completeStep?.variables).toHaveProperty("result");
  });

  it("phase transitions are reflected in visual state phase field", () => {
    const steps = generateInterleaveFirstHalfQueueSteps(DEFAULT_INPUT);
    const phaseValues = steps
      .map((step) => (step.visualState as { phase?: string }).phase)
      .filter(Boolean);
    expect(phaseValues.length).toBeGreaterThan(0);
  });
});
