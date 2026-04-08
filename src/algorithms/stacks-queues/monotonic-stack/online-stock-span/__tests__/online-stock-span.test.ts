import { describe, it, expect } from "vitest";
import { onlineStockSpan } from "../sources/online-stock-span.ts?fn";

describe("onlineStockSpan", () => {
  it("produces the correct spans for the default example", () => {
    expect(onlineStockSpan([100, 80, 60, 70, 60, 75, 85])).toEqual([1, 1, 1, 2, 1, 4, 6]);
  });

  it("returns span of 1 for a single price", () => {
    expect(onlineStockSpan([50])).toEqual([1]);
  });

  it("returns all 1s for strictly decreasing prices", () => {
    expect(onlineStockSpan([100, 90, 80, 70])).toEqual([1, 1, 1, 1]);
  });

  it("returns incrementing spans for strictly increasing prices", () => {
    expect(onlineStockSpan([10, 20, 30, 40])).toEqual([1, 2, 3, 4]);
  });

  it("returns all equal to length for all equal prices", () => {
    expect(onlineStockSpan([50, 50, 50, 50])).toEqual([1, 2, 3, 4]);
  });

  it("handles a price that spans back over multiple drops and rises", () => {
    // [3, 1, 2] → day 0: span=1, day 1: span=1, day 2: price 2 >= 1 so span=2
    expect(onlineStockSpan([3, 1, 2])).toEqual([1, 1, 2]);
  });

  it("handles two prices where second is greater than first", () => {
    expect(onlineStockSpan([5, 10])).toEqual([1, 2]);
  });

  it("handles two prices where second is less than first", () => {
    expect(onlineStockSpan([10, 5])).toEqual([1, 1]);
  });

  it("handles two equal prices", () => {
    expect(onlineStockSpan([7, 7])).toEqual([1, 2]);
  });

  it("computes correct spans for a zigzag pattern", () => {
    // [1, 3, 1, 3, 1] → spans: [1, 2, 1, 4, 1]
    expect(onlineStockSpan([1, 3, 1, 3, 1])).toEqual([1, 2, 1, 4, 1]);
  });
});
