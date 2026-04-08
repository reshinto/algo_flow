import { describe, it, expect } from "vitest";
import { flashSort } from "../sources/flash-sort.ts?fn";

describe("flashSort", () => {
  it("sorts an unsorted array", () => {
    expect(flashSort([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles an already sorted array", () => {
    expect(flashSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(flashSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(flashSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(flashSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(flashSort([])).toEqual([]);
  });

  it("handles all identical elements", () => {
    expect(flashSort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = flashSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
