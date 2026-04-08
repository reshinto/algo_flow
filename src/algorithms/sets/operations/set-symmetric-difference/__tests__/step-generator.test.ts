import { describe, it, expect } from "vitest";
import { generateSetSymmetricDifferenceSteps } from "../step-generator";

describe("generateSetSymmetricDifferenceSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSetSymmetricDifferenceSteps({
      arrayA: [1, 2, 3, 4],
      arrayB: [3, 4, 5, 6],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSetSymmetricDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSetSymmetricDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateSetSymmetricDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSetSymmetricDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits add-to-set steps for each element of arrayA", () => {
    const steps = generateSetSymmetricDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    const addSteps = steps.filter((step) => step.type === "add-to-set");
    expect(addSteps.length).toBe(3);
  });

  it("emits skip-element steps for common elements encountered in arrayB", () => {
    const steps = generateSetSymmetricDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    const skipSteps = steps.filter((step) => step.type === "skip-element");
    expect(skipSteps.length).toBe(2);
  });

  it("emits add-to-result steps for B-only and A-only elements", () => {
    const steps = generateSetSymmetricDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    // B-only: 4; A-only: 1 → total 2
    const addResultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(addResultSteps.length).toBe(2);
  });

  it("final result contains only elements exclusive to each array", () => {
    const steps = generateSetSymmetricDifferenceSteps({
      arrayA: [1, 2, 3, 4],
      arrayB: [3, 4, 5, 6],
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      const sortedResult = [...completeStep.visualState.result].sort((numA, numB) => numA - numB);
      expect(sortedResult).toEqual([1, 2, 5, 6]);
    }
  });

  it("produces empty result when arrays are identical", () => {
    const steps = generateSetSymmetricDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [1, 2, 3] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([]);
    }
  });

  it("returns all elements when arrays are disjoint", () => {
    const steps = generateSetSymmetricDifferenceSteps({ arrayA: [1, 3], arrayB: [2, 4] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      const sortedResult = [...completeStep.visualState.result].sort((numA, numB) => numA - numB);
      expect(sortedResult).toEqual([1, 2, 3, 4]);
    }
  });
});
