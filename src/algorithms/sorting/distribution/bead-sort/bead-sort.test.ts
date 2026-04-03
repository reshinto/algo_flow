import { describe, it, expect } from "vitest";
import { beadSort } from "./sources/bead-sort.ts?fn";

describe("beadSort", () => {
  it("sorts an unsorted array", () => {
    expect(beadSort([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it("handles an already sorted array", () => {
    expect(beadSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(beadSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(beadSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(beadSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(beadSort([])).toEqual([]);
  });

  it("handles all identical elements", () => {
    expect(beadSort([7, 7, 7, 7])).toEqual([7, 7, 7, 7]);
  });

  it("handles an array with all zeros", () => {
    expect(beadSort([0, 0, 0])).toEqual([0, 0, 0]);
  });

  it("handles negative numbers by offsetting", () => {
    expect(beadSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = beadSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
