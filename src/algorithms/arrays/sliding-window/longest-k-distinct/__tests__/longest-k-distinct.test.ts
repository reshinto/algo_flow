import { describe, it, expect } from "vitest";
import { longestKDistinct } from "../sources/longest-k-distinct.ts?fn";

describe("longestKDistinct", () => {
  it("finds the longest subarray with at most 2 distinct values for the default input", () => {
    /* [1,2,1,2,3,3,4,1], k=2: longest is [1,2,1,2] of length 4 at index 0 or [2,3,3] of length 3... actually [1,2,1,2]=4 */
    const result = longestKDistinct([1, 2, 1, 2, 3, 3, 4, 1], 2);
    expect(result.maxLength).toBe(4);
  });

  it("handles k=1 (all same elements must be chosen)", () => {
    /* [1,2,2,3,3,3], k=1: longest run of same element is [3,3,3]=3 at index 3 */
    const result = longestKDistinct([1, 2, 2, 3, 3, 3], 1);
    expect(result.maxLength).toBe(3);
    expect(result.startIndex).toBe(3);
  });

  it("returns the entire array when k >= number of distinct elements", () => {
    const result = longestKDistinct([1, 2, 3], 5);
    expect(result.maxLength).toBe(3);
    expect(result.startIndex).toBe(0);
  });

  it("handles all identical elements", () => {
    const result = longestKDistinct([2, 2, 2, 2], 2);
    expect(result.maxLength).toBe(4);
    expect(result.startIndex).toBe(0);
  });

  it("handles k=0 returning maxLength 0", () => {
    const result = longestKDistinct([1, 2, 3], 0);
    expect(result.maxLength).toBe(0);
  });

  it("handles empty array", () => {
    const result = longestKDistinct([], 2);
    expect(result.maxLength).toBe(0);
  });

  it("handles single element array", () => {
    const result = longestKDistinct([7], 1);
    expect(result.maxLength).toBe(1);
    expect(result.startIndex).toBe(0);
  });

  it("returns a valid startIndex within array bounds", () => {
    const inputArray = [1, 2, 1, 2, 3, 3, 4, 1];
    const result = longestKDistinct(inputArray, 2);
    expect(result.startIndex).toBeGreaterThanOrEqual(0);
    expect(result.startIndex).toBeLessThan(inputArray.length);
  });

  it("the subarray at startIndex of maxLength has at most k distinct values", () => {
    const inputArray = [1, 2, 1, 2, 3, 3, 4, 1];
    const maxDistinct = 2;
    const result = longestKDistinct(inputArray, maxDistinct);
    const subarray = inputArray.slice(result.startIndex, result.startIndex + result.maxLength);
    const distinctCount = new Set(subarray).size;
    expect(distinctCount).toBeLessThanOrEqual(maxDistinct);
  });
});
