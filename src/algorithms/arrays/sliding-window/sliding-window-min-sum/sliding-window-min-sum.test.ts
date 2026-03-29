import { describe, it, expect } from "vitest";
import { minSumSubarray } from "./sources/sliding-window-min-sum.ts?fn";

describe("minSumSubarray", () => {
  it("finds the min sum window in a basic array", () => {
    /* [4,2,1,7,8,1,2,8,1,0], k=3:
       windows: [4,2,1]=7, [2,1,7]=10, [1,7,8]=16, [7,8,1]=16, [8,1,2]=11, [1,2,8]=11, [2,8,1]=11, [8,1,0]=9
       min = 7 at index 0 */
    const result = minSumSubarray([4, 2, 1, 7, 8, 1, 2, 8, 1, 0], 3);
    expect(result.minSum).toBe(7);
    expect(result.windowStartIndex).toBe(0);
  });

  it("handles window at the start being the minimum", () => {
    const result = minSumSubarray([1, 2, 3, 8, 9, 10], 3);
    expect(result.minSum).toBe(6);
    expect(result.windowStartIndex).toBe(0);
  });

  it("handles window at the end being the minimum", () => {
    const result = minSumSubarray([10, 9, 8, 1, 2, 3], 3);
    expect(result.minSum).toBe(6);
    expect(result.windowStartIndex).toBe(3);
  });

  it("handles array equal to window size", () => {
    const result = minSumSubarray([3, 5, 7], 3);
    expect(result.minSum).toBe(15);
    expect(result.windowStartIndex).toBe(0);
  });

  it("handles window size of 1", () => {
    const result = minSumSubarray([4, 1, 7, 2, 9], 1);
    expect(result.minSum).toBe(1);
    expect(result.windowStartIndex).toBe(1);
  });

  it("returns zero for empty array", () => {
    const result = minSumSubarray([], 3);
    expect(result.minSum).toBe(0);
  });

  it("returns zero when window size exceeds array length", () => {
    const result = minSumSubarray([1, 2], 5);
    expect(result.minSum).toBe(0);
  });

  it("handles all same elements", () => {
    const result = minSumSubarray([5, 5, 5, 5, 5], 2);
    expect(result.minSum).toBe(10);
    expect(result.windowStartIndex).toBe(0);
  });

  it("handles negative numbers — picks most negative window", () => {
    /* [-1,-3,-5,-2,-1,-4], k=2: windows: [-1,-3]=-4, [-3,-5]=-8, [-5,-2]=-7, [-2,-1]=-3, [-1,-4]=-5 → min=-8 at index 1 */
    const result = minSumSubarray([-1, -3, -5, -2, -1, -4], 2);
    expect(result.minSum).toBe(-8);
    expect(result.windowStartIndex).toBe(1);
  });

  it("handles default input from algorithm definition", () => {
    /* k=3: min window is [4,2,1]=7 at index 0 */
    const result = minSumSubarray([4, 2, 1, 7, 8, 1, 2, 8, 1, 0], 3);
    expect(result.minSum).toBe(7);
    expect(result.windowStartIndex).toBe(0);
  });
});
