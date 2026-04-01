import { describe, it, expect } from "vitest";

import { exponentialSearch } from "./sources/exponential-search.ts?fn";

describe("exponentialSearch", () => {
  it("finds a value present in the array", () => {
    expect(exponentialSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 8)).toBe(2);
  });

  it("returns -1 when the value is not in the array", () => {
    expect(exponentialSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50)).toBe(-1);
  });

  it("handles an empty array", () => {
    expect(exponentialSearch([], 5)).toBe(-1);
  });

  it("handles a single element array when found", () => {
    expect(exponentialSearch([42], 42)).toBe(0);
  });

  it("handles a single element array when not found", () => {
    expect(exponentialSearch([42], 10)).toBe(-1);
  });

  it("finds the first element in the array", () => {
    expect(exponentialSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2)).toBe(0);
  });

  it("finds the last element in the array", () => {
    expect(exponentialSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91)).toBe(9);
  });

  it("finds the middle element in the array", () => {
    expect(exponentialSearch([10, 20, 30, 40, 50], 30)).toBe(2);
  });

  it("returns -1 for a value smaller than all elements", () => {
    expect(exponentialSearch([5, 10, 15, 20], 1)).toBe(-1);
  });

  it("returns -1 for a value larger than all elements", () => {
    expect(exponentialSearch([5, 10, 15, 20], 100)).toBe(-1);
  });

  it("finds a value in a two-element array", () => {
    expect(exponentialSearch([3, 7], 7)).toBe(1);
  });

  it("handles a large array correctly", () => {
    const largeArray = Array.from({ length: 1000 }, (_, idx) => idx * 2);
    expect(exponentialSearch(largeArray, 500)).toBe(250);
  });

  it("finds a target near the beginning of a large array efficiently", () => {
    const largeArray = Array.from({ length: 1000 }, (_, idx) => idx + 1);
    expect(exponentialSearch(largeArray, 3)).toBe(2);
  });
});
