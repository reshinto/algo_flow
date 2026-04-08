import { describe, it, expect } from "vitest";
import { climbingStairsMemoization } from "../sources/climbing-stairs-memoization.ts?fn";

describe("climbingStairsMemoization", () => {
  it("returns 1 for 0 stairs", () => {
    expect(climbingStairsMemoization(0)).toBe(1);
  });

  it("returns 1 for 1 stair", () => {
    expect(climbingStairsMemoization(1)).toBe(1);
  });

  it("returns 2 for 2 stairs", () => {
    expect(climbingStairsMemoization(2)).toBe(2);
  });

  it("computes 13 distinct ways for 6 stairs", () => {
    expect(climbingStairsMemoization(6)).toBe(13);
  });

  it("computes 21 distinct ways for 7 stairs", () => {
    expect(climbingStairsMemoization(7)).toBe(21);
  });

  it("computes 3 distinct ways for 3 stairs", () => {
    expect(climbingStairsMemoization(3)).toBe(3);
  });

  it("computes 5 distinct ways for 4 stairs", () => {
    expect(climbingStairsMemoization(4)).toBe(5);
  });

  it("matches expected sequence for 0 through 7 stairs", () => {
    const expected = [1, 1, 2, 3, 5, 8, 13, 21];
    for (let stairCount = 0; stairCount <= 7; stairCount++) {
      expect(climbingStairsMemoization(stairCount)).toBe(expected[stairCount]);
    }
  });
});
