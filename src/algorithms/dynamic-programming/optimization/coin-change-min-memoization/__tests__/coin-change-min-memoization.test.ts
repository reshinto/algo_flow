import { describe, it, expect } from "vitest";
import { coinChangeMinMemoization } from "../sources/coin-change-min-memoization.ts?fn";

describe("coinChangeMinMemoization", () => {
  it("returns 0 for amount 0", () => {
    expect(coinChangeMinMemoization(0, [1, 5, 10])).toBe(0);
  });

  it("returns -1 when amount cannot be made with given coins", () => {
    expect(coinChangeMinMemoization(3, [2])).toBe(-1);
  });

  it("returns 1 when amount equals a single coin", () => {
    expect(coinChangeMinMemoization(5, [1, 5, 10])).toBe(1);
  });

  it("computes the default input amount=11 coins=[1,5,10,25] = 2", () => {
    expect(coinChangeMinMemoization(11, [1, 5, 10, 25])).toBe(2);
  });

  it("computes amount=11 coins=[1,5,6,9] = 2", () => {
    expect(coinChangeMinMemoization(11, [1, 5, 6, 9])).toBe(2);
  });

  it("computes amount=3 coins=[1,2] = 2", () => {
    expect(coinChangeMinMemoization(3, [1, 2])).toBe(2);
  });

  it("computes amount=6 coins=[1,3,4] = 2", () => {
    expect(coinChangeMinMemoization(6, [1, 3, 4])).toBe(2);
  });

  it("handles amount=1 with coin=1 = 1", () => {
    expect(coinChangeMinMemoization(1, [1])).toBe(1);
  });

  it("returns -1 when no coins are provided and amount > 0", () => {
    expect(coinChangeMinMemoization(5, [])).toBe(-1);
  });

  it("computes amount=100 coins=[1,5,10,25] = 4", () => {
    expect(coinChangeMinMemoization(100, [1, 5, 10, 25])).toBe(4);
  });
});
