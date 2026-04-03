import { describe, it, expect } from "vitest";
import { strandSort } from "./sources/strand-sort.ts?fn";

describe("strandSort", () => {
  it("sorts an unsorted array", () => {
    expect(strandSort([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles an already sorted array", () => {
    expect(strandSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(strandSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(strandSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(strandSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(strandSort([])).toEqual([]);
  });

  it("handles an array with negative numbers", () => {
    expect(strandSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = strandSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });

  it("handles a two element array", () => {
    expect(strandSort([2, 1])).toEqual([1, 2]);
  });

  it("extracts multiple strands from an interleaved array", () => {
    // [3, 1, 4, 2, 5] → strand1=[3,4,5], strand2=[1,2]
    expect(strandSort([3, 1, 4, 2, 5])).toEqual([1, 2, 3, 4, 5]);
  });
});
