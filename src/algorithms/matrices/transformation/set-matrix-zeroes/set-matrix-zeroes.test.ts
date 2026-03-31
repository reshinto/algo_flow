import { describe, it, expect } from "vitest";
import { setMatrixZeroes } from "./sources/set-matrix-zeroes.ts?fn";
import { generateSetMatrixZeroesSteps } from "./step-generator";

// ── Correctness tests ──────────────────────────────────────────────────────────

describe("setMatrixZeroes", () => {
  it("zeros the row and column of a single zero in a 3×3 matrix", () => {
    expect(
      setMatrixZeroes([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ]),
    ).toEqual([
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ]);
  });

  it("handles the default input with zeros in first row and last column", () => {
    expect(
      setMatrixZeroes([
        [0, 1, 2, 0],
        [3, 4, 5, 2],
        [1, 3, 1, 5],
      ]),
    ).toEqual([
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0],
    ]);
  });

  it("leaves a matrix with no zeros unchanged", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(setMatrixZeroes(matrix)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  it("returns all zeros when every cell is zero", () => {
    const matrix = [
      [0, 0],
      [0, 0],
    ];
    expect(setMatrixZeroes(matrix)).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });

  it("handles a 1×1 matrix with value 0", () => {
    expect(setMatrixZeroes([[0]])).toEqual([[0]]);
  });

  it("handles a 1×1 matrix with a non-zero value", () => {
    expect(setMatrixZeroes([[5]])).toEqual([[5]]);
  });

  it("handles a zero in the first row", () => {
    expect(
      setMatrixZeroes([
        [1, 0, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]),
    ).toEqual([
      [0, 0, 0],
      [4, 0, 6],
      [7, 0, 9],
    ]);
  });

  it("handles a zero in the first column", () => {
    expect(
      setMatrixZeroes([
        [1, 2, 3],
        [0, 5, 6],
        [7, 8, 9],
      ]),
    ).toEqual([
      [0, 2, 3],
      [0, 0, 0],
      [0, 8, 9],
    ]);
  });

  it("handles a single-row matrix with one zero", () => {
    expect(setMatrixZeroes([[1, 0, 3]])).toEqual([[0, 0, 0]]);
  });

  it("handles a single-column matrix with one zero", () => {
    expect(setMatrixZeroes([[1], [0], [3]])).toEqual([[0], [0], [0]]);
  });

  it("handles multiple zeros in the same row", () => {
    expect(
      setMatrixZeroes([
        [0, 1, 0],
        [2, 3, 4],
        [5, 6, 7],
      ]),
    ).toEqual([
      [0, 0, 0],
      [0, 3, 0],
      [0, 6, 0],
    ]);
  });
});

// ── Step generation tests ──────────────────────────────────────────────────────

describe("generateSetMatrixZeroesSteps", () => {
  const defaultMatrix = [
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ];

  it("produces steps for the default input", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: defaultMatrix });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: defaultMatrix });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: defaultMatrix });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: defaultMatrix });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSetMatrixZeroesSteps({ matrix: defaultMatrix });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits mark-cell steps when zeros are found", () => {
    const steps = generateSetMatrixZeroesSteps({
      matrix: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    });
    const markSteps = steps.filter((step) => step.type === "mark-cell");
    expect(markSteps.length).toBeGreaterThan(0);
  });

  it("emits zero-cell steps during zeroing phase", () => {
    const steps = generateSetMatrixZeroesSteps({
      matrix: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    });
    const zeroSteps = steps.filter((step) => step.type === "zero-cell");
    expect(zeroSteps.length).toBeGreaterThan(0);
  });

  it("produces no mark-cell steps when there are no zeros", () => {
    const steps = generateSetMatrixZeroesSteps({
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
      ],
    });
    const markSteps = steps.filter((step) => step.type === "mark-cell");
    expect(markSteps.length).toBe(0);
  });
});
