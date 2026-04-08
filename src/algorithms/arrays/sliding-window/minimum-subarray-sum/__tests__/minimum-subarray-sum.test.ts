import { describe, it, expect } from "vitest";
import { minimumSubarraySum } from "../sources/minimum-subarray-sum.ts?fn";

describe("minimumSubarraySum", () => {
  it("finds the minimum subarray in the default input", () => {
    /* [3,-4,2,-3,-1,7,-5]: min subarray is [-4,2,-3,-1] = -6 at indices [1,4] */
    const result = minimumSubarraySum([3, -4, 2, -3, -1, 7, -5]);
    expect(result.minSum).toBe(-6);
    expect(result.startIndex).toBe(1);
    expect(result.endIndex).toBe(4);
  });

  it("returns the single minimum element when all are positive", () => {
    const result = minimumSubarraySum([3, 1, 4, 1, 5]);
    expect(result.minSum).toBe(1);
  });

  it("returns the full array sum when all elements are negative", () => {
    const result = minimumSubarraySum([-1, -2, -3]);
    expect(result.minSum).toBe(-6);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(2);
  });

  it("handles single element array", () => {
    const result = minimumSubarraySum([-5]);
    expect(result.minSum).toBe(-5);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(0);
  });

  it("returns zero values for empty array", () => {
    const result = minimumSubarraySum([]);
    expect(result.minSum).toBe(0);
  });

  it("handles array with single negative amid positives", () => {
    const result = minimumSubarraySum([5, 5, -20, 5, 5]);
    expect(result.minSum).toBe(-20);
    expect(result.startIndex).toBe(2);
    expect(result.endIndex).toBe(2);
  });

  it("handles alternating sign array", () => {
    /* [1,-1,1,-1]: min is -1 (single element) or check: [-1]=−1, [1,-1]=0, [-1,1,-1]=−1, [1,-1,1,-1]=0 — min is -1 */
    const result = minimumSubarraySum([1, -1, 1, -1]);
    expect(result.minSum).toBe(-1);
  });

  it("handles all same negative values", () => {
    const result = minimumSubarraySum([-3, -3, -3]);
    expect(result.minSum).toBe(-9);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(2);
  });

  it("handles mix of large positive and negative", () => {
    /* [100, -200, 100]: min is -200 single element */
    const result = minimumSubarraySum([100, -200, 100]);
    expect(result.minSum).toBe(-200);
    expect(result.startIndex).toBe(1);
    expect(result.endIndex).toBe(1);
  });
});
