import { describe, it, expect } from "vitest";
import { coinChangeWays } from "./sources/coin-change-ways.ts?fn";

describe("coinChangeWays", () => {
  it("counts 4 ways for amount=5 with coins [1,2,5]", () => {
    expect(coinChangeWays(5, [1, 2, 5])).toBe(4);
  });

  it("returns 0 when no combination can reach the amount (amount=3, coins=[2])", () => {
    expect(coinChangeWays(3, [2])).toBe(0);
  });

  it("returns 1 for amount=0 regardless of coins (one way: use nothing)", () => {
    expect(coinChangeWays(0, [1])).toBe(1);
  });

  it("counts 3 ways for amount=5 with coins [1,2]", () => {
    // Combinations: [1,1,1,1,1], [1,1,1,2], [1,2,2]
    expect(coinChangeWays(5, [1, 2])).toBe(3);
  });

  it("returns 1 for amount=2 with coin [2] (only one exact match)", () => {
    expect(coinChangeWays(2, [2])).toBe(1);
  });

  it("returns 0 for amount=1 with coins [2,5] (no coin fits)", () => {
    expect(coinChangeWays(1, [2, 5])).toBe(0);
  });

  it("handles a single coin that exactly divides the amount", () => {
    expect(coinChangeWays(6, [3])).toBe(1);
  });

  it("counts correctly for amount=10 with coins [1,2,5]", () => {
    expect(coinChangeWays(10, [1, 2, 5])).toBe(10);
  });
});
