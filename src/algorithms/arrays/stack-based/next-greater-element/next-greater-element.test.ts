import { describe, it, expect } from "vitest";
import { nextGreaterElement } from "./sources/next-greater-element.ts?fn";

describe("nextGreaterElement", () => {
  it("resolves mixed array [4,5,2,10,8] → [5,10,10,-1,-1]", () => {
    /* 5 is next greater for 4; 10 resolves both 2 and 5; 10 and 8 have none to the right */
    const result = nextGreaterElement([4, 5, 2, 10, 8]);
    expect(result).toEqual([5, 10, 10, -1, -1]);
  });

  it("resolves strictly increasing [1,2,3,4] → [2,3,4,-1]", () => {
    /* Each element's next greater is immediately to its right; last element has none */
    const result = nextGreaterElement([1, 2, 3, 4]);
    expect(result).toEqual([2, 3, 4, -1]);
  });

  it("resolves strictly decreasing [4,3,2,1] → [-1,-1,-1,-1]", () => {
    /* No element has a greater element to its right */
    const result = nextGreaterElement([4, 3, 2, 1]);
    expect(result).toEqual([-1, -1, -1, -1]);
  });

  it("resolves all equal [5,5,5] → [-1,-1,-1]", () => {
    /* Equal elements do not satisfy the strictly greater condition */
    const result = nextGreaterElement([5, 5, 5]);
    expect(result).toEqual([-1, -1, -1]);
  });

  it("handles single element [7] → [-1]", () => {
    /* No element to the right */
    const result = nextGreaterElement([7]);
    expect(result).toEqual([-1]);
  });

  it("handles empty array [] → []", () => {
    const result = nextGreaterElement([]);
    expect(result).toEqual([]);
  });

  it("resolves default input [4,5,2,10,8,1,3] → [5,10,10,-1,-1,3,-1]", () => {
    /* 4→5, 5→10, 2→10, 10→-1, 8→-1, 1→3, 3→-1 */
    const result = nextGreaterElement([4, 5, 2, 10, 8, 1, 3]);
    expect(result).toEqual([5, 10, 10, -1, -1, 3, -1]);
  });

  it("handles two-element array where left < right → [right, -1]", () => {
    const result = nextGreaterElement([3, 7]);
    expect(result).toEqual([7, -1]);
  });

  it("handles two-element array where left > right → [-1, -1]", () => {
    const result = nextGreaterElement([9, 2]);
    expect(result).toEqual([-1, -1]);
  });

  it("resolves array with duplicates [2,1,2,4,3] → [4,2,4,-1,-1]", () => {
    /* 2(idx0)→4, 1→2(idx2), 2(idx2)→4, 4→-1, 3→-1 */
    const result = nextGreaterElement([2, 1, 2, 4, 3]);
    expect(result).toEqual([4, 2, 4, -1, -1]);
  });
});
