import { describe, it, expect } from "vitest";

import { ternarySearch } from "../sources/ternary-search.ts?fn";

describe("ternarySearch", () => {
  it("finds a value present in the array", () => {
    expect(ternarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 72)).toBe(8);
  });

  it("returns -1 when the value is not in the array", () => {
    expect(ternarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50)).toBe(-1);
  });

  it("handles an empty array", () => {
    expect(ternarySearch([], 5)).toBe(-1);
  });

  it("handles a single element array when found", () => {
    expect(ternarySearch([42], 42)).toBe(0);
  });

  it("handles a single element array when not found", () => {
    expect(ternarySearch([42], 10)).toBe(-1);
  });

  it("finds the first element in the array", () => {
    expect(ternarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2)).toBe(0);
  });

  it("finds the last element in the array", () => {
    expect(ternarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91)).toBe(9);
  });

  it("finds the middle element in the array", () => {
    expect(ternarySearch([10, 20, 30, 40, 50], 30)).toBe(2);
  });

  it("returns -1 for a value smaller than all elements", () => {
    expect(ternarySearch([5, 10, 15, 20], 1)).toBe(-1);
  });

  it("returns -1 for a value larger than all elements", () => {
    expect(ternarySearch([5, 10, 15, 20], 100)).toBe(-1);
  });

  it("handles negative numbers in the array", () => {
    expect(ternarySearch([-10, -5, 0, 3, 7], -5)).toBe(1);
  });

  it("finds an element in a two-element array", () => {
    expect(ternarySearch([1, 2], 2)).toBe(1);
  });

  it("finds an element that lands exactly on mid1 position", () => {
    // Array of 9 elements: mid1=3 on first iteration
    expect(ternarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 4)).toBe(3);
  });

  it("finds an element that lands exactly on mid2 position", () => {
    // Array of 9 elements: mid2=6 on first iteration
    expect(ternarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 7)).toBe(6);
  });
});
