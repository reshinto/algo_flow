import { describe, it, expect } from "vitest";
import { integerBreakTabulation } from "../sources/integer-break-tabulation.ts?fn";

describe("integerBreakTabulation", () => {
  it("returns 1 for targetNumber 2 (only split: 1+1=1×1)", () => {
    expect(integerBreakTabulation(2)).toBe(1);
  });

  it("returns 2 for targetNumber 3 (split: 1+2=1×2)", () => {
    expect(integerBreakTabulation(3)).toBe(2);
  });

  it("returns 4 for targetNumber 4 (split: 2+2=2×2)", () => {
    expect(integerBreakTabulation(4)).toBe(4);
  });

  it("returns 6 for targetNumber 5 (split: 2+3=2×3)", () => {
    expect(integerBreakTabulation(5)).toBe(6);
  });

  it("returns 9 for targetNumber 6 (split: 3+3=3×3)", () => {
    expect(integerBreakTabulation(6)).toBe(9);
  });

  it("returns 18 for targetNumber 8 (split: 2+3+3=2×3×3)", () => {
    expect(integerBreakTabulation(8)).toBe(18);
  });

  it("returns 36 for targetNumber 10 (split: 3+3+4=3×3×4 or 2+4+4, optimal is 3+3+2+2=36)", () => {
    expect(integerBreakTabulation(10)).toBe(36);
  });
});
