import { describe, it, expect } from "vitest";
import { diagonalTraversal } from "./sources/diagonal-traversal.ts?fn";

describe("diagonalTraversal", () => {
  it("traverses a 3x4 matrix diagonally", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ];
    expect(diagonalTraversal(matrix)).toEqual([1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12]);
  });

  it("traverses a 4x4 square matrix diagonally", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(diagonalTraversal(matrix)).toEqual([
      1, 2, 5, 3, 6, 9, 4, 7, 10, 13, 8, 11, 14, 12, 15, 16,
    ]);
  });

  it("handles a 1x1 matrix", () => {
    expect(diagonalTraversal([[42]])).toEqual([42]);
  });

  it("handles a single row matrix", () => {
    expect(diagonalTraversal([[1, 2, 3, 4]])).toEqual([1, 2, 3, 4]);
  });

  it("handles a single column matrix", () => {
    expect(diagonalTraversal([[1], [2], [3], [4]])).toEqual([1, 2, 3, 4]);
  });

  it("returns empty array for empty matrix", () => {
    expect(diagonalTraversal([])).toEqual([]);
  });

  it("handles a 2x2 matrix", () => {
    expect(
      diagonalTraversal([
        [1, 2],
        [3, 4],
      ]),
    ).toEqual([1, 2, 3, 4]);
  });

  it("handles a non-square matrix (2x3)", () => {
    expect(
      diagonalTraversal([
        [1, 2, 3],
        [4, 5, 6],
      ]),
    ).toEqual([1, 2, 4, 3, 5, 6]);
  });

  it("collects all elements exactly once", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = diagonalTraversal(matrix) as number[];
    expect(result.length).toBe(9);
    expect(new Set(result).size).toBe(9);
  });

  it("handles a 3x3 matrix diagonally", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(diagonalTraversal(matrix)).toEqual([1, 2, 4, 3, 5, 7, 6, 8, 9]);
  });
});
