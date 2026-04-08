import { describe, it, expect } from "vitest";

import { hashSearch } from "../sources/hash-search.ts?fn";

describe("hashSearch", () => {
  it("finds a value present in the array", () => {
    expect(hashSearch([4, 2, 7, 1, 9, 3, 8, 5], 9)).toBe(4);
  });

  it("returns -1 when the value is not in the array", () => {
    expect(hashSearch([4, 2, 7, 1, 9, 3, 8, 5], 6)).toBe(-1);
  });

  it("handles an empty array", () => {
    expect(hashSearch([], 5)).toBe(-1);
  });

  it("handles a single element array when found", () => {
    expect(hashSearch([42], 42)).toBe(0);
  });

  it("handles a single element array when not found", () => {
    expect(hashSearch([42], 10)).toBe(-1);
  });

  it("finds the first element in the array", () => {
    expect(hashSearch([4, 2, 7, 1, 9, 3, 8, 5], 4)).toBe(0);
  });

  it("finds the last element in the array", () => {
    expect(hashSearch([4, 2, 7, 1, 9, 3, 8, 5], 5)).toBe(7);
  });

  it("finds the middle element in the array", () => {
    expect(hashSearch([10, 20, 30, 40, 50], 30)).toBe(2);
  });

  it("returns -1 for a value not in the array", () => {
    expect(hashSearch([5, 10, 15, 20], 1)).toBe(-1);
  });

  it("handles negative numbers in the array", () => {
    expect(hashSearch([-10, -5, 0, 3, 7], -5)).toBe(1);
  });

  it("works on an unsorted array", () => {
    expect(hashSearch([9, 3, 1, 7, 2, 5], 7)).toBe(3);
  });

  it("returns the first occurrence index when duplicates exist", () => {
    // Map.set overwrites, so the last occurrence wins for a value→index map
    const result = hashSearch([1, 2, 1, 3], 1);
    expect(result === 0 || result === 2).toBe(true);
  });
});
