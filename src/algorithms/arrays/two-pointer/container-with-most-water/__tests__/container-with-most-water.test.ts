import { describe, it, expect } from "vitest";
import { containerWithMostWater } from "../sources/container-with-most-water.ts?fn";

describe("containerWithMostWater", () => {
  it("finds maxArea=49 for default input [1,8,6,2,5,4,8,3,7]", () => {
    /* Best container: bars at index 1 (h=8) and index 8 (h=7), area = min(8,7)*7 = 49 */
    const result = containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7]);
    expect(result.maxArea).toBe(49);
  });

  it("finds maxArea=1 for [1,1]", () => {
    /* Only one pair: area = min(1,1)*1 = 1 */
    const result = containerWithMostWater([1, 1]);
    expect(result.maxArea).toBe(1);
  });

  it("finds maxArea=15 for all equal [5,5,5,5]", () => {
    /* Best pair is outermost: min(5,5)*3 = 15 */
    const result = containerWithMostWater([5, 5, 5, 5]);
    expect(result.maxArea).toBe(15);
  });

  it("returns maxArea=0 for single element", () => {
    /* No two-bar container possible */
    const result = containerWithMostWater([7]);
    expect(result.maxArea).toBe(0);
  });

  it("returns maxArea=0 for empty array", () => {
    const result = containerWithMostWater([]);
    expect(result.maxArea).toBe(0);
  });

  it("finds correct maxArea for monotonically increasing [1,2,3,4,5]", () => {
    /* Best pair: index 1 (h=2) and index 4 (h=5), area = min(2,5)*3 = 6 */
    const result = containerWithMostWater([1, 2, 3, 4, 5]);
    expect(result.maxArea).toBe(6);
  });

  it("finds correct maxArea for monotonically decreasing [5,4,3,2,1]", () => {
    /* Best pair: index 0 (h=5) and index 3 (h=2), area = min(5,2)*3 = 6 */
    const result = containerWithMostWater([5, 4, 3, 2, 1]);
    expect(result.maxArea).toBe(6);
  });

  it("returns indices within valid range for default input", () => {
    const result = containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7]);
    expect(result.leftIndex).toBeGreaterThanOrEqual(0);
    expect(result.rightIndex).toBeLessThan(9);
    expect(result.leftIndex).toBeLessThan(result.rightIndex);
  });

  it("verifies area at returned indices matches maxArea for default input", () => {
    const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
    const result = containerWithMostWater(heights);
    const verifiedArea =
      Math.min(heights[result.leftIndex]!, heights[result.rightIndex]!) *
      (result.rightIndex - result.leftIndex);
    expect(verifiedArea).toBe(result.maxArea);
  });
});
