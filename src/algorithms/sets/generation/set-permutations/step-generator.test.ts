import { describe, it, expect } from "vitest";
import { generateSetPermutationsSteps } from "./step-generator";

describe("generateSetPermutationsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSetPermutationsSteps({ elements: [1, 2, 3] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSetPermutationsSteps({ elements: [1, 2, 3] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSetPermutationsSteps({ elements: [1, 2, 3] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateSetPermutationsSteps({ elements: [1, 2, 3] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSetPermutationsSteps({ elements: [1, 2, 3] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits exactly n! generate-permutation steps for [1,2,3]", () => {
    const steps = generateSetPermutationsSteps({ elements: [1, 2, 3] });
    const permutationSteps = steps.filter((step) => step.type === "generate-permutation");
    expect(permutationSteps.length).toBe(6);
  });

  it("emits exactly 2 generate-permutation steps for [1,2]", () => {
    const steps = generateSetPermutationsSteps({ elements: [1, 2] });
    const permutationSteps = steps.filter((step) => step.type === "generate-permutation");
    expect(permutationSteps.length).toBe(2);
  });

  it("emits exactly 1 generate-permutation step for a single element", () => {
    const steps = generateSetPermutationsSteps({ elements: [42] });
    const permutationSteps = steps.filter((step) => step.type === "generate-permutation");
    expect(permutationSteps.length).toBe(1);
  });

  it("accumulates all permutations in the final complete step", () => {
    const steps = generateSetPermutationsSteps({ elements: [1, 2, 3] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.generatedSets).toHaveLength(6);
    }
  });

  it("emits backtrack steps during recursive unwinding", () => {
    const steps = generateSetPermutationsSteps({ elements: [1, 2, 3] });
    const backtrackSteps = steps.filter((step) => step.type === "backtrack");
    expect(backtrackSteps.length).toBeGreaterThan(0);
  });

  it("handles empty elements array without error", () => {
    const steps = generateSetPermutationsSteps({ elements: [] });
    expect(steps.length).toBeGreaterThan(0);
  });
});
