import { describe, it, expect } from "vitest";
import { generateSetUnionSteps } from "./step-generator";

describe("generateSetUnionSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSetUnionSteps({
      arrayA: [1, 2, 3, 4, 5],
      arrayB: [3, 4, 5, 6, 7],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSetUnionSteps({ arrayA: [1, 2, 3], arrayB: [3, 4, 5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSetUnionSteps({ arrayA: [1, 2, 3], arrayB: [3, 4, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateSetUnionSteps({ arrayA: [1, 2, 3], arrayB: [3, 4, 5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSetUnionSteps({ arrayA: [1, 2, 3], arrayB: [3, 4, 5] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits add-to-set steps for each element of arrayA", () => {
    const steps = generateSetUnionSteps({ arrayA: [1, 2, 3], arrayB: [3, 4, 5] });
    const addSteps = steps.filter((step) => step.type === "add-to-set");
    expect(addSteps.length).toBe(3);
  });

  it("emits skip-element steps for elements already in the union from arrayB", () => {
    const steps = generateSetUnionSteps({ arrayA: [1, 2, 3], arrayB: [3, 4, 5] });
    const skipSteps = steps.filter((step) => step.type === "skip-element");
    expect(skipSteps.length).toBe(1);
  });

  it("emits add-to-result steps for new elements in arrayB", () => {
    const steps = generateSetUnionSteps({ arrayA: [1, 2, 3], arrayB: [3, 4, 5] });
    // arrayA contributes 3 add-to-result steps; arrayB contributes 2 (4 and 5)
    const addResultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(addResultSteps.length).toBe(5);
  });

  it("final result contains all unique elements", () => {
    const steps = generateSetUnionSteps({
      arrayA: [1, 2, 3, 4, 5],
      arrayB: [3, 4, 5, 6, 7],
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([1, 2, 3, 4, 5, 6, 7]);
    }
  });

  it("produces all elements when arrays are disjoint", () => {
    const steps = generateSetUnionSteps({ arrayA: [1, 3, 5], arrayB: [2, 4, 6] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([1, 3, 5, 2, 4, 6]);
    }
  });
});
