import { describe, it, expect } from "vitest";
import { generateBinaryIndexedTreeSteps } from "../step-generator";

describe("generateBinaryIndexedTreeSteps", () => {
  const defaultInput = {
    array: [3, 2, 4, 5, 1, 1, 5, 3],
    queries: [
      [0, 4],
      [2, 6],
    ] as [number, number][],
  };

  it("produces steps for default input", () => {
    const steps = generateBinaryIndexedTreeSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBinaryIndexedTreeSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBinaryIndexedTreeSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states", () => {
    const steps = generateBinaryIndexedTreeSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("produces compute-prefix steps during queries", () => {
    const steps = generateBinaryIndexedTreeSteps(defaultInput);
    const prefixSteps = steps.filter((step) => step.type === "compute-prefix");
    expect(prefixSteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateBinaryIndexedTreeSteps(defaultInput);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
