import { describe, it, expect } from "vitest";
import { generateSubsetCheckSteps } from "./step-generator";

describe("generateSubsetCheckSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [2, 4], arrayB: [1, 2, 3, 4, 5] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [2, 4], arrayB: [1, 2, 3, 4, 5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [2, 4], arrayB: [1, 2, 3, 4, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [2, 4], arrayB: [1, 2, 3, 4, 5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [2, 4], arrayB: [1, 2, 3, 4, 5] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits add-to-set steps for each element of arrayB", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [2, 4], arrayB: [1, 2, 3, 4, 5] });
    const addSteps = steps.filter((step) => step.type === "add-to-set");
    expect(addSteps.length).toBe(5);
  });

  it("emits subset-pass steps when all elements of A are in B", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [2, 4], arrayB: [1, 2, 3, 4, 5] });
    const passSteps = steps.filter((step) => step.type === "subset-pass");
    expect(passSteps.length).toBe(2);
  });

  it("emits a subset-fail step when an element of A is missing from B", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [2, 9], arrayB: [1, 2, 3, 4, 5] });
    const failSteps = steps.filter((step) => step.type === "subset-fail");
    expect(failSteps.length).toBe(1);
  });

  it("reports isSubset true in booleanResult when A ⊆ B", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [2, 4], arrayB: [1, 2, 3, 4, 5] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.booleanResult).toBe(true);
    }
  });

  it("reports isSubset false in booleanResult when A ⊄ B", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [2, 9], arrayB: [1, 2, 3, 4, 5] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.booleanResult).toBe(false);
    }
  });

  it("returns true for empty arrayA (empty set is subset of any set)", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [], arrayB: [1, 2, 3] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.booleanResult).toBe(true);
    }
  });

  it("exits early after first failing element (no further subset-pass steps)", () => {
    const steps = generateSubsetCheckSteps({ arrayA: [9, 2, 4], arrayB: [1, 2, 3, 4, 5] });
    const failSteps = steps.filter((step) => step.type === "subset-fail");
    const passSteps = steps.filter((step) => step.type === "subset-pass");
    expect(failSteps.length).toBe(1);
    expect(passSteps.length).toBe(0);
  });
});
