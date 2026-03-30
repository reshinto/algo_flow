import { describe, it, expect } from "vitest";
import { jewelsAndStones } from "./sources/jewels-and-stones.ts?fn";

describe("jewelsAndStones", () => {
  it("returns 3 for the default example", () => {
    expect(jewelsAndStones("aA", "aAAbbbb")).toBe(3);
  });

  it("returns 0 when no stones are jewels", () => {
    expect(jewelsAndStones("z", "aAAbbbb")).toBe(0);
  });

  it("returns the full stone count when every stone is a jewel", () => {
    expect(jewelsAndStones("abc", "abcabc")).toBe(6);
  });

  it("handles an empty stones string", () => {
    expect(jewelsAndStones("aA", "")).toBe(0);
  });

  it("handles a single matching stone", () => {
    expect(jewelsAndStones("a", "a")).toBe(1);
  });

  it("handles a single non-matching stone", () => {
    expect(jewelsAndStones("a", "b")).toBe(0);
  });

  it("is case-sensitive — uppercase and lowercase are distinct", () => {
    expect(jewelsAndStones("A", "aA")).toBe(1);
  });

  it("handles duplicate jewel characters without double-counting", () => {
    expect(jewelsAndStones("aa", "aaa")).toBe(3);
  });
});
