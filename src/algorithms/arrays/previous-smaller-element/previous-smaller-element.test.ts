import { describe, it, expect } from "vitest";
import { previousSmallerElement } from "./sources/previous-smaller-element.ts?fn";

describe("previousSmallerElement", () => {
  it("resolves default input [4,10,5,8,20,15,3,12]", () => {
    /* 4→-1, 10→4, 5→4, 8→5, 20→8, 15→8, 3→-1, 12→3 */
    const result = previousSmallerElement([4, 10, 5, 8, 20, 15, 3, 12]);
    expect(result).toEqual([-1, 4, 4, 5, 8, 8, -1, 3]);
  });

  it("returns all -1 for a strictly decreasing array", () => {
    /* Each element has no smaller element to its left */
    const result = previousSmallerElement([5, 4, 3, 2, 1]);
    expect(result).toEqual([-1, -1, -1, -1, -1]);
  });

  it("returns previous values for a strictly increasing array", () => {
    /* Each element's previous smaller is the element immediately before it */
    const result = previousSmallerElement([1, 2, 3, 4, 5]);
    expect(result).toEqual([-1, 1, 2, 3, 4]);
  });

  it("returns all -1 for all equal elements", () => {
    /* Equal elements are not strictly smaller */
    const result = previousSmallerElement([3, 3, 3, 3]);
    expect(result).toEqual([-1, -1, -1, -1]);
  });

  it("handles single element", () => {
    const result = previousSmallerElement([7]);
    expect(result).toEqual([-1]);
  });

  it("handles empty array", () => {
    const result = previousSmallerElement([]);
    expect(result).toEqual([]);
  });

  it("handles two elements where first is smaller", () => {
    const result = previousSmallerElement([2, 5]);
    expect(result).toEqual([-1, 2]);
  });

  it("handles two elements where first is larger", () => {
    const result = previousSmallerElement([5, 2]);
    expect(result).toEqual([-1, -1]);
  });

  it("handles array with duplicates correctly", () => {
    /* Duplicates are not strictly smaller, so equal values return -1 or the prior smaller */
    const result = previousSmallerElement([2, 2, 2]);
    expect(result).toEqual([-1, -1, -1]);
  });

  it("resolves valley-peak pattern", () => {
    /* [1, 3, 2, 4] → 1 has no prev, 3's prev smaller is 1, 2's prev smaller is 1, 4's prev smaller is 2 */
    const result = previousSmallerElement([1, 3, 2, 4]);
    expect(result).toEqual([-1, 1, 1, 2]);
  });
});
