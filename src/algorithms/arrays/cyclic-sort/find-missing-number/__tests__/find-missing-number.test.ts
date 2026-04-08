import { describe, it, expect } from "vitest";
import { findMissingNumber } from "../sources/find-missing-number.ts?fn";

describe("findMissingNumber", () => {
  it("finds missing number in basic case [3,0,1] → 2", () => {
    /* Range 0-3: [3,0,1] is present, 2 is missing */
    const result = findMissingNumber([3, 0, 1]);
    expect(result.missingNumber).toBe(2);
  });

  it("finds missing 0 when array starts at 1", () => {
    /* Range 0-3: [1,2,3] present, 0 is missing */
    const result = findMissingNumber([1, 2, 3]);
    expect(result.missingNumber).toBe(0);
  });

  it("finds missing n when all lower values are present", () => {
    /* Range 0-3: [0,1,2] present, 3 is missing */
    const result = findMissingNumber([0, 1, 2]);
    expect(result.missingNumber).toBe(3);
  });

  it("handles single element array [0] → 1", () => {
    const result = findMissingNumber([0]);
    expect(result.missingNumber).toBe(1);
  });

  it("handles single element array [1] → 0", () => {
    const result = findMissingNumber([1]);
    expect(result.missingNumber).toBe(0);
  });

  it("handles empty array → 0", () => {
    /* Empty array: range is 0..0, so 0 is missing */
    const result = findMissingNumber([]);
    expect(result.missingNumber).toBe(0);
  });

  it("finds missing 4 in larger array", () => {
    /* Range 0-9: [0,1,2,3,5,6,7,8,9] present, 4 is missing */
    const result = findMissingNumber([0, 1, 2, 3, 5, 6, 7, 8, 9]);
    expect(result.missingNumber).toBe(4);
  });

  it("handles unsorted input correctly", () => {
    /* Range 0-7: scrambled order, 2 is missing */
    const result = findMissingNumber([0, 1, 3, 4, 5, 6, 7]);
    expect(result.missingNumber).toBe(2);
  });

  it("handles the default input [3,0,1] → 2", () => {
    /* Default input from algorithm definition */
    const result = findMissingNumber([3, 0, 1]);
    expect(result.missingNumber).toBe(2);
  });
});
