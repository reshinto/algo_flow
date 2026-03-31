import { describe, it, expect } from "vitest";
import { rotateLayerByLayer } from "./sources/rotate-layer-by-layer.ts?fn";

/** Helper: deep-copy a matrix so the in-place function does not mutate test fixtures. */
function cloneMatrix(matrix: number[][]): number[][] {
  return matrix.map((row) => [...row]);
}

describe("rotateLayerByLayer", () => {
  it("rotates a 3x3 matrix 90° clockwise", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(rotateLayerByLayer(cloneMatrix(matrix))).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ]);
  });

  it("rotates a 4x4 matrix 90° clockwise", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(rotateLayerByLayer(cloneMatrix(matrix))).toEqual([
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ]);
  });

  it("handles a 1x1 matrix — no rotation needed", () => {
    expect(rotateLayerByLayer([[42]])).toEqual([[42]]);
  });

  it("rotates a 2x2 matrix 90° clockwise", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    expect(rotateLayerByLayer(cloneMatrix(matrix))).toEqual([
      [3, 1],
      [4, 2],
    ]);
  });

  it("rotates a 5x5 matrix 90° clockwise", () => {
    const matrix = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];
    expect(rotateLayerByLayer(cloneMatrix(matrix))).toEqual([
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5],
    ]);
  });

  it("produces the same result as transpose + reverse rows", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    // Transpose + reverse (reference implementation)
    function transposeAndReverse(mat: number[][]): number[][] {
      const copy = mat.map((row) => [...row]);
      const size = copy.length;
      for (let rowIdx = 0; rowIdx < size; rowIdx++) {
        for (let colIdx = rowIdx + 1; colIdx < size; colIdx++) {
          const temp = copy[rowIdx]![colIdx]!;
          copy[rowIdx]![colIdx] = copy[colIdx]![rowIdx]!;
          copy[colIdx]![rowIdx] = temp;
        }
      }
      for (let rowIdx = 0; rowIdx < size; rowIdx++) {
        copy[rowIdx]!.reverse();
      }
      return copy;
    }

    expect(rotateLayerByLayer(cloneMatrix(matrix))).toEqual(transposeAndReverse(matrix));
  });

  it("returns the original matrix after 4 clockwise rotations", () => {
    const original = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    let matrix = cloneMatrix(original);
    for (let rotationCount = 0; rotationCount < 4; rotationCount++) {
      matrix = rotateLayerByLayer(matrix) as number[][];
    }
    expect(matrix).toEqual(original);
  });

  it("preserves all elements — no element is lost or duplicated", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const result = rotateLayerByLayer(cloneMatrix(matrix)) as number[][];
    const flatResult = result.flat();
    const flatOriginal = matrix.flat();
    expect(flatResult.sort((a, b) => a - b)).toEqual(flatOriginal.sort((a, b) => a - b));
  });

  it("handles a matrix with negative and zero values", () => {
    const matrix = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-3, 0, 3],
    ];
    expect(rotateLayerByLayer(cloneMatrix(matrix))).toEqual([
      [-3, -2, -1],
      [0, 0, 0],
      [3, 2, 1],
    ]);
  });

  it("rotates a 4x4 matrix with all same values — no visible change", () => {
    const matrix = [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ];
    expect(rotateLayerByLayer(cloneMatrix(matrix))).toEqual(matrix);
  });
});
