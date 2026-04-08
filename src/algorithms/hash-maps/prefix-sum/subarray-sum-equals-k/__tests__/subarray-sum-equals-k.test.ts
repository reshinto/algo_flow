import { describe, it, expect } from "vitest";
import { subarraySumEqualsK } from "../sources/subarray-sum-equals-k.ts?fn";

describe("subarraySumEqualsK", () => {
  it("counts two subarrays for the default example [1,1,1] with target 2", () => {
    expect(subarraySumEqualsK([1, 1, 1], 2)).toBe(2);
  });

  it("returns 2 for [1,2,3] with target 3", () => {
    // Subarrays: [3] at index 2, and [1,2] at indices 0-1
    expect(subarraySumEqualsK([1, 2, 3], 3)).toBe(2);
  });

  it("returns 0 when no subarray sums to the target", () => {
    expect(subarraySumEqualsK([1, 2, 3], 10)).toBe(0);
  });

  it("handles a single-element array matching the target", () => {
    expect(subarraySumEqualsK([5], 5)).toBe(1);
  });

  it("handles a single-element array not matching the target", () => {
    expect(subarraySumEqualsK([5], 3)).toBe(0);
  });

  it("handles negative numbers in the array", () => {
    // [1, -1, 1] with target 1: subarrays [1], [1,-1,1], [1]
    expect(subarraySumEqualsK([1, -1, 1], 1)).toBe(3);
  });

  it("handles the entire array summing to the target", () => {
    expect(subarraySumEqualsK([1, 2, 3, 4], 10)).toBe(1);
  });

  it("counts multiple overlapping subarrays correctly", () => {
    // [0, 0, 0] with target 0: subarrays [0], [0,0], [0,0,0], [0], [0,0], [0] = 6
    expect(subarraySumEqualsK([0, 0, 0], 0)).toBe(6);
  });

  it("handles an array with all same elements", () => {
    // [2, 2, 2, 2] with target 4: [2,2] starting at 0, [2,2] starting at 1, [2,2] starting at 2 = 3
    expect(subarraySumEqualsK([2, 2, 2, 2], 4)).toBe(3);
  });

  it("handles target of zero with mixed positive and negative values", () => {
    // [1, -1, 2, -2] with target 0: [1,-1], [2,-2], [1,-1,2,-2] = 3
    expect(subarraySumEqualsK([1, -1, 2, -2], 0)).toBe(3);
  });
});
