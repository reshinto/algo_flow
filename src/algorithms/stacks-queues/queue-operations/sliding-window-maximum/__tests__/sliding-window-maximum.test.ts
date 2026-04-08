import { describe, it, expect } from "vitest";
import { slidingWindowMaxMonotonic } from "../sources/sliding-window-maximum.ts?fn";

describe("slidingWindowMaxMonotonic", () => {
  it("returns correct maxima for the default LeetCode 239 example", () => {
    expect(slidingWindowMaxMonotonic([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([3, 3, 5, 5, 6, 7]);
  });

  it("returns each element when window size equals array length", () => {
    expect(slidingWindowMaxMonotonic([4, 2, 7], 3)).toEqual([7]);
  });

  it("returns the array unchanged when window size is 1", () => {
    expect(slidingWindowMaxMonotonic([5, 3, 8, 1], 1)).toEqual([5, 3, 8, 1]);
  });

  it("handles a strictly increasing array", () => {
    expect(slidingWindowMaxMonotonic([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5]);
  });

  it("handles a strictly decreasing array", () => {
    expect(slidingWindowMaxMonotonic([5, 4, 3, 2, 1], 3)).toEqual([5, 4, 3]);
  });

  it("handles negative numbers correctly", () => {
    expect(slidingWindowMaxMonotonic([-4, -2, -7, -1], 2)).toEqual([-2, -2, -1]);
  });

  it("handles a single-element array with window size 1", () => {
    expect(slidingWindowMaxMonotonic([42], 1)).toEqual([42]);
  });

  it("handles all equal elements", () => {
    expect(slidingWindowMaxMonotonic([3, 3, 3, 3], 2)).toEqual([3, 3, 3]);
  });
});
