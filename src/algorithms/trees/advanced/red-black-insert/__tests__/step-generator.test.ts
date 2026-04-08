import { describe, it, expect } from "vitest";
import { generateRedBlackInsertSteps } from "../step-generator";

describe("generateRedBlackInsertSteps", () => {
  const defaultInput = { values: [7, 3, 18, 10, 22, 8, 11, 26] };

  it("produces steps for default input", () => {
    const steps = generateRedBlackInsertSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRedBlackInsertSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRedBlackInsertSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states throughout", () => {
    const steps = generateRedBlackInsertSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("produces recolor steps", () => {
    const steps = generateRedBlackInsertSteps(defaultInput);
    const recolorSteps = steps.filter((step) => step.type === "recolor-node");
    expect(recolorSteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateRedBlackInsertSteps(defaultInput);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("produces insert-child steps for each value", () => {
    const steps = generateRedBlackInsertSteps(defaultInput);
    const insertSteps = steps.filter((step) => step.type === "insert-child");
    expect(insertSteps.length).toBe(defaultInput.values.length);
  });
});
