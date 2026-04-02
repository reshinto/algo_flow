import { describe, it, expect } from "vitest";
import { generateSetEqualitySteps } from "./step-generator";

describe("generateSetEqualitySteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSetEqualitySteps({ arrayA: [3, 1, 2], arrayB: [2, 3, 1] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSetEqualitySteps({ arrayA: [3, 1, 2], arrayB: [2, 3, 1] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSetEqualitySteps({ arrayA: [3, 1, 2], arrayB: [2, 3, 1] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateSetEqualitySteps({ arrayA: [3, 1, 2], arrayB: [2, 3, 1] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSetEqualitySteps({ arrayA: [3, 1, 2], arrayB: [2, 3, 1] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits add-to-set steps for each element of arrayA", () => {
    const steps = generateSetEqualitySteps({ arrayA: [3, 1, 2], arrayB: [2, 3, 1] });
    const addSteps = steps.filter((step) => step.type === "add-to-set");
    expect(addSteps.length).toBe(3);
  });

  it("emits subset-pass steps for each element of B found in A", () => {
    const steps = generateSetEqualitySteps({ arrayA: [3, 1, 2], arrayB: [2, 3, 1] });
    const passSteps = steps.filter((step) => step.type === "subset-pass");
    expect(passSteps.length).toBe(3);
  });

  it("emits a subset-fail step when an element of B is missing from A", () => {
    const steps = generateSetEqualitySteps({ arrayA: [1, 2, 3], arrayB: [2, 9] });
    const failSteps = steps.filter((step) => step.type === "subset-fail");
    expect(failSteps.length).toBe(1);
  });

  it("reports isEqual true in booleanResult for equal sets", () => {
    const steps = generateSetEqualitySteps({ arrayA: [3, 1, 2], arrayB: [2, 3, 1] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.booleanResult).toBe(true);
    }
  });

  it("reports isEqual false when B has an element not in A", () => {
    const steps = generateSetEqualitySteps({ arrayA: [1, 2, 3], arrayB: [2, 9] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.booleanResult).toBe(false);
    }
  });

  it("reports isEqual false when A is a proper superset of B (A has extra elements)", () => {
    const steps = generateSetEqualitySteps({ arrayA: [1, 2, 3, 4], arrayB: [1, 2, 3] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.booleanResult).toBe(false);
    }
  });

  it("returns true for two empty arrays", () => {
    const steps = generateSetEqualitySteps({ arrayA: [], arrayB: [] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.booleanResult).toBe(true);
    }
  });

  it("exits early after first failing element", () => {
    const steps = generateSetEqualitySteps({ arrayA: [1, 2, 3], arrayB: [9, 1, 2] });
    const failSteps = steps.filter((step) => step.type === "subset-fail");
    const passSteps = steps.filter((step) => step.type === "subset-pass");
    expect(failSteps.length).toBe(1);
    expect(passSteps.length).toBe(0);
  });
});
