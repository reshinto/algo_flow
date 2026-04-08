import { describe, it, expect } from "vitest";
import { lastStoneWeight } from "../sources/last-stone-weight.ts?fn";

describe("lastStoneWeight", () => {
  it("returns 1 for the default input [2, 7, 4, 1, 8, 1]", () => {
    const result = lastStoneWeight([2, 7, 4, 1, 8, 1]);
    expect(result).toBe(1);
  });

  it("returns 1 for [1]", () => {
    const result = lastStoneWeight([1]);
    expect(result).toBe(1);
  });

  it("returns 0 when all stones are equal", () => {
    const result = lastStoneWeight([5, 5]);
    expect(result).toBe(0);
  });

  it("returns difference when two unequal stones", () => {
    const result = lastStoneWeight([3, 7]);
    expect(result).toBe(4);
  });

  it("handles [1, 3] correctly", () => {
    const result = lastStoneWeight([1, 3]);
    expect(result).toBe(2);
  });

  it("handles [1, 1, 1] — one stone should remain", () => {
    const result = lastStoneWeight([1, 1, 1]);
    expect(result).toBe(1);
  });

  it("handles all equal stones of even count", () => {
    const result = lastStoneWeight([4, 4, 4, 4]);
    expect(result).toBe(0);
  });

  it("handles [10, 4, 2, 10] — returns 2", () => {
    // 10 and 10 → 0, 4 and 2 → 2
    const result = lastStoneWeight([10, 4, 2, 10]);
    expect(result).toBe(2);
  });

  it("does not mutate the original array", () => {
    const original = [2, 7, 4, 1, 8, 1];
    const originalCopy = [...original];
    lastStoneWeight(original);
    expect(original).toEqual(originalCopy);
  });

  it("result is non-negative", () => {
    const result = lastStoneWeight([2, 7, 4, 1, 8, 1]);
    expect(result).toBeGreaterThanOrEqual(0);
  });
});
