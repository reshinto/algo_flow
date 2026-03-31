import { describe, it, expect } from "vitest";
import { generateRotateMatrixSteps } from "./step-generator";

const DEFAULT_MATRIX = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

describe("generateRotateMatrixSteps", () => {
  it("produces steps for the default 3x3 input", () => {
    const steps = generateRotateMatrixSteps({ matrix: DEFAULT_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRotateMatrixSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRotateMatrixSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateRotateMatrixSteps({ matrix: DEFAULT_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRotateMatrixSteps({ matrix: DEFAULT_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits swap-cells steps for the 3x3 transpose (3 swaps) and row-reverse (3 swaps)", () => {
    const steps = generateRotateMatrixSteps({ matrix: DEFAULT_MATRIX });
    const swapSteps = steps.filter((step) => step.type === "swap-cells");
    // 3x3 transpose: 3 swaps (upper triangle only); row-reverse: 1 swap per row = 3 swaps → total 6
    expect(swapSteps.length).toBe(6);
  });

  it("final visual state reflects the rotated matrix", () => {
    const steps = generateRotateMatrixSteps({ matrix: DEFAULT_MATRIX });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      const finalValues = completeStep.visualState.cells.map((row) =>
        row.map((cell) => cell.value),
      );
      expect(finalValues).toEqual([
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
      ]);
    }
  });

  it("handles a 1x1 matrix with only initialize and complete steps", () => {
    const steps = generateRotateMatrixSteps({ matrix: [[5]] });
    const swapSteps = steps.filter((step) => step.type === "swap-cells");
    expect(swapSteps.length).toBe(0);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles a 4x4 matrix and produces correct final state", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const steps = generateRotateMatrixSteps({ matrix });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "matrix") {
      const finalValues = completeStep.visualState.cells.map((row) =>
        row.map((cell) => cell.value),
      );
      expect(finalValues).toEqual([
        [13, 9, 5, 1],
        [14, 10, 6, 2],
        [15, 11, 7, 3],
        [16, 12, 8, 4],
      ]);
    }
  });

  it("does not mutate the original input matrix", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const originalSnapshot = matrix.map((row) => [...row]);
    generateRotateMatrixSteps({ matrix });
    expect(matrix).toEqual(originalSnapshot);
  });
});
