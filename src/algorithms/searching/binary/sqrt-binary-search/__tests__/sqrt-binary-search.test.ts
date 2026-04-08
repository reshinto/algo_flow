import { describe, it, expect } from "vitest";

import { sqrtBinarySearch } from "../sources/sqrt-binary-search.ts?fn";

describe("sqrtBinarySearch", () => {
  it("computes the exact square root of a perfect square", () => {
    expect(sqrtBinarySearch(49)).toBe(7);
  });

  it("computes the floor square root of a non-perfect square", () => {
    // sqrt(8) ≈ 2.828 — floor is 2
    expect(sqrtBinarySearch(8)).toBe(2);
  });

  it("returns 0 for input 0", () => {
    expect(sqrtBinarySearch(0)).toBe(0);
  });

  it("returns 1 for input 1", () => {
    expect(sqrtBinarySearch(1)).toBe(1);
  });

  it("computes sqrt of 4", () => {
    expect(sqrtBinarySearch(4)).toBe(2);
  });

  it("computes sqrt of 9", () => {
    expect(sqrtBinarySearch(9)).toBe(3);
  });

  it("computes sqrt of 16", () => {
    expect(sqrtBinarySearch(16)).toBe(4);
  });

  it("computes floor sqrt of 2", () => {
    // sqrt(2) ≈ 1.414 — floor is 1
    expect(sqrtBinarySearch(2)).toBe(1);
  });

  it("computes floor sqrt of 3", () => {
    // sqrt(3) ≈ 1.732 — floor is 1
    expect(sqrtBinarySearch(3)).toBe(1);
  });

  it("computes sqrt of 100", () => {
    expect(sqrtBinarySearch(100)).toBe(10);
  });

  it("computes floor sqrt of 99", () => {
    // sqrt(99) ≈ 9.95 — floor is 9
    expect(sqrtBinarySearch(99)).toBe(9);
  });

  it("computes sqrt of 144", () => {
    expect(sqrtBinarySearch(144)).toBe(12);
  });

  it("computes floor sqrt of 10", () => {
    // sqrt(10) ≈ 3.162 — floor is 3
    expect(sqrtBinarySearch(10)).toBe(3);
  });
});
