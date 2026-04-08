import { describe, it, expect } from "vitest";
import { zigzagTraversal } from "../sources/zigzag-traversal.ts?fn";

describe("zigzagTraversal", () => {
  it("traverses a 3x3 matrix in zigzag order", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(zigzagTraversal(matrix)).toEqual([1, 2, 4, 7, 5, 3, 6, 8, 9]);
  });

  it("traverses a 3x4 matrix in zigzag order", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ];
    expect(zigzagTraversal(matrix)).toEqual([1, 2, 5, 9, 6, 3, 4, 7, 10, 11, 8, 12]);
  });

  it("traverses a 4x4 matrix in zigzag order", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(zigzagTraversal(matrix)).toEqual([
      1, 2, 5, 9, 6, 3, 4, 7, 10, 13, 14, 11, 8, 12, 15, 16,
    ]);
  });

  it("handles a 1x1 matrix", () => {
    expect(zigzagTraversal([[42]])).toEqual([42]);
  });

  it("handles a single row matrix", () => {
    expect(zigzagTraversal([[1, 2, 3, 4]])).toEqual([1, 2, 3, 4]);
  });

  it("handles a single column matrix", () => {
    expect(zigzagTraversal([[1], [2], [3], [4]])).toEqual([1, 2, 3, 4]);
  });

  it("returns empty array for empty matrix", () => {
    expect(zigzagTraversal([])).toEqual([]);
  });

  it("handles a 2x2 matrix", () => {
    expect(
      zigzagTraversal([
        [1, 2],
        [3, 4],
      ]),
    ).toEqual([1, 2, 3, 4]);
  });

  it("collects all elements exactly once for 3x3", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = zigzagTraversal(matrix) as number[];
    expect(result.length).toBe(9);
    expect(new Set(result).size).toBe(9);
  });

  it("collects all elements exactly once for non-square matrix", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ];
    const result = zigzagTraversal(matrix) as number[];
    expect(result.length).toBe(12);
    expect(new Set(result).size).toBe(12);
  });
});
