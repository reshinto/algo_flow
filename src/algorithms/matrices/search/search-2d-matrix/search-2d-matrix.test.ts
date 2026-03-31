import { describe, it, expect } from "vitest";
import { search2DMatrix } from "./sources/search-2d-matrix.ts?fn";

describe("search2DMatrix", () => {
  it("finds a target that exists in the default matrix", () => {
    const matrix = [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ];
    expect(search2DMatrix(matrix, 3)).toBe(true);
  });

  it("returns false when target is not in the matrix", () => {
    const matrix = [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ];
    expect(search2DMatrix(matrix, 13)).toBe(false);
  });

  it("finds the first element (top-left)", () => {
    const matrix = [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ];
    expect(search2DMatrix(matrix, 1)).toBe(true);
  });

  it("finds the last element (bottom-right)", () => {
    const matrix = [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ];
    expect(search2DMatrix(matrix, 60)).toBe(true);
  });

  it("handles a single row matrix — target found", () => {
    expect(search2DMatrix([[1, 3, 5, 7, 9]], 5)).toBe(true);
  });

  it("handles a single row matrix — target not found", () => {
    expect(search2DMatrix([[1, 3, 5, 7, 9]], 4)).toBe(false);
  });

  it("handles a single element matrix — target matches", () => {
    expect(search2DMatrix([[42]], 42)).toBe(true);
  });

  it("handles a single element matrix — target does not match", () => {
    expect(search2DMatrix([[42]], 99)).toBe(false);
  });

  it("returns false for an empty matrix", () => {
    expect(search2DMatrix([], 5)).toBe(false);
  });

  it("handles a large matrix — target found in middle", () => {
    const matrix = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
    ];
    expect(search2DMatrix(matrix, 13)).toBe(true);
  });

  it("handles a large matrix — target absent", () => {
    const matrix = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
    ];
    expect(search2DMatrix(matrix, 0)).toBe(false);
  });

  it("finds elements at row boundaries", () => {
    const matrix = [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ];
    // First element of second row
    expect(search2DMatrix(matrix, 10)).toBe(true);
    // Last element of first row
    expect(search2DMatrix(matrix, 7)).toBe(true);
  });
});
