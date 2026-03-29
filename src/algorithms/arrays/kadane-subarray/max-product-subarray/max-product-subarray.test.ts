import { describe, it, expect } from "vitest";
import { maxProductSubarray } from "./sources/max-product-subarray.ts?fn";

describe("maxProductSubarray", () => {
  it("finds the max product subarray for the default input", () => {
    /* [2,3,-2,4,-1,2]: max product is 2*3*-2*4*-1*2=96, subarray is entire array */
    const result = maxProductSubarray([2, 3, -2, 4, -1, 2]);
    expect(result.maxProduct).toBe(96);
  });

  it("handles an array with all positive numbers", () => {
    /* [1,2,3,4]: max product is 1*2*3*4=24 */
    const result = maxProductSubarray([1, 2, 3, 4]);
    expect(result.maxProduct).toBe(24);
  });

  it("handles an array with a zero breaking the product", () => {
    /* [2,3,0,4,5]: max product is 4*5=20 */
    const result = maxProductSubarray([2, 3, 0, 4, 5]);
    expect(result.maxProduct).toBe(20);
  });

  it("handles an array with a single element", () => {
    const result = maxProductSubarray([7]);
    expect(result.maxProduct).toBe(7);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(0);
  });

  it("handles all negative numbers — best is the single largest (least negative)", () => {
    /* [-3,-2,-5]: best single is -2 */
    const result = maxProductSubarray([-3, -2, -5]);
    expect(result.maxProduct).toBe(10);
  });

  it("handles two negatives giving a positive product", () => {
    /* [-2,-3]: product = 6 */
    const result = maxProductSubarray([-2, -3]);
    expect(result.maxProduct).toBe(6);
  });

  it("handles negative flipping sign to reveal max product", () => {
    /* [-2,3,-4]: -2*3*-4=24 */
    const result = maxProductSubarray([-2, 3, -4]);
    expect(result.maxProduct).toBe(24);
  });

  it("returns 0 for empty array", () => {
    const result = maxProductSubarray([]);
    expect(result.maxProduct).toBe(0);
  });

  it("returns valid start and end indices within array bounds", () => {
    const inputArray = [2, 3, -2, 4, -1, 2];
    const result = maxProductSubarray(inputArray);
    expect(result.startIndex).toBeGreaterThanOrEqual(0);
    expect(result.endIndex).toBeLessThan(inputArray.length);
    expect(result.startIndex).toBeLessThanOrEqual(result.endIndex);
  });
});
