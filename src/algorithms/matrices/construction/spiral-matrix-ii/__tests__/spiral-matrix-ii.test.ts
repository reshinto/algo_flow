import { describe, it, expect } from "vitest";
import { spiralMatrixII } from "../sources/spiral-matrix-ii.ts?fn";

describe("spiralMatrixII", () => {
  it("generates a 1×1 matrix containing only 1", () => {
    expect(spiralMatrixII(1)).toEqual([[1]]);
  });

  it("generates a 2×2 matrix in spiral order", () => {
    expect(spiralMatrixII(2)).toEqual([
      [1, 2],
      [4, 3],
    ]);
  });

  it("generates a 3×3 matrix in spiral order", () => {
    expect(spiralMatrixII(3)).toEqual([
      [1, 2, 3],
      [8, 9, 4],
      [7, 6, 5],
    ]);
  });

  it("generates a 4×4 matrix in spiral order", () => {
    expect(spiralMatrixII(4)).toEqual([
      [1, 2, 3, 4],
      [12, 13, 14, 5],
      [11, 16, 15, 6],
      [10, 9, 8, 7],
    ]);
  });

  it("generates a 5×5 matrix in spiral order", () => {
    const result = spiralMatrixII(5) as number[][];
    expect(result[0]).toEqual([1, 2, 3, 4, 5]);
    expect(result[1]).toEqual([16, 17, 18, 19, 6]);
    expect(result[2]).toEqual([15, 24, 25, 20, 7]);
    expect(result[3]).toEqual([14, 23, 22, 21, 8]);
    expect(result[4]).toEqual([13, 12, 11, 10, 9]);
  });

  it("places 1 in the top-left corner for any size", () => {
    for (const size of [2, 3, 4, 5]) {
      const result = spiralMatrixII(size) as number[][];
      expect(result[0]?.[0]).toBe(1);
    }
  });

  it("places n² in the center for odd n", () => {
    const result = spiralMatrixII(3) as number[][];
    const center = Math.floor(3 / 2);
    expect(result[center]?.[center]).toBe(9);
  });

  it("contains all values from 1 to n² exactly once for n=4", () => {
    const result = spiralMatrixII(4) as number[][];
    const flat = result.flat();
    expect(flat.length).toBe(16);
    expect(new Set(flat).size).toBe(16);
    expect(Math.min(...flat)).toBe(1);
    expect(Math.max(...flat)).toBe(16);
  });

  it("contains all values from 1 to n² exactly once for n=5", () => {
    const result = spiralMatrixII(5) as number[][];
    const flat = result.flat();
    expect(flat.length).toBe(25);
    expect(new Set(flat).size).toBe(25);
    expect(Math.min(...flat)).toBe(1);
    expect(Math.max(...flat)).toBe(25);
  });

  it("produces a square matrix with correct dimensions", () => {
    const result = spiralMatrixII(4) as number[][];
    expect(result.length).toBe(4);
    for (const row of result) {
      expect(row.length).toBe(4);
    }
  });
});
