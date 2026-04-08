import { describe, it, expect } from "vitest";
import { minCostClimbingStairsMemoization } from "../sources/min-cost-climbing-stairs-memoization.ts?fn";

describe("minCostClimbingStairsMemoization", () => {
  it("returns 0 for an empty cost array", () => {
    expect(minCostClimbingStairsMemoization([])).toBe(0);
  });

  it("returns 0 for a single step", () => {
    expect(minCostClimbingStairsMemoization([10])).toBe(0);
  });

  it("returns the minimum of two costs for two steps", () => {
    expect(minCostClimbingStairsMemoization([10, 15])).toBe(10);
  });

  it("computes correctly for [10, 15, 20]", () => {
    expect(minCostClimbingStairsMemoization([10, 15, 20])).toBe(15);
  });

  it("computes correctly for the default input [10, 15, 20, 5, 25, 10]", () => {
    expect(minCostClimbingStairsMemoization([10, 15, 20, 5, 25, 10])).toBe(30);
  });

  it("computes correctly for [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]", () => {
    expect(minCostClimbingStairsMemoization([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(6);
  });

  it("computes correctly for equal costs [5, 5, 5, 5]", () => {
    expect(minCostClimbingStairsMemoization([5, 5, 5, 5])).toBe(10);
  });

  it("computes correctly for all zeros", () => {
    expect(minCostClimbingStairsMemoization([0, 0, 0, 0])).toBe(0);
  });

  it("matches tabulation results for standard LeetCode example [10, 15, 20]", () => {
    expect(minCostClimbingStairsMemoization([10, 15, 20])).toBe(15);
  });

  it("matches tabulation results for standard LeetCode example [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]", () => {
    expect(minCostClimbingStairsMemoization([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(6);
  });
});
