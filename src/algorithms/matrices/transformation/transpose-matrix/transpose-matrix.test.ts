import { describe, it, expect } from "vitest";
import { transposeMatrix } from "./sources/transpose-matrix.ts?fn";
import { generateTransposeMatrixSteps } from "./step-generator";

// ── Correctness tests ──────────────────────────────────────────────────────────

describe("transposeMatrix", () => {
  it("transposes a 3×3 square matrix in-place", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(transposeMatrix(matrix)).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);
  });

  it("transposes a 2×2 square matrix", () => {
    expect(
      transposeMatrix([
        [1, 2],
        [3, 4],
      ]),
    ).toEqual([
      [1, 3],
      [2, 4],
    ]);
  });

  it("transposes a 4×4 square matrix", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(transposeMatrix(matrix)).toEqual([
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [4, 8, 12, 16],
    ]);
  });

  it("transposes a 1×1 matrix", () => {
    expect(transposeMatrix([[42]])).toEqual([[42]]);
  });

  it("transposes a non-square 2×3 matrix to 3×2", () => {
    expect(
      transposeMatrix([
        [1, 2, 3],
        [4, 5, 6],
      ]),
    ).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  it("transposes a non-square 3×2 matrix to 2×3", () => {
    expect(
      transposeMatrix([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).toEqual([
      [1, 3, 5],
      [2, 4, 6],
    ]);
  });

  it("transposes a single-row matrix to a single-column matrix", () => {
    expect(transposeMatrix([[1, 2, 3, 4]])).toEqual([[1], [2], [3], [4]]);
  });

  it("transposes a single-column matrix to a single-row matrix", () => {
    expect(transposeMatrix([[1], [2], [3]])).toEqual([[1, 2, 3]]);
  });

  it("double-transpose returns the original matrix values", () => {
    const original = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const copy = original.map((row) => [...row]);
    const transposed = transposeMatrix(copy) as number[][];
    const doubleTransposed = transposeMatrix(transposed.map((row) => [...row])) as number[][];
    expect(doubleTransposed).toEqual(original);
  });
});

// ── Step generation tests ──────────────────────────────────────────────────────

describe("generateTransposeMatrixSteps", () => {
  const squareMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  it("produces steps for the default 3×3 input", () => {
    const steps = generateTransposeMatrixSteps({ matrix: squareMatrix });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTransposeMatrixSteps({ matrix: squareMatrix });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTransposeMatrixSteps({ matrix: squareMatrix });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateTransposeMatrixSteps({ matrix: squareMatrix });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateTransposeMatrixSteps({ matrix: squareMatrix });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits swap-cells steps for a square matrix (upper triangle)", () => {
    const steps = generateTransposeMatrixSteps({ matrix: squareMatrix });
    const swapSteps = steps.filter((step) => step.type === "swap-cells");
    // 3×3 has 3 pairs above diagonal: (0,1),(0,2),(1,2)
    expect(swapSteps.length).toBe(3);
  });

  it("emits visit steps for a non-square matrix", () => {
    const nonSquare = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const steps = generateTransposeMatrixSteps({ matrix: nonSquare });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(6);
  });

  it("produces correct step count for a 1×1 matrix", () => {
    const steps = generateTransposeMatrixSteps({ matrix: [[7]] });
    // initialize + complete only (no swaps needed)
    expect(steps.length).toBe(2);
  });
});
