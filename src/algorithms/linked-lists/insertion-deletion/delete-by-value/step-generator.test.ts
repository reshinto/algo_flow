import { describe, it, expect } from "vitest";
import { generateDeleteByValueSteps } from "./step-generator";

describe("generateDeleteByValueSteps", () => {
  it("produces steps for a 5-element list deleting value 3", () => {
    const steps = generateDeleteByValueSteps({
      values: [1, 2, 3, 4, 5],
      target: 3,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDeleteByValueSteps({
      values: [1, 2, 3, 4, 5],
      target: 3,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDeleteByValueSteps({
      values: [1, 2, 3, 4, 5],
      target: 3,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces linked-list visual states throughout", () => {
    const steps = generateDeleteByValueSteps({
      values: [1, 2, 3, 4, 5],
      target: 3,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("linked-list");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateDeleteByValueSteps({
      values: [1, 2, 3, 4, 5],
      target: 3,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("includes at least one delete-node step when target is found", () => {
    const steps = generateDeleteByValueSteps({
      values: [1, 2, 3, 4, 5],
      target: 3,
    });
    const deleteSteps = steps.filter((step) => step.type === "delete-node");
    expect(deleteSteps.length).toBeGreaterThan(0);
  });

  it("handles deletion at the head of the list", () => {
    const steps = generateDeleteByValueSteps({
      values: [1, 2, 3],
      target: 1,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles deletion of a non-existent value", () => {
    const steps = generateDeleteByValueSteps({
      values: [1, 2, 3],
      target: 99,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles deletion from an empty list", () => {
    const steps = generateDeleteByValueSteps({
      values: [],
      target: 5,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles deletion from a single-element list", () => {
    const steps = generateDeleteByValueSteps({
      values: [7],
      target: 7,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
