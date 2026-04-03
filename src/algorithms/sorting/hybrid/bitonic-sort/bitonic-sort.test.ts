import { describe, it, expect } from "vitest";
import { bitonicSort } from "./sources/bitonic-sort.ts?fn";

describe("bitonicSort", () => {
  it("sorts an unsorted array", () => {
    expect(bitonicSort([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles a power-of-2 sized array", () => {
    expect(bitonicSort([8, 3, 6, 1, 4, 7, 2, 5])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("handles an already sorted array", () => {
    expect(bitonicSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(bitonicSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(bitonicSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(bitonicSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(bitonicSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(bitonicSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = bitonicSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
