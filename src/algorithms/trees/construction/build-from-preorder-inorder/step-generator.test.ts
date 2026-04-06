import { describe, it, expect } from "vitest";
import { generateBuildFromPreorderInorderSteps } from "./step-generator";

const defaultInput = {
  preorder: [4, 2, 1, 3, 6, 5, 7],
  inorder: [1, 2, 3, 4, 5, 6, 7],
};

describe("generateBuildFromPreorderInorderSteps", () => {
  it("produces steps for a 7-node tree", () => {
    const steps = generateBuildFromPreorderInorderSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBuildFromPreorderInorderSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBuildFromPreorderInorderSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states throughout", () => {
    const steps = generateBuildFromPreorderInorderSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("builds exactly 7 nodes", () => {
    const steps = generateBuildFromPreorderInorderSteps(defaultInput);
    const buildSteps = steps.filter((step) => step.type === "build-node");
    expect(buildSteps.length).toBe(7);
  });

  it("has incrementing step indices", () => {
    const steps = generateBuildFromPreorderInorderSteps(defaultInput);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles a single-element input", () => {
    const steps = generateBuildFromPreorderInorderSteps({ preorder: [1], inorder: [1] });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
