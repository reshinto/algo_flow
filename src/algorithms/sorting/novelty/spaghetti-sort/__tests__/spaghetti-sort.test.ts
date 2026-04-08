import { describe, it, expect } from "vitest";
import { spaghettiSort } from "../sources/spaghetti-sort.ts?fn";

describe("spaghettiSort", () => {
  it("sorts an unsorted array", () => {
    expect(spaghettiSort([5, 3, 8, 1, 4, 2, 7, 6])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("handles an already sorted array", () => {
    expect(spaghettiSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(spaghettiSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(spaghettiSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(spaghettiSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(spaghettiSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(spaghettiSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = spaghettiSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
