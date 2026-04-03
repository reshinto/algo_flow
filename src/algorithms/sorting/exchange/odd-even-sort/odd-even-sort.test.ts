import { describe, it, expect } from "vitest";
import { oddEvenSort } from "./sources/odd-even-sort.ts?fn";

describe("oddEvenSort", () => {
  it("sorts an unsorted array", () => {
    expect(oddEvenSort([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles an already sorted array", () => {
    expect(oddEvenSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(oddEvenSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(oddEvenSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(oddEvenSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(oddEvenSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(oddEvenSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = oddEvenSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
