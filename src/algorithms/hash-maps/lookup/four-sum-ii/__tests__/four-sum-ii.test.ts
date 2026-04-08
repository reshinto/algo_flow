import { describe, it, expect } from "vitest";
import { fourSumII } from "../sources/four-sum-ii.ts?fn";

describe("fourSumII", () => {
  it("returns 2 for the default example", () => {
    expect(fourSumII([1, 2], [-2, -1], [-1, 2], [0, 2])).toBe(2);
  });

  it("returns 0 when no zero-sum quadruples exist", () => {
    expect(fourSumII([1, 2], [3, 4], [5, 6], [7, 8])).toBe(0);
  });

  it("handles all zeros returning n^4 tuples", () => {
    expect(fourSumII([0, 0], [0, 0], [0, 0], [0, 0])).toBe(16);
  });

  it("handles single-element arrays", () => {
    expect(fourSumII([1], [-1], [1], [-1])).toBe(1);
  });

  it("handles negative values across all arrays", () => {
    expect(fourSumII([-1, -2], [1, 2], [1, 2], [-1, -2])).toBe(6);
  });

  it("counts all tuples, not just unique element values", () => {
    // A=[1,1] B=[-1,-1] C=[0] D=[0]: 4 tuples (each A pairs with each B)
    expect(fourSumII([1, 1], [-1, -1], [0], [0])).toBe(4);
  });

  it("handles large complementary values", () => {
    expect(fourSumII([1000], [-1000], [500], [-500])).toBe(1);
  });
});
