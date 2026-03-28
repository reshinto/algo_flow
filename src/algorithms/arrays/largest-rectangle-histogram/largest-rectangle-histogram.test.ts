import { describe, it, expect } from "vitest";
import { largestRectangleHistogram } from "./sources/largest-rectangle-histogram.ts?fn";

describe("largestRectangleHistogram", () => {
  it("computes the largest rectangle for the default input", () => {
    /* [2,1,5,6,2,3] → max area = 10 (heights 5 and 6 span indices 2-3) */
    const result = largestRectangleHistogram([2, 1, 5, 6, 2, 3]);
    expect(result.maxArea).toBe(10);
  });

  it("returns zero area for an empty array", () => {
    const result = largestRectangleHistogram([]);
    expect(result.maxArea).toBe(0);
    expect(result.leftIndex).toBe(-1);
    expect(result.rightIndex).toBe(-1);
  });

  it("handles a single bar", () => {
    const result = largestRectangleHistogram([5]);
    expect(result.maxArea).toBe(5);
    expect(result.leftIndex).toBe(0);
    expect(result.rightIndex).toBe(0);
    expect(result.height).toBe(5);
  });

  it("handles all equal-height bars", () => {
    /* [3,3,3,3] → max area = 12 (all 4 bars at height 3) */
    const result = largestRectangleHistogram([3, 3, 3, 3]);
    expect(result.maxArea).toBe(12);
  });

  it("handles strictly increasing heights", () => {
    /* [1,2,3,4,5] → max area = 9 (bars 2-5 at height 3, or bar 5 alone = 5, but 3×3=9) */
    const result = largestRectangleHistogram([1, 2, 3, 4, 5]);
    expect(result.maxArea).toBe(9);
  });

  it("handles strictly decreasing heights", () => {
    /* [5,4,3,2,1] → max area = 9 (bars 0-2 at height 3) */
    const result = largestRectangleHistogram([5, 4, 3, 2, 1]);
    expect(result.maxArea).toBe(9);
  });

  it("handles a valley shape", () => {
    /* [5,0,5] → max area = 5 (single bar of height 5) */
    const result = largestRectangleHistogram([5, 0, 5]);
    expect(result.maxArea).toBe(5);
  });

  it("handles two tall bars next to each other", () => {
    /* [6,6] → max area = 12 */
    const result = largestRectangleHistogram([6, 6]);
    expect(result.maxArea).toBe(12);
  });

  it("handles heights with a tall spike in the middle", () => {
    /* [2,10,2] → max area = 10 (single bar of height 10) or 2*3=6; 10 wins */
    const result = largestRectangleHistogram([2, 10, 2]);
    expect(result.maxArea).toBe(10);
  });

  it("returns correct left and right indices for the best span", () => {
    /* [2,1,5,6,2,3] → span [2,3] at height 5 gives area 10 */
    const result = largestRectangleHistogram([2, 1, 5, 6, 2, 3]);
    expect(result.leftIndex).toBe(2);
    expect(result.rightIndex).toBe(3);
    expect(result.height).toBe(5);
  });
});
