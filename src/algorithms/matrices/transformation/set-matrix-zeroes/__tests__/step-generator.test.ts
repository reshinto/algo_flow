import { describe, it, expect } from "vitest";
import { generateSetMatrixZeroesSteps } from "../step-generator";

const DEFAULT_MATRIX = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

describe("generateSetMatrixZeroesSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: DEFAULT_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: DEFAULT_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: DEFAULT_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits mark-cell steps during the scanning phase", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: DEFAULT_MATRIX });
    const markSteps = steps.filter((step) => step.type === "mark-cell");
    // The single zero at [1][1] should trigger a mark
    expect(markSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("emits zero-cell steps for cells in the zero row and column", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: DEFAULT_MATRIX });
    const zeroSteps = steps.filter((step) => step.type === "zero-cell");
    // Inner cells zeroed by the marker phase; exact count depends on marker propagation
    expect(zeroSteps.length).toBeGreaterThanOrEqual(3);
  });

  it("handles a matrix with no zeros (no mark or zero steps)", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const steps = generateSetMatrixZeroesSteps({ matrix });
    const markSteps = steps.filter((step) => step.type === "mark-cell");
    const zeroSteps = steps.filter((step) => step.type === "zero-cell");
    expect(markSteps.length).toBe(0);
    expect(zeroSteps.length).toBe(0);
  });

  it("handles zero in the first row correctly", () => {
    const matrix = [
      [0, 1],
      [1, 1],
    ];
    const steps = generateSetMatrixZeroesSteps({ matrix });
    const zeroSteps = steps.filter((step) => step.type === "zero-cell");
    // First row has zero: entire row 0 zeroed + entire col 0 zeroed
    expect(zeroSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("does not mutate the original input matrix", () => {
    const matrix = [
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
    ];
    const originalSnapshot = matrix.map((row) => [...row]);
    generateSetMatrixZeroesSteps({ matrix });
    expect(matrix).toEqual(originalSnapshot);
  });
});
