import { describe, it, expect } from "vitest";
import { mergeKSortedArrays } from "../sources/merge-k-sorted-arrays.ts?fn";

describe("mergeKSortedArrays", () => {
  it("merges the default input into a sorted array", () => {
    const result = mergeKSortedArrays([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]) as number[];
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("returns all elements from all arrays", () => {
    const arrays = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];
    const result = mergeKSortedArrays(arrays) as number[];
    const totalElements = arrays.reduce((sum, arr) => sum + arr.length, 0);
    expect(result).toHaveLength(totalElements);
  });

  it("result is sorted in ascending order", () => {
    const result = mergeKSortedArrays([
      [5, 10],
      [1, 7],
      [3, 8],
    ]) as number[];
    for (let elementIdx = 0; elementIdx < result.length - 1; elementIdx++) {
      expect(result[elementIdx]!).toBeLessThanOrEqual(result[elementIdx + 1]!);
    }
  });

  it("handles arrays of unequal lengths", () => {
    const result = mergeKSortedArrays([[1], [2, 3, 4], [5, 6]]) as number[];
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("handles a single array", () => {
    const result = mergeKSortedArrays([[1, 2, 3]]) as number[];
    expect(result).toEqual([1, 2, 3]);
  });

  it("handles two arrays", () => {
    const result = mergeKSortedArrays([
      [1, 3, 5],
      [2, 4, 6],
    ]) as number[];
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("handles single-element arrays", () => {
    const result = mergeKSortedArrays([[3], [1], [2]]) as number[];
    expect(result).toEqual([1, 2, 3]);
  });

  it("handles duplicate values across arrays", () => {
    const result = mergeKSortedArrays([
      [1, 3, 3],
      [2, 3, 4],
    ]) as number[];
    expect(result).toEqual([1, 2, 3, 3, 3, 4]);
  });

  it("handles arrays with negative numbers", () => {
    const result = mergeKSortedArrays([
      [-3, -1, 0],
      [-2, 1, 2],
    ]) as number[];
    expect(result).toEqual([-3, -2, -1, 0, 1, 2]);
  });

  it("does not mutate the original arrays", () => {
    const original = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];
    const copy = original.map((arr) => [...arr]);
    mergeKSortedArrays(original);
    expect(original).toEqual(copy);
  });
});
