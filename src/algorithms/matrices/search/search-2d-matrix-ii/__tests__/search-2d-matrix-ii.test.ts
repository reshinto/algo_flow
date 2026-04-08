import { describe, it, expect } from "vitest";
import { search2DMatrixII } from "../sources/search-2d-matrix-ii.ts?fn";

const DEFAULT_MATRIX = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
];

describe("search2DMatrixII", () => {
  it("finds a target in the center of the default matrix", () => {
    expect(search2DMatrixII(DEFAULT_MATRIX, 5)).toBe(true);
  });

  it("returns false when target is not in the matrix", () => {
    expect(search2DMatrixII(DEFAULT_MATRIX, 20)).toBe(false);
  });

  it("finds the top-right corner element", () => {
    expect(search2DMatrixII(DEFAULT_MATRIX, 15)).toBe(true);
  });

  it("finds the bottom-left corner element", () => {
    expect(search2DMatrixII(DEFAULT_MATRIX, 18)).toBe(true);
  });

  it("handles a single element matrix — target matches", () => {
    expect(search2DMatrixII([[7]], 7)).toBe(true);
  });

  it("handles a single element matrix — target does not match", () => {
    expect(search2DMatrixII([[7]], 3)).toBe(false);
  });

  it("returns false for an empty matrix", () => {
    expect(search2DMatrixII([], 5)).toBe(false);
  });

  it("handles a large fully sorted matrix — target found", () => {
    const matrix = [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17],
    ];
    expect(search2DMatrixII(matrix, 9)).toBe(true);
  });

  it("handles a large fully sorted matrix — target not found", () => {
    const matrix = [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17],
    ];
    expect(search2DMatrixII(matrix, 15)).toBe(false);
  });

  it("finds the first element (top-left)", () => {
    expect(search2DMatrixII(DEFAULT_MATRIX, 1)).toBe(true);
  });

  it("finds the last element (bottom-right)", () => {
    expect(search2DMatrixII(DEFAULT_MATRIX, 30)).toBe(true);
  });

  it("handles a single row matrix", () => {
    expect(search2DMatrixII([[1, 2, 3, 4, 5]], 3)).toBe(true);
    expect(search2DMatrixII([[1, 2, 3, 4, 5]], 6)).toBe(false);
  });
});
