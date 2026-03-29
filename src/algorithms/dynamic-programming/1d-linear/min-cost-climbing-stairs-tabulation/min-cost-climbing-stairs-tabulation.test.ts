import { describe, it, expect } from "vitest";
import { minCostClimbingStairsTabulation } from "./sources/min-cost-climbing-stairs-tabulation.ts?fn";

describe("minCostClimbingStairsTabulation", () => {
  it("returns 0 for an empty cost array", () => {
    expect(minCostClimbingStairsTabulation([])).toBe(0);
  });

  it("returns 10 for costs [10, 15] — start at step 1, pay nothing, jump to top", () => {
    expect(minCostClimbingStairsTabulation([10, 15])).toBe(10);
  });

  it("returns 15 for costs [10, 15, 20]", () => {
    expect(minCostClimbingStairsTabulation([10, 15, 20])).toBe(15);
  });

  it("returns 30 for the default input costs [10, 15, 20, 5, 25, 10]", () => {
    expect(minCostClimbingStairsTabulation([10, 15, 20, 5, 25, 10])).toBe(30);
  });

  it("returns 6 for the LeetCode example [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]", () => {
    expect(minCostClimbingStairsTabulation([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(6);
  });

  it("returns 0 for a single-element array [5] — start at step 1 and jump over", () => {
    expect(minCostClimbingStairsTabulation([5])).toBe(0);
  });

  it("returns the smaller of two equal costs", () => {
    expect(minCostClimbingStairsTabulation([3, 3])).toBe(3);
  });
});
