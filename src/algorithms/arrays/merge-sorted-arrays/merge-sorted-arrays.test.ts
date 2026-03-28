import { describe, it, expect } from "vitest";
import { mergeSortedArrays } from "./sources/merge-sorted-arrays.ts?fn";

describe("mergeSortedArrays", () => {
  it("merges two basic sorted arrays into one sorted array", () => {
    const result = mergeSortedArrays([1, 3, 5], [2, 4, 6]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("handles empty first array", () => {
    const result = mergeSortedArrays([], [1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it("handles empty second array", () => {
    const result = mergeSortedArrays([1, 2, 3], []);
    expect(result).toEqual([1, 2, 3]);
  });

  it("handles both arrays empty", () => {
    const result = mergeSortedArrays([], []);
    expect(result).toEqual([]);
  });

  it("handles overlapping values correctly", () => {
    const result = mergeSortedArrays([1, 2, 4], [2, 3, 5]);
    expect(result).toEqual([1, 2, 2, 3, 4, 5]);
  });

  it("handles single element arrays", () => {
    const result = mergeSortedArrays([5], [3]);
    expect(result).toEqual([3, 5]);
  });

  it("handles arrays of different lengths", () => {
    const result = mergeSortedArrays([1, 10], [2, 3, 4, 5, 6]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 10]);
  });

  it("handles default input from the algorithm definition", () => {
    const result = mergeSortedArrays([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
