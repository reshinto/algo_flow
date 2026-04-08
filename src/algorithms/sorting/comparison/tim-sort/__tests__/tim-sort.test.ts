import { describe, it, expect } from "vitest";
import { timSort } from "../sources/tim-sort.ts?fn";

describe("timSort", () => {
  it("sorts an unsorted array", () => {
    expect(timSort([8, 3, 6, 1, 5, 2, 7, 4])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("handles an already sorted array", () => {
    expect(timSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(timSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(timSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(timSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(timSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(timSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = timSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });

  it("sorts a larger array correctly", () => {
    const input = [64, 34, 25, 12, 22, 11, 90, 55, 47, 8];
    expect(timSort(input)).toEqual([8, 11, 12, 22, 25, 34, 47, 55, 64, 90]);
  });
});
