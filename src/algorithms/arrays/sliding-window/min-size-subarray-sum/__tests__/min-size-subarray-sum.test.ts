import { describe, it, expect } from "vitest";
import { minSizeSubarraySum } from "../sources/min-size-subarray-sum.ts?fn";

describe("minSizeSubarraySum", () => {
  it("finds the shortest window in the default input", () => {
    /* [2,3,1,2,4,3], target=7: shortest is [4,3] = length 2 at index 4 */
    const result = minSizeSubarraySum([2, 3, 1, 2, 4, 3], 7);
    expect(result.minLength).toBe(2);
    expect(result.startIndex).toBe(4);
  });

  it("returns length 1 when a single element meets the target", () => {
    const result = minSizeSubarraySum([1, 4, 4], 4);
    expect(result.minLength).toBe(1);
  });

  it("returns 0 when no subarray sums to target", () => {
    const result = minSizeSubarraySum([1, 1, 1, 1], 10);
    expect(result.minLength).toBe(0);
  });

  it("handles the entire array being the minimum window", () => {
    const result = minSizeSubarraySum([1, 2, 3], 6);
    expect(result.minLength).toBe(3);
    expect(result.startIndex).toBe(0);
  });

  it("handles empty array", () => {
    const result = minSizeSubarraySum([], 7);
    expect(result.minLength).toBe(0);
  });

  it("handles target of zero or negative", () => {
    const result = minSizeSubarraySum([1, 2, 3], 0);
    expect(result.minLength).toBe(0);
  });

  it("handles single element equal to target", () => {
    const result = minSizeSubarraySum([7], 7);
    expect(result.minLength).toBe(1);
    expect(result.startIndex).toBe(0);
  });

  it("handles all elements the same", () => {
    /* [3,3,3,3], target=6: first window of length 2 satisfies */
    const result = minSizeSubarraySum([3, 3, 3, 3], 6);
    expect(result.minLength).toBe(2);
  });

  it("handles large values", () => {
    const result = minSizeSubarraySum([100, 1, 1, 1, 1], 100);
    expect(result.minLength).toBe(1);
    expect(result.startIndex).toBe(0);
  });
});
