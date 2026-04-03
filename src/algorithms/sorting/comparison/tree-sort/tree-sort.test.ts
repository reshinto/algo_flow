import { describe, it, expect } from "vitest";
import { treeSort } from "./sources/tree-sort.ts?fn";

describe("treeSort", () => {
  it("sorts an unsorted array", () => {
    expect(treeSort([5, 3, 7, 1, 4, 6, 2])).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("handles an already sorted array", () => {
    expect(treeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(treeSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(treeSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(treeSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(treeSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(treeSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = treeSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
