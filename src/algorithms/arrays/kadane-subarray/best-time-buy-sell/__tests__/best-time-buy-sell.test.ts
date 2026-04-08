import { describe, it, expect } from "vitest";
import { bestTimeBuySell } from "../sources/best-time-buy-sell.ts?fn";

describe("bestTimeBuySell", () => {
  it("finds max profit on the classic example [7,1,5,3,6,4]", () => {
    /* Buy on day 1 (price 1), sell on day 4 (price 6) → profit 5 */
    const result = bestTimeBuySell([7, 1, 5, 3, 6, 4]);
    expect(result.maxProfit).toBe(5);
    expect(result.buyDay).toBe(1);
    expect(result.sellDay).toBe(4);
  });

  it("returns zero profit for all-decreasing prices", () => {
    /* No profitable transaction possible */
    const result = bestTimeBuySell([7, 6, 4, 3, 1]);
    expect(result.maxProfit).toBe(0);
  });

  it("buys first and sells last for all-increasing prices", () => {
    const result = bestTimeBuySell([1, 2, 3, 4, 5]);
    expect(result.maxProfit).toBe(4);
    expect(result.buyDay).toBe(0);
    expect(result.sellDay).toBe(4);
  });

  it("returns zero profit for a single element", () => {
    const result = bestTimeBuySell([42]);
    expect(result.maxProfit).toBe(0);
  });

  it("returns zero profit for an empty array", () => {
    const result = bestTimeBuySell([]);
    expect(result.maxProfit).toBe(0);
    expect(result.buyDay).toBe(-1);
    expect(result.sellDay).toBe(-1);
  });

  it("returns zero profit when all prices are identical", () => {
    const result = bestTimeBuySell([5, 5, 5, 5, 5]);
    expect(result.maxProfit).toBe(0);
  });

  it("handles a single price spike in the middle", () => {
    /* Buy on day 0 (price 1), sell on day 2 (price 100) */
    const result = bestTimeBuySell([1, 100, 2, 3]);
    expect(result.maxProfit).toBe(99);
    expect(result.buyDay).toBe(0);
    expect(result.sellDay).toBe(1);
  });

  it("handles the best transaction at the end of the array", () => {
    const result = bestTimeBuySell([9, 8, 7, 1, 10]);
    expect(result.maxProfit).toBe(9);
    expect(result.buyDay).toBe(3);
    expect(result.sellDay).toBe(4);
  });

  it("selects the correct buy day after multiple new minimums", () => {
    /* Minimums at days 0 (5), 1 (3), 2 (1) — best sell is day 4 (8) */
    const result = bestTimeBuySell([5, 3, 1, 2, 8]);
    expect(result.maxProfit).toBe(7);
    expect(result.buyDay).toBe(2);
    expect(result.sellDay).toBe(4);
  });

  it("handles the default input from the algorithm definition", () => {
    const result = bestTimeBuySell([7, 1, 5, 3, 6, 4]);
    expect(result.maxProfit).toBe(5);
    expect(result.buyDay).toBe(1);
    expect(result.sellDay).toBe(4);
  });

  it("handles two elements where buying first is profitable", () => {
    const result = bestTimeBuySell([1, 9]);
    expect(result.maxProfit).toBe(8);
    expect(result.buyDay).toBe(0);
    expect(result.sellDay).toBe(1);
  });

  it("handles two elements where no profit is possible", () => {
    const result = bestTimeBuySell([9, 1]);
    expect(result.maxProfit).toBe(0);
  });
});
