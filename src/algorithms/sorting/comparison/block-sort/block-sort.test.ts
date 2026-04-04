import { describe, it, expect } from "vitest";
import { blockSort } from "./sources/block-sort.ts?fn";

describe("blockSort", () => {
  it("sorts an unsorted array", () => {
    expect(blockSort([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles an already sorted array", () => {
    expect(blockSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(blockSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(blockSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(blockSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(blockSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(blockSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = blockSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });

  it("handles a two element array", () => {
    expect(blockSort([2, 1])).toEqual([1, 2]);
  });

  it("handles an array with multiple natural runs", () => {
    // Array with several ascending runs that need merging
    expect(blockSort([1, 3, 5, 2, 4, 6, 0, 7])).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("is stable — equal elements preserve relative order", () => {
    // With equal values, original relative order should be preserved
    const result = blockSort([3, 1, 4, 1, 5, 9, 2, 6]);
    expect(result).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });
});
