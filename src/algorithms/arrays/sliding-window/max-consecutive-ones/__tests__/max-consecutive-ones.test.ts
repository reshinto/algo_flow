import { describe, it, expect } from "vitest";
import { maxConsecutiveOnes } from "../sources/max-consecutive-ones.ts?fn";

describe("maxConsecutiveOnes", () => {
  it("finds the longest window for the default input", () => {
    /* [1,1,0,0,1,1,1,0,1,1], maxFlips=2: best window is [1,1,0,0,1,1,1] = length 7 at index 0 */
    const result = maxConsecutiveOnes([1, 1, 0, 0, 1, 1, 1, 0, 1, 1], 2);
    expect(result.maxLength).toBe(7);
    expect(result.startIndex).toBe(0);
  });

  it("returns full array length when maxFlips covers all zeros", () => {
    const result = maxConsecutiveOnes([1, 0, 1, 0, 1], 2);
    expect(result.maxLength).toBe(5);
  });

  it("handles array of all ones", () => {
    const result = maxConsecutiveOnes([1, 1, 1, 1], 0);
    expect(result.maxLength).toBe(4);
    expect(result.startIndex).toBe(0);
  });

  it("handles maxFlips of 0 — no zeros allowed", () => {
    /* [1,1,0,1,1]: longest run of 1s without flipping is 2 */
    const result = maxConsecutiveOnes([1, 1, 0, 1, 1], 0);
    expect(result.maxLength).toBe(2);
  });

  it("returns 0 for empty array", () => {
    const result = maxConsecutiveOnes([], 2);
    expect(result.maxLength).toBe(0);
  });

  it("handles single element of 1", () => {
    const result = maxConsecutiveOnes([1], 0);
    expect(result.maxLength).toBe(1);
    expect(result.startIndex).toBe(0);
  });

  it("handles single element of 0 with flip allowed", () => {
    const result = maxConsecutiveOnes([0], 1);
    expect(result.maxLength).toBe(1);
  });

  it("handles all zeros with k flips", () => {
    const result = maxConsecutiveOnes([0, 0, 0], 2);
    expect(result.maxLength).toBe(2);
  });

  it("picks the rightmost best window on tie", () => {
    /* [1,0,1] with k=1: windows [1,0]=2 at 0 and [0,1]=2 at 1 — first encountered wins */
    const result = maxConsecutiveOnes([1, 0, 1], 1);
    expect(result.maxLength).toBe(3);
  });
});
