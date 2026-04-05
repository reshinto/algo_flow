import { describe, it, expect } from "vitest";
import { generateFlattenNestedListIteratorSteps } from "./step-generator";

const DEFAULT_INPUT = {
  nestedList: [[1, [2]], 3, [4, [5, 6]]] as (number | (number | number[])[])[],
};

describe("generateFlattenNestedListIteratorSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFlattenNestedListIteratorSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFlattenNestedListIteratorSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFlattenNestedListIteratorSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateFlattenNestedListIteratorSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFlattenNestedListIteratorSteps(DEFAULT_INPUT);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits one enqueue step per integer in the flattened result", () => {
    const steps = generateFlattenNestedListIteratorSteps(DEFAULT_INPUT);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    // [[1,[2]],3,[4,[5,6]]] → [1,2,3,4,5,6] — 6 integers
    expect(enqueueSteps.length).toBe(6);
  });

  it("emits a single complete step", () => {
    const steps = generateFlattenNestedListIteratorSteps(DEFAULT_INPUT);
    const completeSteps = steps.filter((step) => step.type === "complete");
    expect(completeSteps.length).toBe(1);
  });

  it("tracks queue operations in metrics", () => {
    const steps = generateFlattenNestedListIteratorSteps(DEFAULT_INPUT);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.metrics.queueOperations).toBeGreaterThan(0);
  });

  it("handles an empty input with only initialize and complete steps", () => {
    const steps = generateFlattenNestedListIteratorSteps({ nestedList: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    expect(enqueueSteps.length).toBe(0);
  });

  it("handles a flat list with one integer", () => {
    const steps = generateFlattenNestedListIteratorSteps({ nestedList: [42] });
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    expect(enqueueSteps.length).toBe(1);
  });

  it("variables in the complete step include result", () => {
    const steps = generateFlattenNestedListIteratorSteps(DEFAULT_INPUT);
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("result");
  });

  it("complete step description contains the flattened values", () => {
    const steps = generateFlattenNestedListIteratorSteps(DEFAULT_INPUT);
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.description).toContain("1");
    expect(completeStep?.description).toContain("6");
  });
});
