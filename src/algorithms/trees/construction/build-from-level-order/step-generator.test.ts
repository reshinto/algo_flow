import { describe, it, expect } from "vitest";
import { generateBuildFromLevelOrderSteps } from "./step-generator";

const defaultInput = {
  levelOrder: [4, 2, 6, 1, 3, 5, 7],
};

describe("generateBuildFromLevelOrderSteps", () => {
  it("produces steps for a 7-element input", () => {
    const steps = generateBuildFromLevelOrderSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBuildFromLevelOrderSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBuildFromLevelOrderSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states throughout", () => {
    const steps = generateBuildFromLevelOrderSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("builds exactly 7 nodes for 7 unique values", () => {
    const steps = generateBuildFromLevelOrderSteps(defaultInput);
    const buildSteps = steps.filter((step) => step.type === "build-node");
    expect(buildSteps.length).toBe(7);
  });

  it("has incrementing step indices", () => {
    const steps = generateBuildFromLevelOrderSteps(defaultInput);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles a single-element input", () => {
    const steps = generateBuildFromLevelOrderSteps({ levelOrder: [5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles an empty input", () => {
    const steps = generateBuildFromLevelOrderSteps({ levelOrder: [] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
