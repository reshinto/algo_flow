import { describe, it, expect } from "vitest";
import { generateAvlInsertRotationSteps } from "./step-generator";

describe("generateAvlInsertRotationSteps", () => {
  const defaultInput = { values: [10, 20, 30, 25, 28, 27] };

  it("produces steps for default input", () => {
    const steps = generateAvlInsertRotationSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateAvlInsertRotationSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateAvlInsertRotationSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states throughout", () => {
    const steps = generateAvlInsertRotationSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("produces rotation steps for a sequence that triggers rotations", () => {
    const steps = generateAvlInsertRotationSteps(defaultInput);
    const rotationSteps = steps.filter(
      (step) => step.type === "rotate-left" || step.type === "rotate-right",
    );
    expect(rotationSteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateAvlInsertRotationSteps(defaultInput);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("produces insert steps for each inserted value", () => {
    const steps = generateAvlInsertRotationSteps(defaultInput);
    const insertSteps = steps.filter((step) => step.type === "insert-child");
    expect(insertSteps.length).toBe(defaultInput.values.length);
  });
});
