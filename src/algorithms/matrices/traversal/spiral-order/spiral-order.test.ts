import { describe, it, expect } from "vitest";
import { spiralOrder } from "./sources/spiral-order.ts?fn";

describe("spiralOrder", () => {
  it("traverses a 4x4 matrix in spiral order", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(spiralOrder(matrix)).toEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
  });

  it("traverses a 3x3 matrix in spiral order", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(spiralOrder(matrix)).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
  });

  it("handles a single row matrix", () => {
    expect(spiralOrder([[1, 2, 3, 4]])).toEqual([1, 2, 3, 4]);
  });

  it("handles a single column matrix", () => {
    expect(spiralOrder([[1], [2], [3], [4]])).toEqual([1, 2, 3, 4]);
  });

  it("handles a 1x1 matrix", () => {
    expect(spiralOrder([[42]])).toEqual([42]);
  });

  it("handles a 2x2 matrix", () => {
    expect(
      spiralOrder([
        [1, 2],
        [3, 4],
      ]),
    ).toEqual([1, 2, 4, 3]);
  });

  it("handles a non-square matrix (2x4)", () => {
    expect(
      spiralOrder([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ]),
    ).toEqual([1, 2, 3, 4, 8, 7, 6, 5]);
  });

  it("handles a non-square matrix (3x2)", () => {
    expect(
      spiralOrder([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).toEqual([1, 2, 4, 6, 5, 3]);
  });

  it("returns empty array for empty matrix", () => {
    expect(spiralOrder([])).toEqual([]);
  });

  it("collects all elements exactly once", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = spiralOrder(matrix) as number[];
    expect(result.length).toBe(9);
    expect(new Set(result).size).toBe(9);
  });
});
