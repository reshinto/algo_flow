import { describe, it, expect } from "vitest";
import { patienceSort } from "./sources/patience-sort.ts?fn";

describe("patienceSort", () => {
  it("sorts an unsorted array", () => {
    expect(patienceSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  it("handles an already sorted array", () => {
    expect(patienceSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(patienceSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(patienceSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(patienceSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(patienceSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(patienceSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = patienceSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });

  it("sorts a larger array correctly", () => {
    const input = [64, 34, 25, 12, 22, 11, 90, 55, 47, 8];
    expect(patienceSort(input)).toEqual([8, 11, 12, 22, 25, 34, 47, 55, 64, 90]);
  });
});
