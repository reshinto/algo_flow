import { describe, it, expect } from "vitest";
import { kthSmallestSortedMatrix } from "./sources/kth-smallest-sorted-matrix.ts?fn";

describe("kthSmallestSortedMatrix", () => {
  it("finds the kth smallest in the default 3x3 matrix (k=8)", () => {
    const matrix = [
      [1, 5, 9],
      [10, 11, 13],
      [12, 13, 15],
    ];
    expect(kthSmallestSortedMatrix(matrix, 8)).toBe(13);
  });

  it("returns the smallest element when k=1", () => {
    const matrix = [
      [1, 5, 9],
      [10, 11, 13],
      [12, 13, 15],
    ];
    expect(kthSmallestSortedMatrix(matrix, 1)).toBe(1);
  });

  it("returns the largest element when k=n²", () => {
    const matrix = [
      [1, 5, 9],
      [10, 11, 13],
      [12, 13, 15],
    ];
    expect(kthSmallestSortedMatrix(matrix, 9)).toBe(15);
  });

  it("handles a 1x1 matrix", () => {
    expect(kthSmallestSortedMatrix([[42]], 1)).toBe(42);
  });

  it("handles a 2x2 matrix", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    expect(kthSmallestSortedMatrix(matrix, 2)).toBe(2);
    expect(kthSmallestSortedMatrix(matrix, 3)).toBe(3);
  });

  it("handles a matrix where all values are the same", () => {
    const matrix = [
      [5, 5, 5],
      [5, 5, 5],
      [5, 5, 5],
    ];
    expect(kthSmallestSortedMatrix(matrix, 5)).toBe(5);
  });

  it("handles a 4x4 matrix finding middle element", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(kthSmallestSortedMatrix(matrix, 8)).toBe(8);
  });

  it("finds the correct element in a 4x4 matrix for k=1", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(kthSmallestSortedMatrix(matrix, 1)).toBe(1);
  });

  it("finds the correct element in a matrix with negative values", () => {
    const matrix = [
      [-5, -4, -3],
      [-2, -1, 0],
      [1, 2, 3],
    ];
    expect(kthSmallestSortedMatrix(matrix, 5)).toBe(-1);
  });

  it("finds the kth element in a 4x4 matrix for large k", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(kthSmallestSortedMatrix(matrix, 16)).toBe(16);
  });
});
