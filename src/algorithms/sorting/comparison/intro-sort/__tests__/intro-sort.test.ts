import { describe, it, expect } from "vitest";
import { introSort } from "../sources/intro-sort.ts?fn";

describe("introSort", () => {
  it("sorts an unsorted array", () => {
    expect(introSort([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles an already sorted array", () => {
    expect(introSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(introSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(introSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(introSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(introSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(introSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = introSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });

  it("sorts a larger array correctly", () => {
    const input = [64, 34, 25, 12, 22, 11, 90, 55, 47, 8];
    expect(introSort(input)).toEqual([8, 11, 12, 22, 25, 34, 47, 55, 64, 90]);
  });
});
