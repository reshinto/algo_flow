import { describe, it, expect } from "vitest";
import { sumOfSubarrayMinimums } from "../sources/sum-of-subarray-minimums.ts?fn";

describe("sumOfSubarrayMinimums", () => {
  it("returns 17 for [3, 1, 2, 4]", () => {
    // Subarrays: [3]=3, [1]=1, [2]=2, [4]=4, [3,1]=1, [1,2]=1, [2,4]=2, [3,1,2]=1, [1,2,4]=1, [3,1,2,4]=1
    // Sum = 3+1+2+4+1+1+2+1+1+1 = 17
    expect(sumOfSubarrayMinimums([3, 1, 2, 4])).toBe(17);
  });

  it("returns 444 for [11, 81, 94, 43, 3]", () => {
    expect(sumOfSubarrayMinimums([11, 81, 94, 43, 3])).toBe(444);
  });

  it("returns the element itself for a single-element array", () => {
    expect(sumOfSubarrayMinimums([5])).toBe(5);
  });

  it("handles an array of all equal elements", () => {
    // [2,2,2]: subarrays [2],[2],[2],[2,2],[2,2],[2,2,2] → min is always 2
    // Count of subarrays = n*(n+1)/2 = 6, sum = 6*2 = 12
    expect(sumOfSubarrayMinimums([2, 2, 2])).toBe(12);
  });

  it("handles a strictly increasing array", () => {
    // [1,2,3]: [1]=1,[2]=2,[3]=3,[1,2]=1,[2,3]=2,[1,2,3]=1 → 1+2+3+1+2+1 = 10
    expect(sumOfSubarrayMinimums([1, 2, 3])).toBe(10);
  });

  it("handles a strictly decreasing array", () => {
    // [3,2,1]: [3]=3,[2]=2,[1]=1,[3,2]=2,[2,1]=1,[3,2,1]=1 → 3+2+1+2+1+1 = 10
    expect(sumOfSubarrayMinimums([3, 2, 1])).toBe(10);
  });

  it("handles duplicate values correctly without double-counting", () => {
    // [1,1]: subarrays [1],[1],[1,1] → 1+1+1 = 3
    expect(sumOfSubarrayMinimums([1, 1])).toBe(3);
  });

  it("applies modulo for very large values", () => {
    const largeArray = new Array(100).fill(30000);
    const result = sumOfSubarrayMinimums(largeArray) as number;
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(1_000_000_007);
  });
});
