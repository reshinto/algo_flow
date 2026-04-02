import { describe, it, expect } from "vitest";
import { generateSetDifferenceSteps } from "./step-generator";

describe("generateSetDifferenceSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSetDifferenceSteps({
      arrayA: [1, 2, 3, 4, 5],
      arrayB: [3, 4, 5, 6, 7],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSetDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSetDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateSetDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSetDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits add-to-set steps for each element of arrayB", () => {
    const steps = generateSetDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    const addSteps = steps.filter((step) => step.type === "add-to-set");
    expect(addSteps.length).toBe(3);
  });

  it("emits skip-element steps for elements shared with arrayB", () => {
    const steps = generateSetDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    const skipSteps = steps.filter((step) => step.type === "skip-element");
    expect(skipSteps.length).toBe(2);
  });

  it("emits add-to-result steps for elements exclusive to arrayA", () => {
    const steps = generateSetDifferenceSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    const addResultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(addResultSteps.length).toBe(1);
  });

  it("final result contains only elements exclusive to arrayA", () => {
    const steps = generateSetDifferenceSteps({
      arrayA: [1, 2, 3, 4, 5],
      arrayB: [3, 4, 5, 6, 7],
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([1, 2]);
    }
  });

  it("produces empty result when arrayA is a subset of arrayB", () => {
    const steps = generateSetDifferenceSteps({ arrayA: [2, 3], arrayB: [1, 2, 3, 4] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([]);
    }
  });
});
