import { describe, it, expect } from "vitest";
import { firstNegativeInWindow } from "../sources/first-negative-in-window.ts?fn";

describe("firstNegativeInWindow", () => {
  it("returns the first negative in each window for the default input", () => {
    /* [12,-1,-7,8,-15,30,16,28], k=3:
       [12,-1,-7]→-1, [-1,-7,8]→-1, [-7,8,-15]→-7, [8,-15,30]→-15, [-15,30,16]→-15, [30,16,28]→0 */
    const result = firstNegativeInWindow([12, -1, -7, 8, -15, 30, 16, 28], 3);
    expect(result).toEqual([-1, -1, -7, -15, -15, 0]);
  });

  it("returns 0 for all windows when no negatives exist", () => {
    const result = firstNegativeInWindow([1, 2, 3, 4, 5], 3);
    expect(result).toEqual([0, 0, 0]);
  });

  it("returns the negative itself when all elements are negative", () => {
    /* All negatives: first negative is always the leftmost in each window */
    const result = firstNegativeInWindow([-3, -5, -2, -8], 2);
    expect(result).toEqual([-3, -5, -2]);
  });

  it("handles window size of 1", () => {
    const result = firstNegativeInWindow([4, -2, 3, -1], 1);
    expect(result).toEqual([0, -2, 0, -1]);
  });

  it("handles window spanning the entire array", () => {
    const result = firstNegativeInWindow([1, 2, -3, 4], 4);
    expect(result).toEqual([-3]);
  });

  it("returns empty array for empty input", () => {
    const result = firstNegativeInWindow([], 3);
    expect(result).toEqual([]);
  });

  it("returns empty array when window size exceeds array length", () => {
    const result = firstNegativeInWindow([1, 2], 5);
    expect(result).toEqual([]);
  });

  it("returns empty array for window size zero", () => {
    const result = firstNegativeInWindow([1, -2, 3], 0);
    expect(result).toEqual([]);
  });

  it("produces the correct number of output values", () => {
    const inputArray = [12, -1, -7, 8, -15, 30, 16, 28];
    const windowSize = 3;
    const result = firstNegativeInWindow(inputArray, windowSize);
    expect(result).toHaveLength(inputArray.length - windowSize + 1);
  });
});
