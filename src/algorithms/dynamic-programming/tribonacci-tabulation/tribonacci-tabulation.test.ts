import { describe, it, expect } from "vitest";
import { tribonacciTabulation } from "./sources/tribonacci-tabulation.ts?fn";

describe("tribonacciTabulation", () => {
  it("returns 0 for T(0)", () => {
    expect(tribonacciTabulation(0)).toBe(0);
  });

  it("returns 1 for T(1)", () => {
    expect(tribonacciTabulation(1)).toBe(1);
  });

  it("returns 1 for T(2)", () => {
    expect(tribonacciTabulation(2)).toBe(1);
  });

  it("computes T(4) = 4", () => {
    expect(tribonacciTabulation(4)).toBe(4);
  });

  it("computes T(7) = 24", () => {
    expect(tribonacciTabulation(7)).toBe(24);
  });

  it("computes T(10) = 149", () => {
    expect(tribonacciTabulation(10)).toBe(149);
  });
});
