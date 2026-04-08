import { describe, it, expect } from "vitest";
import { generateZigzagTraversalSteps } from "../step-generator";

const DEFAULT_MATRIX = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

describe("generateZigzagTraversalSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateZigzagTraversalSteps({ matrix: DEFAULT_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateZigzagTraversalSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateZigzagTraversalSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateZigzagTraversalSteps({ matrix: DEFAULT_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateZigzagTraversalSteps({ matrix: DEFAULT_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits collect-element steps for every cell in the 3x3 matrix", () => {
    const steps = generateZigzagTraversalSteps({ matrix: DEFAULT_MATRIX });
    const collectSteps = steps.filter((step) => step.type === "collect-element");
    expect(collectSteps.length).toBe(9);
  });

  it("emits move-direction steps (one per diagonal)", () => {
    const steps = generateZigzagTraversalSteps({ matrix: DEFAULT_MATRIX });
    const directionSteps = steps.filter((step) => step.type === "move-direction");
    // 3x3 matrix has 3+3-1=5 diagonals
    expect(directionSteps.length).toBe(5);
  });

  it("final collected order matches expected zigzag result", () => {
    const steps = generateZigzagTraversalSteps({ matrix: DEFAULT_MATRIX });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.collectedOrder).toEqual([1, 2, 4, 7, 5, 3, 6, 8, 9]);
    }
  });

  it("handles empty matrix with only initialize and complete steps", () => {
    const steps = generateZigzagTraversalSteps({ matrix: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });

  it("handles a single row matrix", () => {
    const steps = generateZigzagTraversalSteps({ matrix: [[1, 2, 3]] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.collectedOrder).toEqual([1, 2, 3]);
    }
  });

  it("handles a single column matrix", () => {
    const steps = generateZigzagTraversalSteps({ matrix: [[1], [2], [3]] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.collectedOrder).toEqual([1, 2, 3]);
    }
  });

  it("alternates direction between diagonal-up and diagonal-down", () => {
    const steps = generateZigzagTraversalSteps({ matrix: DEFAULT_MATRIX });
    const directionSteps = steps.filter((step) => step.type === "move-direction");
    const directions = directionSteps.map((step) => {
      if (step.visualState.kind === "matrix") return step.visualState.direction;
      return null;
    });
    // Even diagonals: diagonal-up, odd: diagonal-down
    expect(directions[0]).toBe("diagonal-up");
    expect(directions[1]).toBe("diagonal-down");
    expect(directions[2]).toBe("diagonal-up");
  });
});
