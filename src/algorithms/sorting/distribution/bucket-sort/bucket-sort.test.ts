import { describe, it, expect } from "vitest";
import { bucketSort } from "./sources/bucket-sort.ts?fn";

describe("bucketSort", () => {
  it("sorts an unsorted array", () => {
    expect(bucketSort([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles an already sorted array", () => {
    expect(bucketSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(bucketSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(bucketSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(bucketSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(bucketSort([])).toEqual([]);
  });

  it("handles negative numbers", () => {
    expect(bucketSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("handles an array where all elements are the same", () => {
    expect(bucketSort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = bucketSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
