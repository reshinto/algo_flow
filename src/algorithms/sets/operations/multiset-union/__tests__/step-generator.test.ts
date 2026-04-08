import { describe, it, expect } from "vitest";
import { generateMultisetUnionSteps } from "../step-generator";

describe("generateMultisetUnionSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMultisetUnionSteps({
      arrayA: [1, 1, 2, 3, 3, 3],
      arrayB: [1, 1, 1, 2, 2, 3],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMultisetUnionSteps({ arrayA: [1, 2], arrayB: [2, 3] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMultisetUnionSteps({ arrayA: [1, 2], arrayB: [2, 3] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateMultisetUnionSteps({ arrayA: [1, 2], arrayB: [2, 3] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMultisetUnionSteps({ arrayA: [1, 2], arrayB: [2, 3] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits count-element steps for every element in arrayA and arrayB", () => {
    const steps = generateMultisetUnionSteps({ arrayA: [1, 1, 2], arrayB: [1, 2, 2] });
    const countSteps = steps.filter((step) => step.type === "count-element");
    expect(countSteps.length).toBe(6); // 3 from A + 3 from B
  });

  it("emits compare-count steps for each unique element", () => {
    const steps = generateMultisetUnionSteps({ arrayA: [1, 2], arrayB: [2, 3] });
    const compareSteps = steps.filter((step) => step.type === "compare-count");
    expect(compareSteps.length).toBe(3); // unique elements: 1, 2, 3
  });

  it("emits add-to-result steps equal to the total bag union size", () => {
    // A=[1,1,2], B=[1,2,2] → union: 1×max(2,1)=2, 2×max(1,2)=2 → 4 copies
    const steps = generateMultisetUnionSteps({ arrayA: [1, 1, 2], arrayB: [1, 2, 2] });
    const addResultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(addResultSteps.length).toBe(4);
  });

  it("final result contains the correct multiset union", () => {
    const steps = generateMultisetUnionSteps({
      arrayA: [1, 1, 2, 3, 3, 3],
      arrayB: [1, 1, 1, 2, 2, 3],
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([1, 1, 1, 2, 2, 3, 3, 3]);
    }
  });

  it("produces empty result when both arrays are empty", () => {
    const steps = generateMultisetUnionSteps({ arrayA: [], arrayB: [] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([]);
    }
  });
});
