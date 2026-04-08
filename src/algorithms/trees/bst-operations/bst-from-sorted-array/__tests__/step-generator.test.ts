import { describe, it, expect } from "vitest";
import { generateBstFromSortedArraySteps } from "../step-generator";

describe("generateBstFromSortedArraySteps", () => {
  it("produces steps for a sorted array", () => {
    const steps = generateBstFromSortedArraySteps({ sortedArray: [1, 2, 3, 4, 5, 6, 7] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with initialize", () => {
    const steps = generateBstFromSortedArraySteps({ sortedArray: [1, 2, 3, 4, 5, 6, 7] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with complete", () => {
    const steps = generateBstFromSortedArraySteps({ sortedArray: [1, 2, 3, 4, 5, 6, 7] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states", () => {
    const steps = generateBstFromSortedArraySteps({ sortedArray: [1, 2, 3, 4, 5, 6, 7] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("inserts n nodes for array of length n", () => {
    const steps = generateBstFromSortedArraySteps({ sortedArray: [1, 2, 3] });
    const insertSteps = steps.filter((step) => step.type === "insert-child");
    expect(insertSteps.length).toBe(3);
  });

  it("has incrementing indices", () => {
    const steps = generateBstFromSortedArraySteps({ sortedArray: [1, 2, 3, 4, 5] });
    for (let idx = 0; idx < steps.length; idx++) {
      expect(steps[idx]?.index).toBe(idx);
    }
  });
});
