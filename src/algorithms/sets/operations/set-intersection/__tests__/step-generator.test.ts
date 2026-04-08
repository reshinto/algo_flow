import { describe, it, expect } from "vitest";
import { generateSetIntersectionSteps } from "../step-generator";

describe("generateSetIntersectionSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSetIntersectionSteps({
      arrayA: [1, 2, 3, 4, 5, 8],
      arrayB: [2, 4, 6, 8, 10],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSetIntersectionSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSetIntersectionSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateSetIntersectionSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSetIntersectionSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits add-to-set steps for each element of arrayA", () => {
    const steps = generateSetIntersectionSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    const addSteps = steps.filter((step) => step.type === "add-to-set");
    expect(addSteps.length).toBe(3);
  });

  it("emits member-found steps for each matching element", () => {
    const steps = generateSetIntersectionSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    const foundSteps = steps.filter((step) => step.type === "member-found");
    expect(foundSteps.length).toBe(2);
  });

  it("emits member-not-found steps for non-matching elements", () => {
    const steps = generateSetIntersectionSteps({ arrayA: [1, 2, 3], arrayB: [2, 3, 4] });
    const notFoundSteps = steps.filter((step) => step.type === "member-not-found");
    expect(notFoundSteps.length).toBe(1);
  });

  it("final result contains the correct intersection", () => {
    const steps = generateSetIntersectionSteps({
      arrayA: [1, 2, 3, 4, 5, 8],
      arrayB: [2, 4, 6, 8, 10],
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([2, 4, 8]);
    }
  });

  it("produces empty result when no elements are shared", () => {
    const steps = generateSetIntersectionSteps({ arrayA: [1, 3, 5], arrayB: [2, 4, 6] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.result).toEqual([]);
    }
  });
});
