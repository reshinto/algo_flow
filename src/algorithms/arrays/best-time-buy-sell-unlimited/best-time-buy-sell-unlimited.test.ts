import { describe, it, expect } from "vitest";
import { bestTimeBuySellUnlimited } from "./sources/best-time-buy-sell-unlimited.ts?fn";

describe("bestTimeBuySellUnlimited", () => {
  it("computes correct profit for the default input", () => {
    /* [7,1,5,3,6,4] → buy at 1 sell at 5 (+4), buy at 3 sell at 6 (+3) = 7 */
    const result = bestTimeBuySellUnlimited([7, 1, 5, 3, 6, 4]);
    expect(result.totalProfit).toBe(7);
  });

  it("returns zero profit for empty prices", () => {
    const result = bestTimeBuySellUnlimited([]);
    expect(result.totalProfit).toBe(0);
    expect(result.transactions).toEqual([]);
  });

  it("returns zero profit for single price", () => {
    const result = bestTimeBuySellUnlimited([5]);
    expect(result.totalProfit).toBe(0);
  });

  it("returns zero profit when prices always fall", () => {
    const result = bestTimeBuySellUnlimited([5, 4, 3, 2, 1]);
    expect(result.totalProfit).toBe(0);
    expect(result.transactions).toEqual([]);
  });

  it("captures full profit for a strictly increasing array", () => {
    /* [1,2,3,4,5] → hold from day 0 to day 4, profit = 4 */
    const result = bestTimeBuySellUnlimited([1, 2, 3, 4, 5]);
    expect(result.totalProfit).toBe(4);
  });

  it("captures multiple transactions for an alternating array", () => {
    /* [1,5,1,5,1,5] → buy at 1 sell at 5 (x3) = profit 12 */
    const result = bestTimeBuySellUnlimited([1, 5, 1, 5, 1, 5]);
    expect(result.totalProfit).toBe(12);
  });

  it("handles all equal prices with zero profit", () => {
    const result = bestTimeBuySellUnlimited([3, 3, 3, 3]);
    expect(result.totalProfit).toBe(0);
  });

  it("handles two prices with a gain", () => {
    const result = bestTimeBuySellUnlimited([1, 7]);
    expect(result.totalProfit).toBe(6);
    expect(result.transactions.length).toBe(1);
  });

  it("handles two prices with no gain", () => {
    const result = bestTimeBuySellUnlimited([7, 1]);
    expect(result.totalProfit).toBe(0);
  });

  it("records correct transaction buy/sell days", () => {
    /* [1,5,3,7] → buy day 0 sell day 1 (profit 4), buy day 2 sell day 3 (profit 4) */
    const result = bestTimeBuySellUnlimited([1, 5, 3, 7]);
    expect(result.totalProfit).toBe(8);
    expect(result.transactions.length).toBe(2);
    expect(result.transactions[0]).toEqual([0, 1]);
    expect(result.transactions[1]).toEqual([2, 3]);
  });

  it("handles a single long rising streak as one transaction", () => {
    /* [2,3,4,5,6] → buy at day 0, sell at day 4, profit=4 */
    const result = bestTimeBuySellUnlimited([2, 3, 4, 5, 6]);
    expect(result.totalProfit).toBe(4);
    expect(result.transactions.length).toBe(1);
    expect(result.transactions[0]).toEqual([0, 4]);
  });
});
