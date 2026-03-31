import { describe, it, expect } from "vitest";
import { antiDiagonalTraversal } from "./sources/anti-diagonal-traversal.ts?fn";

describe("antiDiagonalTraversal", () => {
  it("traverses a 3x3 matrix in anti-diagonal order", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(antiDiagonalTraversal(matrix)).toEqual([1, 2, 4, 3, 5, 7, 6, 8, 9]);
  });

  it("traverses a 3x4 matrix in anti-diagonal order", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ];
    expect(antiDiagonalTraversal(matrix)).toEqual([1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12]);
  });

  it("traverses a 4x3 matrix in anti-diagonal order", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
    ];
    expect(antiDiagonalTraversal(matrix)).toEqual([1, 2, 4, 3, 5, 7, 6, 8, 10, 9, 11, 12]);
  });

  it("handles a 1x1 matrix", () => {
    expect(antiDiagonalTraversal([[42]])).toEqual([42]);
  });

  it("handles a single row matrix", () => {
    expect(antiDiagonalTraversal([[1, 2, 3, 4]])).toEqual([1, 2, 3, 4]);
  });

  it("handles a single column matrix", () => {
    expect(antiDiagonalTraversal([[1], [2], [3], [4]])).toEqual([1, 2, 3, 4]);
  });

  it("returns empty array for empty matrix", () => {
    expect(antiDiagonalTraversal([])).toEqual([]);
  });

  it("traverses a 2x2 matrix in anti-diagonal order", () => {
    expect(
      antiDiagonalTraversal([
        [1, 2],
        [3, 4],
      ]),
    ).toEqual([1, 2, 3, 4]);
  });

  it("collects all elements exactly once", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = antiDiagonalTraversal(matrix) as number[];
    expect(result.length).toBe(9);
    expect(new Set(result).size).toBe(9);
  });

  it("groups elements by row + col sum correctly", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = antiDiagonalTraversal(matrix) as number[];
    // diagSum=0: [1], diagSum=1: [2,4], diagSum=2: [3,5,7], diagSum=3: [6,8], diagSum=4: [9]
    expect(result.slice(0, 1)).toEqual([1]);
    expect(result.slice(1, 3)).toEqual([2, 4]);
    expect(result.slice(3, 6)).toEqual([3, 5, 7]);
    expect(result.slice(6, 8)).toEqual([6, 8]);
    expect(result.slice(8, 9)).toEqual([9]);
  });
});
