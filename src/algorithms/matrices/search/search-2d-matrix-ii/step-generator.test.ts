import { describe, it, expect } from "vitest";
import { generateSearch2DMatrixIISteps } from "./step-generator";

const DEFAULT_MATRIX = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
];

describe("generateSearch2DMatrixIISteps", () => {
  it("produces steps for a found target", () => {
    const steps = generateSearch2DMatrixIISteps({ matrix: DEFAULT_MATRIX, target: 5 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSearch2DMatrixIISteps({ matrix: DEFAULT_MATRIX, target: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSearch2DMatrixIISteps({ matrix: DEFAULT_MATRIX, target: 5 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateSearch2DMatrixIISteps({ matrix: DEFAULT_MATRIX, target: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSearch2DMatrixIISteps({ matrix: DEFAULT_MATRIX, target: 5 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("includes compare-cell steps during staircase traversal", () => {
    const steps = generateSearch2DMatrixIISteps({ matrix: DEFAULT_MATRIX, target: 5 });
    const compareSteps = steps.filter((step) => step.type === "compare-cell");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("includes a mark-found step when target is found", () => {
    const steps = generateSearch2DMatrixIISteps({ matrix: DEFAULT_MATRIX, target: 5 });
    const foundSteps = steps.filter((step) => step.type === "mark-found");
    expect(foundSteps.length).toBe(1);
  });

  it("does not include mark-found when target is absent", () => {
    const steps = generateSearch2DMatrixIISteps({ matrix: DEFAULT_MATRIX, target: 20 });
    const foundSteps = steps.filter((step) => step.type === "mark-found");
    expect(foundSteps.length).toBe(0);
  });

  it("handles an empty matrix gracefully", () => {
    const steps = generateSearch2DMatrixIISteps({ matrix: [], target: 5 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("finds the bottom-left element with a mark-found step", () => {
    const steps = generateSearch2DMatrixIISteps({ matrix: DEFAULT_MATRIX, target: 18 });
    const foundSteps = steps.filter((step) => step.type === "mark-found");
    expect(foundSteps.length).toBe(1);
  });

  it("staircase takes at most m+n-1 compare-cell steps for a full traversal", () => {
    const rowCount = DEFAULT_MATRIX.length;
    const colCount = DEFAULT_MATRIX[0]!.length;
    const steps = generateSearch2DMatrixIISteps({ matrix: DEFAULT_MATRIX, target: 20 });
    const compareSteps = steps.filter((step) => step.type === "compare-cell");
    expect(compareSteps.length).toBeLessThanOrEqual(rowCount + colCount - 1);
  });
});
