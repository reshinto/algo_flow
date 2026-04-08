import { describe, it, expect } from "vitest";
import { tribonacciMemoization } from "../sources/tribonacci-memoization.ts?fn";

describe("tribonacciMemoization", () => {
  it("returns 0 for T(0)", () => {
    expect(tribonacciMemoization(0)).toBe(0);
  });

  it("returns 1 for T(1)", () => {
    expect(tribonacciMemoization(1)).toBe(1);
  });

  it("returns 1 for T(2)", () => {
    expect(tribonacciMemoization(2)).toBe(1);
  });

  it("computes T(4) = 4", () => {
    expect(tribonacciMemoization(4)).toBe(4);
  });

  it("computes T(7) = 24", () => {
    expect(tribonacciMemoization(7)).toBe(24);
  });

  it("computes T(10) = 149", () => {
    expect(tribonacciMemoization(10)).toBe(149);
  });

  it("matches the full sequence T(0)..T(10)", () => {
    const expected = [0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149];
    for (let targetIndex = 0; targetIndex <= 10; targetIndex++) {
      expect(tribonacciMemoization(targetIndex)).toBe(expected[targetIndex]);
    }
  });
});
