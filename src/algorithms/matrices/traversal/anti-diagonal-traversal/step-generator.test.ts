import { describe, it, expect } from "vitest";
import { generateAntiDiagonalTraversalSteps } from "./step-generator";

const DEFAULT_MATRIX = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

describe("generateAntiDiagonalTraversalSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateAntiDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateAntiDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateAntiDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateAntiDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateAntiDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits collect-element steps for every cell", () => {
    const steps = generateAntiDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    const collectSteps = steps.filter((step) => step.type === "collect-element");
    expect(collectSteps.length).toBe(9);
  });

  it("emits move-direction steps for each anti-diagonal", () => {
    const steps = generateAntiDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    const directionSteps = steps.filter((step) => step.type === "move-direction");
    // 3×3 matrix has 3+3-1 = 5 anti-diagonals
    expect(directionSteps.length).toBe(5);
  });

  it("final collected order matches expected anti-diagonal traversal", () => {
    const steps = generateAntiDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.collectedOrder).toEqual([1, 2, 4, 3, 5, 7, 6, 8, 9]);
    }
  });

  it("handles an empty matrix — returns only initialize and complete steps", () => {
    const steps = generateAntiDiagonalTraversalSteps({ matrix: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const collectSteps = steps.filter((step) => step.type === "collect-element");
    expect(collectSteps.length).toBe(0);
  });

  it("handles a single-row matrix with correct collected order", () => {
    const steps = generateAntiDiagonalTraversalSteps({ matrix: [[1, 2, 3]] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.collectedOrder).toEqual([1, 2, 3]);
    }
  });

  it("handles a 3x4 matrix with correct step count", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ];
    const steps = generateAntiDiagonalTraversalSteps({ matrix });
    const collectSteps = steps.filter((step) => step.type === "collect-element");
    expect(collectSteps.length).toBe(12);
  });
});
