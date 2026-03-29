import { describe, it, expect } from "vitest";
import { knapsack01 } from "./sources/knapsack-01.ts?fn";

describe("knapsack01", () => {
  it("returns 10 for weights=[2,3,4,5] values=[3,4,5,6] capacity=8", () => {
    expect(knapsack01([2, 3, 4, 5], [3, 4, 5, 6], 8)).toBe(10);
  });

  it("returns 22 for weights=[1,2,3] values=[6,10,12] capacity=5", () => {
    expect(knapsack01([1, 2, 3], [6, 10, 12], 5)).toBe(22);
  });

  it("returns 0 when single item weight exceeds capacity", () => {
    expect(knapsack01([2], [3], 1)).toBe(0);
  });

  it("returns 1 when single item exactly fits capacity", () => {
    expect(knapsack01([1], [1], 1)).toBe(1);
  });

  it("returns 0 for empty items list", () => {
    expect(knapsack01([], [], 10)).toBe(0);
  });

  it("returns 0 for capacity zero", () => {
    expect(knapsack01([2, 3], [4, 5], 0)).toBe(0);
  });

  it("selects the single best item when only one fits", () => {
    // weights=[3,5], values=[4,10], capacity=5 — only item 1 fits fully, or item 0 alone
    expect(knapsack01([3, 5], [4, 10], 5)).toBe(10);
  });

  it("selects the combination with highest value when multiple items fit", () => {
    // weights=[1,2,3], values=[1,6,10], capacity=5 — best is item1+item2: weight=5, value=16
    expect(knapsack01([1, 2, 3], [1, 6, 10], 5)).toBe(16);
  });

  it("does not reuse items (0/1 constraint)", () => {
    // weights=[3], values=[5], capacity=9 — can only use item once, not three times
    expect(knapsack01([3], [5], 9)).toBe(5);
  });
});
