import { describe, it, expect } from "vitest";
import { subarrayProductLessThanK } from "./sources/subarray-product-less-than-k.ts?fn";

describe("subarrayProductLessThanK", () => {
  it("counts correct subarrays for the default input", () => {
    /* [10,5,2,6,1,3], threshold=100: count = 16 */
    const result = subarrayProductLessThanK([10, 5, 2, 6, 1, 3], 100);
    expect(result.count).toBe(16);
  });

  it("handles threshold of 0 — no subarrays qualify", () => {
    const result = subarrayProductLessThanK([1, 2, 3], 0);
    expect(result.count).toBe(0);
  });

  it("handles threshold of 1 — no subarrays qualify (positive elements >= 1)", () => {
    const result = subarrayProductLessThanK([1, 2, 3], 1);
    expect(result.count).toBe(0);
  });

  it("returns 0 for empty array", () => {
    const result = subarrayProductLessThanK([], 100);
    expect(result.count).toBe(0);
  });

  it("counts correct subarrays when threshold filters multi-element windows", () => {
    /* [1,2,3,4], threshold=5: singles [1,2,3,4] all qualify + pair [1,2]=2 qualifies = 5 */
    const result = subarrayProductLessThanK([1, 2, 3, 4], 5);
    expect(result.count).toBe(5);
  });

  it("handles array of all ones", () => {
    /* [1,1,1], threshold=2: [1]=1, [1]=1, [1]=1, [1,1]=1, [1,1]=1, [1,1,1]=1 = 6 */
    const result = subarrayProductLessThanK([1, 1, 1], 2);
    expect(result.count).toBe(6);
  });

  it("handles single element below threshold", () => {
    const result = subarrayProductLessThanK([5], 10);
    expect(result.count).toBe(1);
  });

  it("handles single element at or above threshold", () => {
    const result = subarrayProductLessThanK([10], 10);
    expect(result.count).toBe(0);
  });

  it("handles large threshold where all subarrays qualify", () => {
    /* [1,2,3], threshold=1000: all 6 subarrays qualify */
    const result = subarrayProductLessThanK([1, 2, 3], 1000);
    expect(result.count).toBe(6);
  });
});
