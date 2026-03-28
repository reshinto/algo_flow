import { describe, it, expect } from "vitest";
import { singleNumber } from "./sources/single-number.ts?fn";

describe("singleNumber", () => {
  it("finds the unique element in a basic array [4,1,2,1,2] → 4", () => {
    /* 1 and 2 each appear twice; 4 appears once */
    const result = singleNumber([4, 1, 2, 1, 2]);
    expect(result.uniqueElement).toBe(4);
  });

  it("handles a single element array [42] → 42", () => {
    const result = singleNumber([42]);
    expect(result.uniqueElement).toBe(42);
  });

  it("finds unique element at the end [1,1,2,2,3] → 3", () => {
    /* 1 and 2 cancel; 3 remains */
    const result = singleNumber([1, 1, 2, 2, 3]);
    expect(result.uniqueElement).toBe(3);
  });

  it("finds unique element at the start [5,3,3,7,7] → 5", () => {
    /* 3 and 7 cancel; 5 remains */
    const result = singleNumber([5, 3, 3, 7, 7]);
    expect(result.uniqueElement).toBe(5);
  });

  it("handles empty array → 0", () => {
    /* XOR of nothing is 0 */
    const result = singleNumber([]);
    expect(result.uniqueElement).toBe(0);
  });

  it("handles negative numbers [-1,2,-1] → 2", () => {
    /* -1 appears twice and cancels; 2 remains */
    const result = singleNumber([-1, 2, -1]);
    expect(result.uniqueElement).toBe(2);
  });

  it("handles the default input [4,1,2,1,2] → 4", () => {
    /* Default input from algorithm definition */
    const result = singleNumber([4, 1, 2, 1, 2]);
    expect(result.uniqueElement).toBe(4);
  });

  it("finds unique element in a larger array", () => {
    /* 10 pairs + 1 unique at position 5 */
    const result = singleNumber([1, 2, 3, 4, 5, 99, 5, 4, 3, 2, 1]);
    expect(result.uniqueElement).toBe(99);
  });

  it("finds unique element of value 0", () => {
    /* 0 is the unique element; 1 and 2 cancel */
    const result = singleNumber([1, 2, 1, 2, 0]);
    expect(result.uniqueElement).toBe(0);
  });
});
