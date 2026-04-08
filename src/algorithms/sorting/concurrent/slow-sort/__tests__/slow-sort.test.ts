import { describe, it, expect } from "vitest";
import { slowSort } from "../sources/slow-sort.ts?fn";

describe("slowSort", () => {
  it("sorts an unsorted array", () => {
    expect(slowSort([5, 3, 1, 4, 2])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an already sorted array", () => {
    expect(slowSort([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("handles a reverse-sorted array", () => {
    expect(slowSort([3, 2, 1])).toEqual([1, 2, 3]);
  });

  it("handles an array with duplicate values", () => {
    expect(slowSort([3, 1, 2, 1, 3])).toEqual([1, 1, 2, 3, 3]);
  });

  it("handles a single element array", () => {
    expect(slowSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(slowSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(slowSort([3, -1, 2])).toEqual([-1, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [5, 3, 1, 4, 2];
    const sorted = slowSort(original);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
    expect(original).toEqual([5, 3, 1, 4, 2]);
  });
});
