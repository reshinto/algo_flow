import { describe, it, expect } from "vitest";

import { sentinelLinearSearch } from "./sources/sentinel-linear-search.ts?fn";

describe("sentinelLinearSearch", () => {
  it("finds a value present in the array", () => {
    expect(sentinelLinearSearch([4, 2, 7, 1, 9, 3, 8, 5], 9)).toBe(4);
  });

  it("returns -1 when the value is not in the array", () => {
    expect(sentinelLinearSearch([4, 2, 7, 1, 9, 3, 8, 5], 6)).toBe(-1);
  });

  it("handles an empty array", () => {
    expect(sentinelLinearSearch([], 5)).toBe(-1);
  });

  it("handles a single element array when found", () => {
    expect(sentinelLinearSearch([42], 42)).toBe(0);
  });

  it("handles a single element array when not found", () => {
    expect(sentinelLinearSearch([42], 10)).toBe(-1);
  });

  it("finds the first element in the array", () => {
    expect(sentinelLinearSearch([4, 2, 7, 1, 9, 3, 8, 5], 4)).toBe(0);
  });

  it("finds the last element in the array", () => {
    expect(sentinelLinearSearch([4, 2, 7, 1, 9, 3, 8, 5], 5)).toBe(7);
  });

  it("returns the first occurrence index for duplicate values", () => {
    expect(sentinelLinearSearch([3, 1, 3, 5, 3], 3)).toBe(0);
  });

  it("searches an array where all elements are identical and target matches", () => {
    expect(sentinelLinearSearch([7, 7, 7, 7], 7)).toBe(0);
  });

  it("searches an array where all elements are identical and target is absent", () => {
    expect(sentinelLinearSearch([7, 7, 7, 7], 5)).toBe(-1);
  });

  it("finds a negative number in the array", () => {
    expect(sentinelLinearSearch([-5, -3, 0, 2, 4], -3)).toBe(1);
  });

  it("returns -1 when a negative target is absent", () => {
    expect(sentinelLinearSearch([-5, -3, 0, 2, 4], -1)).toBe(-1);
  });

  it("works on an unsorted array with no match", () => {
    expect(sentinelLinearSearch([10, 3, 8, 1, 6], 99)).toBe(-1);
  });

  it("correctly handles target matching both an interior element and the last position", () => {
    // 7 appears at index 1 and at index 4 (last) — should return 1
    expect(sentinelLinearSearch([2, 7, 4, 9, 7], 7)).toBe(1);
  });
});
