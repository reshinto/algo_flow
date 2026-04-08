import { describe, it, expect } from "vitest";
import { pascalsTriangleRow } from "../sources/pascals-triangle-row.ts?fn";

describe("pascalsTriangleRow", () => {
  it("returns [1] for row 0", () => {
    expect(pascalsTriangleRow(0)).toEqual([1]);
  });

  it("returns [1, 1] for row 1", () => {
    expect(pascalsTriangleRow(1)).toEqual([1, 1]);
  });

  it("returns [1, 2, 1] for row 2", () => {
    expect(pascalsTriangleRow(2)).toEqual([1, 2, 1]);
  });

  it("returns [1, 3, 3, 1] for row 3", () => {
    expect(pascalsTriangleRow(3)).toEqual([1, 3, 3, 1]);
  });

  it("returns [1, 4, 6, 4, 1] for row 4", () => {
    expect(pascalsTriangleRow(4)).toEqual([1, 4, 6, 4, 1]);
  });

  it("returns correct row 8 with middle element C(8,4)=70", () => {
    const result = pascalsTriangleRow(8) as number[];
    expect(result).toEqual([1, 8, 28, 56, 70, 56, 28, 8, 1]);
    expect(result[4]).toBe(70);
  });

  it("has row length of rowIndex + 1", () => {
    const result = pascalsTriangleRow(6) as number[];
    expect(result).toHaveLength(7);
  });

  it("is symmetric — first and last elements are always 1", () => {
    const result = pascalsTriangleRow(5) as number[];
    expect(result[0]).toBe(1);
    expect(result[result.length - 1]).toBe(1);
  });

  it("sums to 2^rowIndex — row 6 sums to 64", () => {
    const result = pascalsTriangleRow(6) as number[];
    const rowSum = result.reduce((total, value) => total + value, 0);
    expect(rowSum).toBe(64);
  });
});
