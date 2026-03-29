import { describe, it, expect } from "vitest";
import { lisLength } from "./sources/lis-tabulation.ts?fn";

describe("lisLength", () => {
  it("returns 4 for the default sequence [10,9,2,5,3,7,101,18]", () => {
    expect(lisLength([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
  });

  it("returns 4 for [0,1,0,3,2,3]", () => {
    expect(lisLength([0, 1, 0, 3, 2, 3])).toBe(4);
  });

  it("returns 1 for all-equal sequence [7,7,7]", () => {
    expect(lisLength([7, 7, 7])).toBe(1);
  });

  it("returns 1 for a single-element sequence [1]", () => {
    expect(lisLength([1])).toBe(1);
  });

  it("returns 0 for an empty sequence", () => {
    expect(lisLength([])).toBe(0);
  });

  it("returns the full length for a strictly increasing sequence", () => {
    expect(lisLength([1, 2, 3, 4, 5])).toBe(5);
  });

  it("returns 1 for a strictly decreasing sequence", () => {
    expect(lisLength([5, 4, 3, 2, 1])).toBe(1);
  });

  it("handles duplicates correctly — does not count equal elements as increasing", () => {
    expect(lisLength([1, 3, 3, 5])).toBe(3);
  });
});
