import { describe, it, expect } from "vitest";
import { slidingWindowMaxDeque } from "./sources/sliding-window-max-deque.ts?fn";

describe("slidingWindowMaxDeque", () => {
  it("returns correct maxima for the default input", () => {
    /* [1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7] */
    const result = slidingWindowMaxDeque([1, 3, -1, -3, 5, 3, 6, 7], 3);
    expect(result).toEqual([3, 3, 5, 5, 6, 7]);
  });

  it("returns empty array for empty input", () => {
    const result = slidingWindowMaxDeque([], 3);
    expect(result).toEqual([]);
  });

  it("returns empty array when window size exceeds array length", () => {
    const result = slidingWindowMaxDeque([1, 2], 5);
    expect(result).toEqual([]);
  });

  it("returns empty array for window size of zero", () => {
    const result = slidingWindowMaxDeque([1, 2, 3], 0);
    expect(result).toEqual([]);
  });

  it("handles window size equal to array length", () => {
    /* [3,1,4,1,5], k=5 → [5] */
    const result = slidingWindowMaxDeque([3, 1, 4, 1, 5], 5);
    expect(result).toEqual([5]);
  });

  it("handles window size of 1 (trivial case)", () => {
    const result = slidingWindowMaxDeque([4, 2, 7, 1, 9], 1);
    expect(result).toEqual([4, 2, 7, 1, 9]);
  });

  it("handles all equal elements", () => {
    const result = slidingWindowMaxDeque([5, 5, 5, 5], 2);
    expect(result).toEqual([5, 5, 5]);
  });

  it("handles decreasing array — first window max carries through", () => {
    /* [9,7,5,3,1], k=3 → [9,7,5] */
    const result = slidingWindowMaxDeque([9, 7, 5, 3, 1], 3);
    expect(result).toEqual([9, 7, 5]);
  });

  it("handles increasing array — last element is always max", () => {
    /* [1,3,5,7,9], k=3 → [5,7,9] */
    const result = slidingWindowMaxDeque([1, 3, 5, 7, 9], 3);
    expect(result).toEqual([5, 7, 9]);
  });

  it("handles negative numbers correctly", () => {
    /* [-4,-2,-5,-1,-3], k=2 → [-2,-2,-1,-1] */
    const result = slidingWindowMaxDeque([-4, -2, -5, -1, -3], 2);
    expect(result).toEqual([-2, -2, -1, -1]);
  });

  it("produces correct number of windows", () => {
    const inputArray = [1, 3, -1, -3, 5, 3, 6, 7];
    const windowSize = 3;
    const result = slidingWindowMaxDeque(inputArray, windowSize);
    expect(result.length).toBe(inputArray.length - windowSize + 1);
  });
});
