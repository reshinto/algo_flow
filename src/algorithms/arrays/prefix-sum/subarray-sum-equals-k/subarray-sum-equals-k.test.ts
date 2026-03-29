import { describe, it, expect } from "vitest";
import { subarraySumEqualsK } from "./sources/subarray-sum-equals-k.ts?fn";

describe("subarraySumEqualsK", () => {
  it("counts two subarrays for [1,2,3] with target=3", () => {
    /* [1,2] sums to 3, [3] sums to 3 */
    const result = subarraySumEqualsK([1, 2, 3], 3);
    expect(result.count).toBe(2);
  });

  it("returns count=0 when no subarrays match the target", () => {
    const result = subarraySumEqualsK([1, 2, 3], 10);
    expect(result.count).toBe(0);
  });

  it("handles K=0 with alternating positive and negative numbers", () => {
    /* [1,-1], [-1,1], [1,-1,1,-1] all sum to 0 — and [1,-1,1,-1] also contains sub-ranges */
    const result = subarraySumEqualsK([1, -1, 1, -1], 0);
    expect(result.count).toBeGreaterThan(0);
  });

  it("counts single element that equals K", () => {
    const result = subarraySumEqualsK([5, 1, 3], 5);
    expect(result.count).toBe(1);
  });

  it("handles negative numbers in the array", () => {
    /* [3,-1,1] sums to 3, [-1,1,3] sums to 3, [3] sums to 3 */
    const result = subarraySumEqualsK([3, -1, 1, 3], 3);
    expect(result.count).toBeGreaterThanOrEqual(2);
  });

  it("returns count=0 for an empty array", () => {
    const result = subarraySumEqualsK([], 3);
    expect(result.count).toBe(0);
  });

  it("handles the default algorithm input [1,2,3,-1,1,2] with target=3", () => {
    /* Valid subarrays: [1,2], [3], [3,-1,1], [-1,1,3], [1,2] at end */
    const result = subarraySumEqualsK([1, 2, 3, -1, 1, 2], 3);
    expect(result.count).toBeGreaterThan(0);
  });

  it("handles all elements equal to target", () => {
    const result = subarraySumEqualsK([3, 3, 3], 3);
    /* [3] at index 0, [3] at index 1, [3] at index 2 */
    expect(result.count).toBe(3);
  });

  it("handles array with all zeros and target=0", () => {
    /* Every subarray of [0,0,0] sums to 0: [0],[0],[0],[0,0],[0,0],[0,0,0] = 6 */
    const result = subarraySumEqualsK([0, 0, 0], 0);
    expect(result.count).toBe(6);
  });

  it("handles a single element array equal to target", () => {
    const result = subarraySumEqualsK([7], 7);
    expect(result.count).toBe(1);
  });

  it("handles a single element array not equal to target", () => {
    const result = subarraySumEqualsK([4], 7);
    expect(result.count).toBe(0);
  });
});
