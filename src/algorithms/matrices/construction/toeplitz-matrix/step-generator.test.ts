import { describe, it, expect } from "vitest";
import { generateToeplitzMatrixSteps } from "./step-generator";

const TOEPLITZ_MATRIX = [
  [1, 2, 3, 4],
  [5, 1, 2, 3],
  [9, 5, 1, 2],
];

const NON_TOEPLITZ_MATRIX = [
  [1, 2],
  [2, 2],
];

describe("generateToeplitzMatrixSteps", () => {
  it("produces steps for a valid Toeplitz matrix", () => {
    const steps = generateToeplitzMatrixSteps({ matrix: TOEPLITZ_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateToeplitzMatrixSteps({ matrix: TOEPLITZ_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateToeplitzMatrixSteps({ matrix: TOEPLITZ_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateToeplitzMatrixSteps({ matrix: TOEPLITZ_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateToeplitzMatrixSteps({ matrix: TOEPLITZ_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits verify-cell steps for every interior cell in 3×4 matrix (6 cells)", () => {
    const steps = generateToeplitzMatrixSteps({ matrix: TOEPLITZ_MATRIX });
    const verifyCells = steps.filter((step) => step.type === "verify-cell");
    expect(verifyCells.length).toBe(6);
  });

  it("marks all verify-cell steps as found for a valid Toeplitz matrix", () => {
    const steps = generateToeplitzMatrixSteps({ matrix: TOEPLITZ_MATRIX });
    const verifyCells = steps.filter((step) => step.type === "verify-cell");
    for (const step of verifyCells) {
      if (step.visualState.kind === "matrix") {
        const currentPos = step.visualState.currentPosition;
        if (currentPos) {
          const [row, col] = currentPos;
          const cellState = step.visualState.cells[row]?.[col]?.state;
          expect(cellState).toBe("found");
        }
      }
    }
  });

  it("marks a cell as eliminated for a non-Toeplitz matrix", () => {
    const steps = generateToeplitzMatrixSteps({ matrix: NON_TOEPLITZ_MATRIX });
    const eliminated = steps.filter((step) => {
      if (step.visualState.kind !== "matrix") return false;
      const pos = step.visualState.currentPosition;
      if (!pos) return false;
      const [row, col] = pos;
      return step.visualState.cells[row]?.[col]?.state === "eliminated";
    });
    expect(eliminated.length).toBeGreaterThan(0);
  });

  it("handles 1×1 matrix with no verify-cell steps", () => {
    const steps = generateToeplitzMatrixSteps({ matrix: [[5]] });
    const verifyCells = steps.filter((step) => step.type === "verify-cell");
    expect(verifyCells.length).toBe(0);
  });
});
