import { describe, it, expect } from "vitest";
import { generateSupersetCheckSteps } from "./step-generator";

describe("generateSupersetCheckSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [2, 4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [2, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [2, 4] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [2, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [2, 4] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits add-to-set steps for each element of arrayA", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [2, 4] });
    const addSteps = steps.filter((step) => step.type === "add-to-set");
    expect(addSteps.length).toBe(5);
  });

  it("emits subset-pass steps when all elements of B are in A", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [2, 4] });
    const passSteps = steps.filter((step) => step.type === "subset-pass");
    expect(passSteps.length).toBe(2);
  });

  it("emits a subset-fail step when an element of B is missing from A", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [2, 9] });
    const failSteps = steps.filter((step) => step.type === "subset-fail");
    expect(failSteps.length).toBe(1);
  });

  it("reports isSuperset true in booleanResult when A ⊇ B", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [2, 4] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.booleanResult).toBe(true);
    }
  });

  it("reports isSuperset false in booleanResult when A ⊉ B", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [2, 9] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.booleanResult).toBe(false);
    }
  });

  it("returns true for empty arrayB (A is superset of the empty set)", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3], arrayB: [] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.booleanResult).toBe(true);
    }
  });

  it("exits early after first failing element", () => {
    const steps = generateSupersetCheckSteps({ arrayA: [1, 2, 3, 4, 5], arrayB: [9, 2, 4] });
    const failSteps = steps.filter((step) => step.type === "subset-fail");
    const passSteps = steps.filter((step) => step.type === "subset-pass");
    expect(failSteps.length).toBe(1);
    expect(passSteps.length).toBe(0);
  });
});
