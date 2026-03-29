import { describe, it, expect } from "vitest";
import { houseRobberMemoization } from "./sources/house-robber-memoization.ts?fn";

describe("houseRobberMemoization", () => {
  it("returns 0 for an empty house array", () => {
    expect(houseRobberMemoization([])).toBe(0);
  });

  it("returns the only house value for a single house", () => {
    expect(houseRobberMemoization([5])).toBe(5);
  });

  it("returns the max of two houses for a two-house array", () => {
    expect(houseRobberMemoization([3, 10])).toBe(10);
  });

  it("computes the default input [2, 7, 9, 3, 1] = 12", () => {
    expect(houseRobberMemoization([2, 7, 9, 3, 1])).toBe(12);
  });

  it("handles all equal houses", () => {
    expect(houseRobberMemoization([4, 4, 4, 4])).toBe(8);
  });

  it("computes [1, 2, 3, 1] = 4", () => {
    expect(houseRobberMemoization([1, 2, 3, 1])).toBe(4);
  });

  it("computes [2, 1, 1, 2] = 4", () => {
    expect(houseRobberMemoization([2, 1, 1, 2])).toBe(4);
  });

  it("handles a larger input [5, 3, 4, 11, 2] = 16", () => {
    expect(houseRobberMemoization([5, 3, 4, 11, 2])).toBe(16);
  });
});
