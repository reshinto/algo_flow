import { describe, it, expect } from "vitest";
import { pairwiseSortingNetwork } from "../sources/pairwise-sorting-network.ts?fn";

describe("pairwiseSortingNetwork", () => {
  it("sorts an unsorted array", () => {
    expect(pairwiseSortingNetwork([5, 3, 8, 1, 4, 2, 7, 6])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("handles an already sorted array", () => {
    expect(pairwiseSortingNetwork([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("handles a reverse-sorted array", () => {
    expect(pairwiseSortingNetwork([4, 3, 2, 1])).toEqual([1, 2, 3, 4]);
  });

  it("handles a single element array", () => {
    expect(pairwiseSortingNetwork([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(pairwiseSortingNetwork([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(pairwiseSortingNetwork([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [4, 2, 3, 1];
    const sorted = pairwiseSortingNetwork(original);
    expect(sorted).toEqual([1, 2, 3, 4]);
    expect(original).toEqual([4, 2, 3, 1]);
  });
});
