import { describe, it, expect } from "vitest";
import { coinChangeMinTabulation } from "../sources/coin-change-min-tabulation.ts?fn";

describe("coinChangeMinTabulation", () => {
  it("returns 2 for amount=11 with coins=[1,5,10,25] (10+1)", () => {
    expect(coinChangeMinTabulation(11, [1, 5, 10, 25])).toBe(2);
  });

  it("returns -1 when amount=3 cannot be made with coins=[2]", () => {
    expect(coinChangeMinTabulation(3, [2])).toBe(-1);
  });

  it("returns 0 for amount=0 with coins=[1]", () => {
    expect(coinChangeMinTabulation(0, [1])).toBe(0);
  });

  it("returns 2 for amount=6 with coins=[1,3,4]", () => {
    expect(coinChangeMinTabulation(6, [1, 3, 4])).toBe(2);
  });

  it("returns 1 for amount equal to a single coin denomination", () => {
    expect(coinChangeMinTabulation(25, [1, 5, 10, 25])).toBe(1);
  });

  it("returns correct result for greedy-failing input amount=6 coins=[1,3,4]", () => {
    // Greedy would pick 4+1+1=3 coins; DP correctly finds 3+3=2 coins
    expect(coinChangeMinTabulation(6, [1, 3, 4])).toBe(2);
  });

  it("returns -1 when no combination can reach the amount", () => {
    expect(coinChangeMinTabulation(7, [3, 6])).toBe(-1);
  });

  it("handles a single coin denomination that divides evenly", () => {
    expect(coinChangeMinTabulation(10, [5])).toBe(2);
  });
});
