import { describe, it, expect } from "vitest";

import { minRotatedArray } from "./sources/min-rotated-array.ts?fn";

describe("minRotatedArray", () => {
  it("finds minimum in a rotated array", () => {
    expect(minRotatedArray([4, 5, 6, 7, 0, 1, 2])).toBe(0);
  });

  it("finds minimum when rotation is at the beginning", () => {
    expect(minRotatedArray([1, 2, 3, 4, 5])).toBe(1);
  });

  it("finds minimum when rotation is at the last position", () => {
    expect(minRotatedArray([2, 3, 4, 5, 1])).toBe(1);
  });

  it("handles a single element array", () => {
    expect(minRotatedArray([42])).toBe(42);
  });

  it("handles a two element array rotated", () => {
    expect(minRotatedArray([2, 1])).toBe(1);
  });

  it("handles a two element array not rotated", () => {
    expect(minRotatedArray([1, 2])).toBe(1);
  });

  it("finds minimum in a fully rotated array where min is at index 0", () => {
    expect(minRotatedArray([0, 1, 2, 4, 5, 6, 7])).toBe(0);
  });

  it("finds minimum with a larger rotation offset", () => {
    expect(minRotatedArray([11, 13, 15, 17, 2, 5, 6, 7])).toBe(2);
  });

  it("handles minimum at the last position", () => {
    expect(minRotatedArray([3, 4, 5, 6, 7, 8, 1])).toBe(1);
  });

  it("handles array where minimum is the pivot", () => {
    expect(minRotatedArray([6, 7, 0, 1, 2, 3, 4, 5])).toBe(0);
  });

  it("handles a three element array", () => {
    expect(minRotatedArray([3, 1, 2])).toBe(1);
  });

  it("handles minimum at the middle", () => {
    expect(minRotatedArray([5, 6, 7, 1, 2, 3, 4])).toBe(1);
  });
});
