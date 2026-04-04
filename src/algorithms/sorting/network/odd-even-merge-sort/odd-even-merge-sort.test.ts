import { describe, it, expect } from "vitest";
import { oddEvenMergeSort } from "./sources/odd-even-merge-sort.ts?fn";

describe("oddEvenMergeSort", () => {
  it("sorts an unsorted array", () => {
    expect(oddEvenMergeSort([6, 3, 8, 1, 7, 2, 5, 4])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("handles an already sorted array", () => {
    expect(oddEvenMergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(oddEvenMergeSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(oddEvenMergeSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(oddEvenMergeSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(oddEvenMergeSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(oddEvenMergeSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [4, 2, 3, 1];
    const sorted = oddEvenMergeSort(original);
    expect(sorted).toEqual([1, 2, 3, 4]);
    expect(original).toEqual([4, 2, 3, 1]);
  });
});
