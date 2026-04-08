import { describe, it, expect } from "vitest";
import { rotateMatrix } from "../sources/rotate-matrix.ts?fn";

function deepCopy(matrix: number[][]): number[][] {
  return matrix.map((row) => [...row]);
}

describe("rotateMatrix", () => {
  it("rotates a 3x3 matrix 90° clockwise", () => {
    const matrix = deepCopy([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(rotateMatrix(matrix)).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ]);
  });

  it("rotates a 4x4 matrix 90° clockwise", () => {
    const matrix = deepCopy([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ]);
    expect(rotateMatrix(matrix)).toEqual([
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ]);
  });

  it("rotates a 1x1 matrix (no-op)", () => {
    const matrix = deepCopy([[42]]);
    expect(rotateMatrix(matrix)).toEqual([[42]]);
  });

  it("rotates a 2x2 matrix 90° clockwise", () => {
    const matrix = deepCopy([
      [1, 2],
      [3, 4],
    ]);
    expect(rotateMatrix(matrix)).toEqual([
      [3, 1],
      [4, 2],
    ]);
  });

  it("handles an identity-like matrix (values on diagonal)", () => {
    const matrix = deepCopy([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
    expect(rotateMatrix(matrix)).toEqual([
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
    ]);
  });

  it("handles a matrix that is already in the rotated state", () => {
    // Rotating [[7,4,1],[8,5,2],[9,6,3]] 90° clockwise gives [[9,8,7],[6,5,4],[3,2,1]]
    const matrix = deepCopy([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ]);
    expect(rotateMatrix(matrix)).toEqual([
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1],
    ]);
  });

  it("handles a matrix with negative values", () => {
    const matrix = deepCopy([
      [-1, -2],
      [-3, -4],
    ]);
    expect(rotateMatrix(matrix)).toEqual([
      [-3, -1],
      [-4, -2],
    ]);
  });

  it("modifies the matrix in-place and returns the same reference", () => {
    const matrix: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = rotateMatrix(matrix);
    expect(result).toBe(matrix);
  });

  it("four rotations return to the original matrix", () => {
    const original = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const matrix = deepCopy(original);
    rotateMatrix(matrix);
    rotateMatrix(matrix);
    rotateMatrix(matrix);
    rotateMatrix(matrix);
    expect(matrix).toEqual(original);
  });
});
