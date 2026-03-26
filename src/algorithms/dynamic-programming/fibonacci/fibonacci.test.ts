import { describe, it, expect } from "vitest";
import { fibonacciTabulation, fibonacciMemoization } from "./fibonacci";

describe("fibonacciTabulation", () => {
  it("returns 0 for F(0)", () => {
    expect(fibonacciTabulation(0)).toBe(0);
  });

  it("returns 1 for F(1)", () => {
    expect(fibonacciTabulation(1)).toBe(1);
  });

  it("returns 1 for F(2)", () => {
    expect(fibonacciTabulation(2)).toBe(1);
  });

  it("computes F(8) = 21", () => {
    expect(fibonacciTabulation(8)).toBe(21);
  });

  it("computes F(10) = 55", () => {
    expect(fibonacciTabulation(10)).toBe(55);
  });

  it("computes F(15) = 610", () => {
    expect(fibonacciTabulation(15)).toBe(610);
  });
});

describe("fibonacciMemoization", () => {
  it("returns 0 for F(0)", () => {
    expect(fibonacciMemoization(0)).toBe(0);
  });

  it("returns 1 for F(1)", () => {
    expect(fibonacciMemoization(1)).toBe(1);
  });

  it("computes F(8) = 21", () => {
    expect(fibonacciMemoization(8)).toBe(21);
  });

  it("matches tabulation results for F(0) through F(15)", () => {
    for (let targetIndex = 0; targetIndex <= 15; targetIndex++) {
      expect(fibonacciMemoization(targetIndex)).toBe(fibonacciTabulation(targetIndex));
    }
  });
});
