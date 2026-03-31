import { describe, it, expect } from "vitest";
import { matrixDiagonalSum } from "./sources/matrix-diagonal-sum.ts?fn";

describe("matrixDiagonalSum", () => {
  it("sums both diagonals of a 3x3 matrix, subtracting center overlap", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    // primary: 1+5+9=15, secondary: 3+5+7=15, center=5 → 25
    expect(matrixDiagonalSum(matrix)).toBe(25);
  });

  it("sums both diagonals of a 4x4 matrix (even size, no center subtraction)", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    // primary: 1+6+11+16=34, secondary: 4+7+10+13=34 → 68
    expect(matrixDiagonalSum(matrix)).toBe(68);
  });

  it("returns the single element for a 1x1 matrix", () => {
    expect(matrixDiagonalSum([[42]])).toBe(42);
  });

  it("sums both diagonals of a 2x2 matrix", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    // primary: 1+4=5, secondary: 2+3=5 → 10
    expect(matrixDiagonalSum(matrix)).toBe(10);
  });

  it("sums both diagonals of a 5x5 matrix, subtracting center overlap", () => {
    const matrix = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];
    // primary: 1+7+13+19+25=65, secondary: 5+9+13+17+21=65, center=13 → 117
    expect(matrixDiagonalSum(matrix)).toBe(117);
  });

  it("returns 0 for an all-zeros matrix", () => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(matrixDiagonalSum(matrix)).toBe(0);
  });

  it("handles an identity matrix correctly", () => {
    const matrix = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    // primary: 1+1+1=3, secondary: 0+1+0=1, center=1 → 3
    expect(matrixDiagonalSum(matrix)).toBe(3);
  });

  it("handles negative values on diagonals", () => {
    const matrix = [
      [-1, 0, -2],
      [0, -3, 0],
      [-4, 0, -5],
    ];
    // primary: -1+-3+-5=-9, secondary: -2+-3+-4=-9, center=-3 → -15
    expect(matrixDiagonalSum(matrix)).toBe(-15);
  });

  it("handles a 4x4 matrix with all same values", () => {
    const matrix = [
      [2, 2, 2, 2],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
    ];
    // primary: 2*4=8, secondary: 2*4=8 → 16
    expect(matrixDiagonalSum(matrix)).toBe(16);
  });
});
