import { describe, it, expect } from "vitest";
import { bitonicSortNetwork } from "./sources/bitonic-sort-network.ts?fn";

describe("bitonicSortNetwork", () => {
  it("sorts an unsorted array of power-of-2 size", () => {
    expect(bitonicSortNetwork([6, 3, 8, 1, 7, 2, 5, 4])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("sorts an array that is not a power of 2", () => {
    expect(bitonicSortNetwork([5, 3, 1, 4, 2])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an already sorted array", () => {
    expect(bitonicSortNetwork([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("handles a reverse-sorted array", () => {
    expect(bitonicSortNetwork([4, 3, 2, 1])).toEqual([1, 2, 3, 4]);
  });

  it("handles an array with duplicate values", () => {
    expect(bitonicSortNetwork([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(bitonicSortNetwork([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(bitonicSortNetwork([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(bitonicSortNetwork([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [4, 2, 3, 1];
    const sorted = bitonicSortNetwork(original);
    expect(sorted).toEqual([1, 2, 3, 4]);
    expect(original).toEqual([4, 2, 3, 1]);
  });
});
