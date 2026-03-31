import { describe, it, expect } from "vitest";
import { kthLargestElement } from "./sources/kth-largest-element.ts?fn";

describe("kthLargestElement", () => {
  it("finds the 3rd largest in the default input", () => {
    const result = kthLargestElement([3, 1, 5, 12, 2, 11, 7, 9], 3);
    expect(result).toBe(9);
  });

  it("finds the 1st largest (maximum)", () => {
    const result = kthLargestElement([3, 1, 5, 12, 2, 11, 7, 9], 1);
    expect(result).toBe(12);
  });

  it("finds the last largest (minimum) when k equals array length", () => {
    const result = kthLargestElement([3, 1, 5, 12, 2, 11, 7, 9], 8);
    expect(result).toBe(1);
  });

  it("handles a single-element array with k = 1", () => {
    const result = kthLargestElement([42], 1);
    expect(result).toBe(42);
  });

  it("handles an array with duplicate values", () => {
    const result = kthLargestElement([5, 5, 5, 5], 2);
    expect(result).toBe(5);
  });

  it("handles negative values", () => {
    const result = kthLargestElement([-1, -5, -3, -2, -4], 2);
    expect(result).toBe(-2);
  });

  it("handles a two-element array with k = 2", () => {
    const result = kthLargestElement([10, 20], 2);
    expect(result).toBe(10);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 5, 12, 2, 11, 7, 9];
    const originalCopy = [...original];
    kthLargestElement(original, 3);
    expect(original).toEqual(originalCopy);
  });

  it("finds the 2nd largest correctly", () => {
    const result = kthLargestElement([7, 10, 4, 3, 20, 15, 8], 2);
    expect(result).toBe(15);
  });
});
