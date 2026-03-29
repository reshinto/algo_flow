import { describe, it, expect } from "vitest";
import { decodeWaysMemoization } from "./sources/decode-ways-memoization.ts?fn";

describe("decodeWaysMemoization", () => {
  it("returns 0 for an empty string", () => {
    expect(decodeWaysMemoization("")).toBe(0);
  });

  it("returns 1 for a single non-zero digit", () => {
    expect(decodeWaysMemoization("1")).toBe(1);
  });

  it("returns 0 for a leading zero", () => {
    expect(decodeWaysMemoization("0")).toBe(0);
  });

  it("returns 2 for '12' — can decode as [1,2] or [12]", () => {
    expect(decodeWaysMemoization("12")).toBe(2);
  });

  it("returns 1 for '27' — only single-digit decoding is valid", () => {
    expect(decodeWaysMemoization("27")).toBe(1);
  });

  it("returns 0 for '30' — '30' is out of range and '0' alone is invalid", () => {
    expect(decodeWaysMemoization("30")).toBe(0);
  });

  it("returns 3 for '123' — [1,2,3], [12,3], [1,23]", () => {
    expect(decodeWaysMemoization("123")).toBe(3);
  });

  it("computes the default input '12321' correctly", () => {
    expect(decodeWaysMemoization("12321")).toBe(6);
  });

  it("returns 1 for '226' decoded as [2,26] or handles all paths", () => {
    expect(decodeWaysMemoization("226")).toBe(3);
  });

  it("returns 0 for a string containing only zeros", () => {
    expect(decodeWaysMemoization("00")).toBe(0);
  });

  it("handles a string with an embedded zero like '1201234'", () => {
    expect(decodeWaysMemoization("1201234")).toBe(3);
  });

  it("matches tabulation results for several inputs", () => {
    const cases: Array<[string, number]> = [
      ["1", 1],
      ["11", 2],
      ["12", 2],
      ["21", 2],
      ["111", 3],
      ["226", 3],
    ];
    for (const [digits, expected] of cases) {
      expect(decodeWaysMemoization(digits)).toBe(expected);
    }
  });
});
