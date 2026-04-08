import { describe, it, expect } from "vitest";
import { generateSegmentTreeRangeMinSteps } from "../step-generator";

describe("generateSegmentTreeRangeMinSteps", () => {
  const defaultInput = {
    array: [2, 5, 1, 4, 9, 3],
    queries: [
      [0, 2],
      [3, 5],
    ] as [number, number][],
  };

  it("produces steps for default input", () => {
    const steps = generateSegmentTreeRangeMinSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSegmentTreeRangeMinSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSegmentTreeRangeMinSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states", () => {
    const steps = generateSegmentTreeRangeMinSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("produces build-node steps during construction", () => {
    const steps = generateSegmentTreeRangeMinSteps(defaultInput);
    const buildSteps = steps.filter((step) => step.type === "build-node");
    expect(buildSteps.length).toBeGreaterThan(0);
  });

  it("produces query-range steps", () => {
    const steps = generateSegmentTreeRangeMinSteps(defaultInput);
    const querySteps = steps.filter((step) => step.type === "query-range");
    expect(querySteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateSegmentTreeRangeMinSteps(defaultInput);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
