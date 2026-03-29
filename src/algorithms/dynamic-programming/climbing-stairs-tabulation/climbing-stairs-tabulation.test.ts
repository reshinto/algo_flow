import { describe, it, expect } from "vitest";
import { climbingStairsTabulation } from "./sources/climbing-stairs-tabulation.ts?fn";

describe("climbingStairsTabulation", () => {
  it("returns 1 for 0 stairs", () => {
    expect(climbingStairsTabulation(0)).toBe(1);
  });

  it("returns 1 for 1 stair", () => {
    expect(climbingStairsTabulation(1)).toBe(1);
  });

  it("returns 2 for 2 stairs", () => {
    expect(climbingStairsTabulation(2)).toBe(2);
  });

  it("returns 3 for 3 stairs", () => {
    expect(climbingStairsTabulation(3)).toBe(3);
  });

  it("returns 5 for 4 stairs", () => {
    expect(climbingStairsTabulation(4)).toBe(5);
  });

  it("returns 13 for 6 stairs", () => {
    expect(climbingStairsTabulation(6)).toBe(13);
  });

  it("returns 21 for 7 stairs", () => {
    expect(climbingStairsTabulation(7)).toBe(21);
  });
});
