import { describe, it, expect } from "vitest";

import { lowerBoundSearch } from "../sources/lower-bound-search.ts?fn";

describe("lowerBoundSearch", () => {
  it("finds the first occurrence of a repeated value", () => {
    expect(lowerBoundSearch([1, 3, 3, 5, 5, 5, 8, 12], 5)).toBe(3);
  });

  it("finds the exact position when value exists once", () => {
    expect(lowerBoundSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23)).toBe(5);
  });

  it("returns array length when value is larger than all elements", () => {
    expect(lowerBoundSearch([1, 3, 5, 7, 9], 10)).toBe(5);
  });

  it("returns 0 when value is smaller than or equal to the first element", () => {
    expect(lowerBoundSearch([5, 10, 15, 20], 3)).toBe(0);
  });

  it("handles an empty array", () => {
    expect(lowerBoundSearch([], 5)).toBe(0);
  });

  it("handles a single element array when found", () => {
    expect(lowerBoundSearch([42], 42)).toBe(0);
  });

  it("handles a single element array when target is larger", () => {
    expect(lowerBoundSearch([42], 100)).toBe(1);
  });

  it("returns 0 for a target smaller than the first element", () => {
    expect(lowerBoundSearch([5, 10, 15, 20], 1)).toBe(0);
  });

  it("finds the first element correctly", () => {
    expect(lowerBoundSearch([2, 5, 8, 12, 16, 23], 2)).toBe(0);
  });

  it("finds insertion point between existing elements", () => {
    // 6 would be inserted at index 2 (between 5 and 8)
    expect(lowerBoundSearch([2, 5, 8, 12, 16], 6)).toBe(2);
  });

  it("handles all-duplicate array", () => {
    expect(lowerBoundSearch([5, 5, 5, 5, 5], 5)).toBe(0);
  });

  it("returns array length for target larger than all elements in duplicate array", () => {
    expect(lowerBoundSearch([5, 5, 5, 5, 5], 6)).toBe(5);
  });

  it("finds first occurrence of duplicate at array start", () => {
    expect(lowerBoundSearch([3, 3, 3, 5, 7], 3)).toBe(0);
  });
});
