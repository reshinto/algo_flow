import { describe, it, expect } from "vitest";
import { generateBuildFromPostorderInorderSteps } from "../step-generator";

const defaultInput = {
  postorder: [1, 3, 2, 5, 7, 6, 4],
  inorder: [1, 2, 3, 4, 5, 6, 7],
};

describe("generateBuildFromPostorderInorderSteps", () => {
  it("produces steps for a 7-node tree", () => {
    const steps = generateBuildFromPostorderInorderSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBuildFromPostorderInorderSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBuildFromPostorderInorderSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states throughout", () => {
    const steps = generateBuildFromPostorderInorderSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("builds exactly 7 nodes", () => {
    const steps = generateBuildFromPostorderInorderSteps(defaultInput);
    const buildSteps = steps.filter((step) => step.type === "build-node");
    expect(buildSteps.length).toBe(7);
  });

  it("has incrementing step indices", () => {
    const steps = generateBuildFromPostorderInorderSteps(defaultInput);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles a single-element input", () => {
    const steps = generateBuildFromPostorderInorderSteps({ postorder: [1], inorder: [1] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
