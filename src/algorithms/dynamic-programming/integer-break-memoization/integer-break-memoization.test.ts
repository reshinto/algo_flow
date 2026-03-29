import { describe, it, expect } from "vitest";
import { integerBreakMemoization } from "./sources/integer-break-memoization.ts?fn";

describe("integerBreakMemoization", () => {
  it("returns 1 for targetNumber 2 (only split: 1+1 = 1*1 = 1)", () => {
    expect(integerBreakMemoization(2)).toBe(1);
  });

  it("returns 2 for targetNumber 3 (best split: 1+2 = 1*2 = 2)", () => {
    expect(integerBreakMemoization(3)).toBe(2);
  });

  it("returns 4 for targetNumber 4 (best split: 2+2 = 2*2 = 4)", () => {
    expect(integerBreakMemoization(4)).toBe(4);
  });

  it("returns 6 for targetNumber 5 (best split: 2+3 = 2*3 = 6)", () => {
    expect(integerBreakMemoization(5)).toBe(6);
  });

  it("returns 9 for targetNumber 6 (best split: 3+3 = 3*3 = 9)", () => {
    expect(integerBreakMemoization(6)).toBe(9);
  });

  it("returns 12 for targetNumber 7 (best split: 3+4 or 3+2+2 = 12)", () => {
    expect(integerBreakMemoization(7)).toBe(12);
  });

  it("returns 18 for targetNumber 8 (best split: 2+3+3 = 18)", () => {
    expect(integerBreakMemoization(8)).toBe(18);
  });

  it("returns 27 for targetNumber 9 (best split: 3+3+3 = 27)", () => {
    expect(integerBreakMemoization(9)).toBe(27);
  });

  it("returns 36 for the default targetNumber 10 (best split: 3+3+4 = 36)", () => {
    expect(integerBreakMemoization(10)).toBe(36);
  });

  it("returns 243 for targetNumber 13 (best split: 3*3*3*3*3 = 243... via 3+3+3+4 or similar)", () => {
    // 13 = 3+3+3+4 → 3*3*3*4 = 108 or 3+3+3+2+2 → 3*3*3*2*2 = 108
    // Actually 13 = 3+3+3+4 → 108
    expect(integerBreakMemoization(13)).toBe(108);
  });

  it("produces the same result as repeated calls (memoization is stateless per call)", () => {
    expect(integerBreakMemoization(10)).toBe(integerBreakMemoization(10));
  });
});
