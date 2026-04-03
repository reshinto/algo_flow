import { describe, it, expect } from "vitest";
import { radixSortLsd } from "./sources/radix-sort-lsd.ts?fn";

describe("radixSortLsd", () => {
  it("sorts an unsorted array", () => {
    expect(radixSortLsd([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles an already sorted array", () => {
    expect(radixSortLsd([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(radixSortLsd([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(radixSortLsd([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(radixSortLsd([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(radixSortLsd([])).toEqual([]);
  });

  it("handles multi-digit numbers", () => {
    expect(radixSortLsd([170, 45, 75, 90, 802, 24, 2, 66])).toEqual([
      2, 24, 45, 66, 75, 90, 170, 802,
    ]);
  });

  it("handles negative numbers using offset", () => {
    expect(radixSortLsd([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = radixSortLsd(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
