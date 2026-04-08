import { describe, it, expect } from "vitest";

import { fibonacciSearch } from "../sources/fibonacci-search.ts?fn";

describe("fibonacciSearch", () => {
  it("finds a value present in the array", () => {
    expect(fibonacciSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 38)).toBe(6);
  });

  it("returns -1 when the value is not in the array", () => {
    expect(fibonacciSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50)).toBe(-1);
  });

  it("handles an empty array", () => {
    expect(fibonacciSearch([], 5)).toBe(-1);
  });

  it("handles a single element array when found", () => {
    expect(fibonacciSearch([42], 42)).toBe(0);
  });

  it("handles a single element array when not found", () => {
    expect(fibonacciSearch([42], 10)).toBe(-1);
  });

  it("finds the first element in the array", () => {
    expect(fibonacciSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2)).toBe(0);
  });

  it("finds the last element in the array", () => {
    expect(fibonacciSearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91)).toBe(9);
  });

  it("finds the middle element in the array", () => {
    expect(fibonacciSearch([10, 20, 30, 40, 50], 30)).toBe(2);
  });

  it("returns -1 for a value smaller than all elements", () => {
    expect(fibonacciSearch([5, 10, 15, 20], 1)).toBe(-1);
  });

  it("returns -1 for a value larger than all elements", () => {
    expect(fibonacciSearch([5, 10, 15, 20], 100)).toBe(-1);
  });

  it("handles negative numbers in the array", () => {
    expect(fibonacciSearch([-10, -5, 0, 3, 7], -5)).toBe(1);
  });

  it("handles an array with two elements, finding the second", () => {
    expect(fibonacciSearch([1, 2], 2)).toBe(1);
  });

  it("finds a value in a two-element array, finding the first", () => {
    expect(fibonacciSearch([1, 2], 1)).toBe(0);
  });
});
