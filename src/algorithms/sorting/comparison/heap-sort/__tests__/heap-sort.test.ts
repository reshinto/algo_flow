import { describe, it, expect } from "vitest";
import { heapSort } from "../sources/heap-sort.ts?fn";

describe("heapSort", () => {
  it("sorts an unsorted array", () => {
    expect(heapSort([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles an already sorted array", () => {
    expect(heapSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(heapSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(heapSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(heapSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(heapSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(heapSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = heapSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
