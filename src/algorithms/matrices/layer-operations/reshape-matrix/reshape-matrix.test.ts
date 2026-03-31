import { describe, it, expect } from "vitest";
import { reshapeMatrix } from "./sources/reshape-matrix.ts?fn";

describe("reshapeMatrix", () => {
  it("reshapes a 2x4 matrix into a 4x2 matrix", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ];
    expect(reshapeMatrix(matrix, 4, 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]);
  });

  it("reshapes a 2x2 matrix into a 1x4 matrix", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    expect(reshapeMatrix(matrix, 1, 4)).toEqual([[1, 2, 3, 4]]);
  });

  it("reshapes a 2x2 matrix into a 4x1 matrix", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    expect(reshapeMatrix(matrix, 4, 1)).toEqual([[1], [2], [3], [4]]);
  });

  it("returns the original matrix for an impossible reshape (size mismatch)", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const result = reshapeMatrix(matrix, 3, 2) as number[][];
    expect(result).toEqual(matrix);
  });

  it("handles a 1x1 to 1x1 identity reshape", () => {
    expect(reshapeMatrix([[42]], 1, 1)).toEqual([[42]]);
  });

  it("reshapes a 3x3 matrix into a 1x9 matrix", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(reshapeMatrix(matrix, 1, 9)).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9]]);
  });

  it("returns the original matrix when target has same dimensions (identity reshape)", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    expect(reshapeMatrix(matrix, 2, 3)).toEqual(matrix);
  });

  it("reshapes a 1x6 matrix into a 2x3 matrix", () => {
    expect(reshapeMatrix([[1, 2, 3, 4, 5, 6]], 2, 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it("returns original for impossible reshape when target rows or cols are larger", () => {
    const matrix = [[1, 2, 3]];
    const result = reshapeMatrix(matrix, 2, 5) as number[][];
    expect(result).toEqual(matrix);
  });
});
