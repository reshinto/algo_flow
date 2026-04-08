import { describe, it, expect } from "vitest";
import { generateSegmentTreeRangeSumSteps } from "../step-generator";

describe("generateSegmentTreeRangeSumSteps", () => {
  const defaultInput = {
    array: [1, 3, 5, 7, 9, 11],
    queries: [
      [1, 3],
      [0, 5],
    ] as [number, number][],
  };

  it("produces steps for default input", () => {
    const steps = generateSegmentTreeRangeSumSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSegmentTreeRangeSumSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSegmentTreeRangeSumSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states throughout", () => {
    const steps = generateSegmentTreeRangeSumSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("produces build-node steps during construction", () => {
    const steps = generateSegmentTreeRangeSumSteps(defaultInput);
    const buildSteps = steps.filter((step) => step.type === "build-node");
    expect(buildSteps.length).toBeGreaterThan(0);
  });

  it("produces query-range steps during queries", () => {
    const steps = generateSegmentTreeRangeSumSteps(defaultInput);
    const querySteps = steps.filter((step) => step.type === "query-range");
    expect(querySteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateSegmentTreeRangeSumSteps(defaultInput);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
