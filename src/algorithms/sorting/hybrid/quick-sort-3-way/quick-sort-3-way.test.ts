import { describe, it, expect } from "vitest";
import { quickSort3Way } from "./sources/quick-sort-3-way.ts?fn";

describe("quickSort3Way", () => {
  it("sorts an unsorted array", () => {
    expect(quickSort3Way([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles an already sorted array", () => {
    expect(quickSort3Way([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(quickSort3Way([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with many duplicates (3-way specialization)", () => {
    expect(quickSort3Way([3, 3, 3, 3, 3])).toEqual([3, 3, 3, 3, 3]);
  });

  it("handles an array with some duplicate values", () => {
    expect(quickSort3Way([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(quickSort3Way([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(quickSort3Way([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(quickSort3Way([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = quickSort3Way(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
