import { describe, it, expect } from "vitest";
import { houseRobberTabulation } from "../sources/house-robber-tabulation.ts?fn";

describe("houseRobberTabulation", () => {
  it("returns 0 for an empty array", () => {
    expect(houseRobberTabulation([])).toBe(0);
  });

  it("returns the single value for a one-house array", () => {
    expect(houseRobberTabulation([5])).toBe(5);
  });

  it("returns the larger of two houses", () => {
    expect(houseRobberTabulation([2, 7])).toBe(7);
  });

  it("computes max haul for [2, 7, 9, 3, 1] = 12", () => {
    expect(houseRobberTabulation([2, 7, 9, 3, 1])).toBe(12);
  });

  it("computes max haul for [1, 2, 3, 1] = 4", () => {
    expect(houseRobberTabulation([1, 2, 3, 1])).toBe(4);
  });
});
