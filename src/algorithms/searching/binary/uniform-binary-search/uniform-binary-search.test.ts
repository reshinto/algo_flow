import { describe, it, expect } from "vitest";

import { uniformBinarySearch } from "./sources/uniform-binary-search.ts?fn";

describe("uniformBinarySearch", () => {
  it("finds a value present in the array", () => {
    expect(uniformBinarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23)).toBe(5);
  });

  it("returns -1 when the value is not in the array", () => {
    expect(uniformBinarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50)).toBe(-1);
  });

  it("handles an empty array", () => {
    expect(uniformBinarySearch([], 5)).toBe(-1);
  });

  it("handles a single element array when found", () => {
    expect(uniformBinarySearch([42], 42)).toBe(0);
  });

  it("handles a single element array when not found", () => {
    expect(uniformBinarySearch([42], 10)).toBe(-1);
  });

  it("finds the first element in the array", () => {
    expect(uniformBinarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2)).toBe(0);
  });

  it("finds the last element in the array", () => {
    expect(uniformBinarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91)).toBe(9);
  });

  it("finds the middle element in the array", () => {
    expect(uniformBinarySearch([10, 20, 30, 40, 50], 30)).toBe(2);
  });

  it("returns -1 for a value smaller than all elements", () => {
    expect(uniformBinarySearch([5, 10, 15, 20], 1)).toBe(-1);
  });

  it("returns -1 for a value larger than all elements", () => {
    expect(uniformBinarySearch([5, 10, 15, 20], 100)).toBe(-1);
  });

  it("handles a two element array when found", () => {
    expect(uniformBinarySearch([3, 7], 7)).toBe(1);
  });

  it("handles an array of length that is a power of 2", () => {
    expect(uniformBinarySearch([1, 3, 5, 7, 9, 11, 13, 15], 9)).toBe(4);
  });

  it("finds a value near the start after moving left", () => {
    expect(uniformBinarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 5)).toBe(1);
  });
});
