import { describe, it, expect } from "vitest";
import { maxSumSubarray } from "./sliding-window";

describe("maxSumSubarray", () => {
  it("finds the max sum window in a basic array", () => {
    /* [2,1,5,1,3,2], k=3: windows are [2,1,5]=8, [1,5,1]=7, [5,1,3]=9, [1,3,2]=6 → max=9 at index 2 */
    const result = maxSumSubarray([2, 1, 5, 1, 3, 2], 3);
    expect(result.maxSum).toBe(9);
    expect(result.windowStartIndex).toBe(2);
  });

  it("handles window at the start being the maximum", () => {
    const result = maxSumSubarray([10, 9, 8, 1, 2, 3], 3);
    expect(result.maxSum).toBe(27);
    expect(result.windowStartIndex).toBe(0);
  });

  it("handles window at the end being the maximum", () => {
    const result = maxSumSubarray([1, 2, 3, 8, 9, 10], 3);
    expect(result.maxSum).toBe(27);
    expect(result.windowStartIndex).toBe(3);
  });

  it("handles array equal to window size", () => {
    const result = maxSumSubarray([3, 5, 7], 3);
    expect(result.maxSum).toBe(15);
    expect(result.windowStartIndex).toBe(0);
  });

  it("handles window size of 1", () => {
    const result = maxSumSubarray([4, 1, 7, 2, 9], 1);
    expect(result.maxSum).toBe(9);
    expect(result.windowStartIndex).toBe(4);
  });

  it("returns zero for empty array", () => {
    const result = maxSumSubarray([], 3);
    expect(result.maxSum).toBe(0);
  });

  it("returns zero when window size exceeds array length", () => {
    const result = maxSumSubarray([1, 2], 5);
    expect(result.maxSum).toBe(0);
  });

  it("handles negative numbers", () => {
    const result = maxSumSubarray([-1, -3, -5, -2, -1, -4], 2);
    expect(result.maxSum).toBe(-3);
    expect(result.windowStartIndex).toBe(3);
  });

  it("handles the default input from the algorithm definition", () => {
    /* k=3: max window is [8,4,3]=15 at index 6 */
    const result = maxSumSubarray([2, 1, 5, 1, 3, 2, 8, 4, 3, 5], 3);
    expect(result.maxSum).toBe(15);
    expect(result.windowStartIndex).toBe(6);
  });
});
