import { describe, it, expect } from "vitest";
import { kthSmallestElement } from "../sources/kth-smallest-element.ts?fn";

describe("kthSmallestElement", () => {
  it("finds the 3rd smallest in the default input", () => {
    const result = kthSmallestElement([7, 10, 4, 3, 20, 15, 8], 3);
    expect(result).toBe(7);
  });

  it("finds the 1st smallest (minimum)", () => {
    const result = kthSmallestElement([7, 10, 4, 3, 20, 15, 8], 1);
    expect(result).toBe(3);
  });

  it("finds the last smallest (maximum) when k equals array length", () => {
    const result = kthSmallestElement([7, 10, 4, 3, 20, 15, 8], 7);
    expect(result).toBe(20);
  });

  it("handles a single-element array with k = 1", () => {
    const result = kthSmallestElement([42], 1);
    expect(result).toBe(42);
  });

  it("handles an array with duplicate values", () => {
    const result = kthSmallestElement([5, 5, 5, 5], 2);
    expect(result).toBe(5);
  });

  it("handles negative values", () => {
    const result = kthSmallestElement([-1, -5, -3, -2, -4], 2);
    expect(result).toBe(-4);
  });

  it("handles a two-element array with k = 2", () => {
    const result = kthSmallestElement([10, 20], 2);
    expect(result).toBe(20);
  });

  it("does not mutate the original array", () => {
    const original = [7, 10, 4, 3, 20, 15, 8];
    const originalCopy = [...original];
    kthSmallestElement(original, 3);
    expect(original).toEqual(originalCopy);
  });

  it("finds the 2nd smallest correctly", () => {
    const result = kthSmallestElement([7, 10, 4, 3, 20, 15, 8], 2);
    expect(result).toBe(4);
  });
});
