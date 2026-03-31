import { describe, it, expect } from "vitest";
import { generateDiagonalTraversalSteps } from "./step-generator";

const DEFAULT_MATRIX = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

describe("generateDiagonalTraversalSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("emits collect-element steps for every cell", () => {
    const steps = generateDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    const collectSteps = steps.filter((step) => step.type === "collect-element");
    expect(collectSteps.length).toBe(12);
  });

  it("emits move-direction steps for each diagonal", () => {
    const steps = generateDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    const directionSteps = steps.filter((step) => step.type === "move-direction");
    // 3 rows + 4 cols - 1 = 6 diagonals
    expect(directionSteps.length).toBe(6);
  });

  it("final collected order matches expected diagonal traversal", () => {
    const steps = generateDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.collectedOrder).toEqual([
        1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12,
      ]);
    }
  });

  it("handles empty matrix with initialize then complete", () => {
    const steps = generateDiagonalTraversalSteps({ matrix: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });

  it("handles a single row matrix with correct collected order", () => {
    const steps = generateDiagonalTraversalSteps({ matrix: [[1, 2, 3]] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.collectedOrder).toEqual([1, 2, 3]);
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateDiagonalTraversalSteps({ matrix: DEFAULT_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });
});
