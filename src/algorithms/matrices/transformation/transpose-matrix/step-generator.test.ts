import { describe, it, expect } from "vitest";
import { generateTransposeMatrixSteps } from "./step-generator";

const SQUARE_MATRIX = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

describe("generateTransposeMatrixSteps", () => {
  it("produces steps for a square matrix", () => {
    const steps = generateTransposeMatrixSteps({ matrix: SQUARE_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTransposeMatrixSteps({ matrix: SQUARE_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTransposeMatrixSteps({ matrix: SQUARE_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateTransposeMatrixSteps({ matrix: SQUARE_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateTransposeMatrixSteps({ matrix: SQUARE_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits swap-cells steps for a 3x3 square matrix (3 upper-triangle swaps)", () => {
    const steps = generateTransposeMatrixSteps({ matrix: SQUARE_MATRIX });
    const swapSteps = steps.filter((step) => step.type === "swap-cells");
    // Upper triangle of 3x3: (0,1),(0,2),(1,2) = 3 swaps
    expect(swapSteps.length).toBe(3);
  });

  it("final visual state reflects the transposed square matrix", () => {
    const steps = generateTransposeMatrixSteps({ matrix: SQUARE_MATRIX });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      const finalValues = completeStep.visualState.cells.map((row) =>
        row.map((cell) => cell.value),
      );
      expect(finalValues).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]);
    }
  });

  it("handles a 1x1 matrix with only initialize and complete steps", () => {
    const steps = generateTransposeMatrixSteps({ matrix: [[42]] });
    const swapSteps = steps.filter((step) => step.type === "swap-cells");
    expect(swapSteps.length).toBe(0);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles a non-square matrix by using visit steps instead of swaps", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const steps = generateTransposeMatrixSteps({ matrix });
    const swapSteps = steps.filter((step) => step.type === "swap-cells");
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(swapSteps.length).toBe(0);
    expect(visitSteps.length).toBe(6); // 2 rows x 3 cols
  });

  it("does not mutate the original input matrix", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const originalSnapshot = matrix.map((row) => [...row]);
    generateTransposeMatrixSteps({ matrix });
    expect(matrix).toEqual(originalSnapshot);
  });
});
