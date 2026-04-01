import { describe, it, expect } from "vitest";

import { upperBoundSearch } from "./sources/upper-bound-search.ts?fn";

describe("upperBoundSearch", () => {
  it("returns the index of the first element strictly greater than target", () => {
    // [1, 3, 3, 5, 5, 5, 8, 12] — first element > 5 is 8 at index 6
    expect(upperBoundSearch([1, 3, 3, 5, 5, 5, 8, 12], 5)).toBe(6);
  });

  it("returns 0 when target is smaller than all elements", () => {
    expect(upperBoundSearch([2, 4, 6, 8], 0)).toBe(0);
  });

  it("returns array length when target is greater than or equal to all elements", () => {
    expect(upperBoundSearch([1, 2, 3, 4], 4)).toBe(4);
  });

  it("returns array length when target exceeds all elements", () => {
    expect(upperBoundSearch([1, 2, 3, 4], 99)).toBe(4);
  });

  it("handles an empty array", () => {
    expect(upperBoundSearch([], 5)).toBe(0);
  });

  it("handles a single element where target is smaller", () => {
    expect(upperBoundSearch([10], 5)).toBe(0);
  });

  it("handles a single element where target equals the element", () => {
    expect(upperBoundSearch([10], 10)).toBe(1);
  });

  it("handles a single element where target is larger", () => {
    expect(upperBoundSearch([10], 20)).toBe(1);
  });

  it("finds the upper bound when all elements are duplicates", () => {
    expect(upperBoundSearch([5, 5, 5, 5, 5], 5)).toBe(5);
  });

  it("finds the correct upper bound for the first element value", () => {
    expect(upperBoundSearch([1, 3, 5, 7, 9], 1)).toBe(1);
  });

  it("finds the correct upper bound for the last element value", () => {
    expect(upperBoundSearch([1, 3, 5, 7, 9], 9)).toBe(5);
  });

  it("finds the upper bound within a range of duplicates in the middle", () => {
    // [1, 3, 3, 3, 7] — first element > 3 is 7 at index 4
    expect(upperBoundSearch([1, 3, 3, 3, 7], 3)).toBe(4);
  });
});
