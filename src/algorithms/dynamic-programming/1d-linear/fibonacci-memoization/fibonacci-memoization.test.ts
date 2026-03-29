import { describe, it, expect } from "vitest";
import { fibonacciMemoization } from "./sources/fibonacci-memoization.ts?fn";

describe("fibonacciMemoization", () => {
  it("returns 0 for F(0)", () => {
    expect(fibonacciMemoization(0)).toBe(0);
  });

  it("returns 1 for F(1)", () => {
    expect(fibonacciMemoization(1)).toBe(1);
  });

  it("returns 1 for F(2)", () => {
    expect(fibonacciMemoization(2)).toBe(1);
  });

  it("computes F(8) = 21", () => {
    expect(fibonacciMemoization(8)).toBe(21);
  });

  it("computes F(10) = 55", () => {
    expect(fibonacciMemoization(10)).toBe(55);
  });

  it("computes F(15) = 610", () => {
    expect(fibonacciMemoization(15)).toBe(610);
  });

  it("matches tabulation results for F(0) through F(10)", () => {
    const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    for (let targetIndex = 0; targetIndex <= 10; targetIndex++) {
      expect(fibonacciMemoization(targetIndex)).toBe(expected[targetIndex]);
    }
  });
});
