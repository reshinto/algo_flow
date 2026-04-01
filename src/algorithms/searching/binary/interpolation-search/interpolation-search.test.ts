import { describe, it, expect } from "vitest";

import { interpolationSearch } from "./sources/interpolation-search.ts?fn";

describe("interpolationSearch", () => {
  it("finds a value present in the array", () => {
    expect(interpolationSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23)).toBe(5);
  });

  it("returns -1 when the value is not in the array", () => {
    expect(interpolationSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50)).toBe(-1);
  });

  it("handles an empty array", () => {
    expect(interpolationSearch([], 5)).toBe(-1);
  });

  it("handles a single element array when found", () => {
    expect(interpolationSearch([42], 42)).toBe(0);
  });

  it("handles a single element array when not found", () => {
    expect(interpolationSearch([42], 10)).toBe(-1);
  });

  it("finds the first element in the array", () => {
    expect(interpolationSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2)).toBe(0);
  });

  it("finds the last element in the array", () => {
    expect(interpolationSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91)).toBe(9);
  });

  it("finds the middle element in the array", () => {
    expect(interpolationSearch([10, 20, 30, 40, 50], 30)).toBe(2);
  });

  it("returns -1 for a value smaller than all elements", () => {
    expect(interpolationSearch([5, 10, 15, 20], 1)).toBe(-1);
  });

  it("returns -1 for a value larger than all elements", () => {
    expect(interpolationSearch([5, 10, 15, 20], 100)).toBe(-1);
  });

  it("handles uniformly distributed data correctly", () => {
    const uniformArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    expect(interpolationSearch(uniformArray, 70)).toBe(6);
  });

  it("handles duplicate values via division-by-zero guard", () => {
    expect(interpolationSearch([5, 5, 5, 5, 5], 5)).toBe(0);
  });

  it("returns -1 for a target not in a uniform-value array", () => {
    expect(interpolationSearch([5, 5, 5, 5, 5], 7)).toBe(-1);
  });
});
