import { describe, it, expect } from "vitest";
import { pascalsTriangle } from "../sources/pascals-triangle.ts?fn";

describe("pascalsTriangle", () => {
  it("returns [[1]] for numRows=1", () => {
    expect(pascalsTriangle(1)).toEqual([[1]]);
  });

  it("returns correct triangle for numRows=2", () => {
    expect(pascalsTriangle(2)).toEqual([[1], [1, 1]]);
  });

  it("returns correct triangle for numRows=3", () => {
    expect(pascalsTriangle(3)).toEqual([[1], [1, 1], [1, 2, 1]]);
  });

  it("returns correct triangle for numRows=5", () => {
    expect(pascalsTriangle(5)).toEqual([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]);
  });

  it("returns correct triangle for numRows=6", () => {
    expect(pascalsTriangle(6)).toEqual([
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1],
      [1, 5, 10, 10, 5, 1],
    ]);
  });

  it("each inner cell is the sum of the two cells above", () => {
    const result = pascalsTriangle(5) as number[][];
    for (let rowIdx = 2; rowIdx < result.length; rowIdx++) {
      const currentRow = result[rowIdx]!;
      const aboveRow = result[rowIdx - 1]!;
      for (let colIdx = 1; colIdx < currentRow.length - 1; colIdx++) {
        expect(currentRow[colIdx]).toBe(aboveRow[colIdx - 1]! + aboveRow[colIdx]!);
      }
    }
  });

  it("all edge cells (first and last in every row) are 1", () => {
    const result = pascalsTriangle(6) as number[][];
    for (const row of result) {
      expect(row[0]).toBe(1);
      expect(row[row.length - 1]).toBe(1);
    }
  });

  it("row at index rowIdx has rowIdx+1 elements", () => {
    const result = pascalsTriangle(5) as number[][];
    for (let rowIdx = 0; rowIdx < result.length; rowIdx++) {
      expect(result[rowIdx]!.length).toBe(rowIdx + 1);
    }
  });

  it("returns empty array for numRows=0", () => {
    expect(pascalsTriangle(0)).toEqual([]);
  });
});
