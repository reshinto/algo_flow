import { describe, it, expect } from "vitest";
import { countingSortDistribution } from "./sources/counting-sort-distribution.ts?fn";

describe("countingSortDistribution", () => {
  it("sorts an unsorted array of non-negative integers", () => {
    expect(countingSortDistribution([64, 34, 25, 12, 22, 11, 90])).toEqual([
      11, 12, 22, 25, 34, 64, 90,
    ]);
  });

  it("handles an already sorted array", () => {
    expect(countingSortDistribution([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(countingSortDistribution([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(countingSortDistribution([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([
      1, 1, 2, 3, 4, 5, 5, 6, 9,
    ]);
  });

  it("handles a single element array", () => {
    expect(countingSortDistribution([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(countingSortDistribution([])).toEqual([]);
  });

  it("handles negative numbers using offset", () => {
    expect(countingSortDistribution([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("handles an array where all elements are the same", () => {
    expect(countingSortDistribution([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = countingSortDistribution(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
