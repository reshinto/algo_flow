import { describe, it, expect } from "vitest";
import { twoPointerSum } from "./sources/two-pointer-sum.ts?fn";

describe("twoPointerSum", () => {
  it("finds a pair summing to the target in a basic sorted array", () => {
    /* [1,2,4,6,8,11,15], target=10: pair is 2+8=10 at indices (1,4) */
    const result = twoPointerSum([1, 2, 4, 6, 8, 11, 15], 10);
    expect(result.found).toBe(true);
    expect(result.leftIndex).toBe(1);
    expect(result.rightIndex).toBe(4);
  });

  it("finds a pair at the outermost positions (first + last)", () => {
    /* [1,2,3,4,5], target=6: pair is 1+5=6 at indices (0,4) */
    const result = twoPointerSum([1, 2, 3, 4, 5], 6);
    expect(result.found).toBe(true);
    expect(result.leftIndex).toBe(0);
    expect(result.rightIndex).toBe(4);
  });

  it("returns not found when no pair sums to the target", () => {
    /* [1,3,5,7], target=2: minimum pair is 1+3=4 > 2, impossible */
    const result = twoPointerSum([1, 3, 5, 7], 2);
    expect(result.found).toBe(false);
    expect(result.leftIndex).toBe(-1);
    expect(result.rightIndex).toBe(-1);
  });

  it("returns not found for a single-element array", () => {
    const result = twoPointerSum([5], 10);
    expect(result.found).toBe(false);
    expect(result.leftIndex).toBe(-1);
    expect(result.rightIndex).toBe(-1);
  });

  it("returns not found for an empty array", () => {
    const result = twoPointerSum([], 10);
    expect(result.found).toBe(false);
    expect(result.leftIndex).toBe(-1);
    expect(result.rightIndex).toBe(-1);
  });

  it("finds a pair when all elements are identical and sum to target", () => {
    /* [5,5,5,5], target=10: pair is 5+5=10 at indices (0,3) */
    const result = twoPointerSum([5, 5, 5, 5], 10);
    expect(result.found).toBe(true);
    expect(result.leftIndex).toBe(0);
    expect(result.rightIndex).toBe(3);
  });

  it("returns not found when all elements are identical but do not sum to target", () => {
    /* [3,3,3,3], target=10: 3+3=6, never equals 10 */
    const result = twoPointerSum([3, 3, 3, 3], 10);
    expect(result.found).toBe(false);
  });

  it("finds a pair with negative numbers", () => {
    /* [-3,-1,0,2,4], target=1: pair is -3+4=1 at indices (0,4) */
    const result = twoPointerSum([-3, -1, 0, 2, 4], 1);
    expect(result.found).toBe(true);
    expect(result.leftIndex).toBe(0);
    expect(result.rightIndex).toBe(4);
  });

  it("finds a pair for the default input from the algorithm definition", () => {
    /* [1,2,4,6,8,11,15], target=10: 2+8=10 */
    const result = twoPointerSum([1, 2, 4, 6, 8, 11, 15], 10);
    expect(result.found).toBe(true);
    const leftValue = [1, 2, 4, 6, 8, 11, 15][result.leftIndex];
    const rightValue = [1, 2, 4, 6, 8, 11, 15][result.rightIndex];
    expect(leftValue! + rightValue!).toBe(10);
  });
});
