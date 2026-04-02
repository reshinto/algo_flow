import { describe, it, expect } from "vitest";
import { generateSetComplementSteps } from "./step-generator";

describe("generateSetComplementSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSetComplementSteps({
      arrayA: [2, 4, 6],
      universalSet: [1, 2, 3, 4, 5, 6, 7, 8],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSetComplementSteps({ arrayA: [1, 2], universalSet: [1, 2, 3] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSetComplementSteps({ arrayA: [1, 2], universalSet: [1, 2, 3] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateSetComplementSteps({ arrayA: [1, 2], universalSet: [1, 2, 3] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSetComplementSteps({ arrayA: [1, 2], universalSet: [1, 2, 3] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits add-to-set steps for each element of arrayA", () => {
    const steps = generateSetComplementSteps({
      arrayA: [2, 4, 6],
      universalSet: [1, 2, 3, 4, 5, 6],
    });
    const addSteps = steps.filter((step) => step.type === "add-to-set");
    expect(addSteps.length).toBe(3);
  });

  it("emits add-to-result steps for elements in universalSet not in arrayA", () => {
    const steps = generateSetComplementSteps({ arrayA: [2, 4], universalSet: [1, 2, 3, 4, 5] });
    const addResultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(addResultSteps.length).toBe(3); // 1, 3, 5
  });

  it("emits skip-element steps for elements in universalSet that are in arrayA", () => {
    const steps = generateSetComplementSteps({ arrayA: [2, 4], universalSet: [1, 2, 3, 4, 5] });
    const skipSteps = steps.filter((step) => step.type === "skip-element");
    expect(skipSteps.length).toBe(2); // 2, 4
  });

  it("final result contains the correct complement", () => {
    const steps = generateSetComplementSteps({
      arrayA: [2, 4, 6],
      universalSet: [1, 2, 3, 4, 5, 6, 7, 8],
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([1, 3, 5, 7, 8]);
    }
  });

  it("produces empty result when arrayA covers all universalSet elements", () => {
    const steps = generateSetComplementSteps({ arrayA: [1, 2, 3], universalSet: [1, 2, 3] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([]);
    }
  });

  it("produces full universalSet as result when arrayA is empty", () => {
    const steps = generateSetComplementSteps({ arrayA: [], universalSet: [1, 2, 3] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([1, 2, 3]);
    }
  });
});
