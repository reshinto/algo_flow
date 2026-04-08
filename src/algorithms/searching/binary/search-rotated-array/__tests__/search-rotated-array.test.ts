import { describe, it, expect } from "vitest";

import { searchRotatedArray } from "../sources/search-rotated-array.ts?fn";

describe("searchRotatedArray", () => {
  it("finds the target in a rotated array — default example", () => {
    // [4, 5, 6, 7, 0, 1, 2] rotated from [0, 1, 2, 4, 5, 6, 7]
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
  });

  it("finds the target in the left sorted half", () => {
    // Target 5 is in the sorted left portion [4, 5, 6, 7]
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 5)).toBe(1);
  });

  it("finds the target in the right sorted half", () => {
    // Target 1 is in the sorted right portion [0, 1, 2]
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 1)).toBe(5);
  });

  it("returns -1 when target is not in the array", () => {
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
  });

  it("finds target in a non-rotated (fully sorted) array", () => {
    expect(searchRotatedArray([1, 2, 3, 4, 5, 6, 7], 4)).toBe(3);
  });

  it("finds target at the rotation pivot", () => {
    // Rotated at position 4, target is at position 0
    expect(searchRotatedArray([6, 7, 0, 1, 2, 3, 4, 5], 6)).toBe(0);
  });

  it("handles a single element array when target is found", () => {
    expect(searchRotatedArray([5], 5)).toBe(0);
  });

  it("handles a single element array when target is not found", () => {
    expect(searchRotatedArray([5], 3)).toBe(-1);
  });

  it("finds target at the last index", () => {
    expect(searchRotatedArray([3, 4, 5, 1, 2], 2)).toBe(4);
  });

  it("finds target at the first index", () => {
    expect(searchRotatedArray([3, 4, 5, 1, 2], 3)).toBe(0);
  });

  it("handles a two-element rotated array", () => {
    expect(searchRotatedArray([2, 1], 1)).toBe(1);
  });

  it("handles a two-element rotated array finding the first element", () => {
    expect(searchRotatedArray([2, 1], 2)).toBe(0);
  });

  it("returns -1 for empty array", () => {
    expect(searchRotatedArray([], 5)).toBe(-1);
  });
});
