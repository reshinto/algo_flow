/** Correctness tests for the longestCommonSubsequence pure function. */

import { describe, it, expect } from "vitest";
import { longestCommonSubsequence } from "./sources/longest-common-subsequence.ts?fn";

describe("longestCommonSubsequence", () => {
  it('returns 4 for "ABCBDAB" and "BDCAB"', () => {
    expect(longestCommonSubsequence("ABCBDAB", "BDCAB")).toBe(4);
  });

  it("returns 0 when source is empty", () => {
    expect(longestCommonSubsequence("", "abc")).toBe(0);
  });

  it("returns 0 when target is empty", () => {
    expect(longestCommonSubsequence("abc", "")).toBe(0);
  });

  it("returns 0 for two empty strings", () => {
    expect(longestCommonSubsequence("", "")).toBe(0);
  });

  it("returns the string length for identical strings", () => {
    expect(longestCommonSubsequence("abc", "abc")).toBe(3);
  });

  it("returns 0 when no characters are shared", () => {
    expect(longestCommonSubsequence("abc", "xyz")).toBe(0);
  });

  it("returns 1 for a single shared character", () => {
    expect(longestCommonSubsequence("a", "a")).toBe(1);
  });

  it("returns 0 for single characters that differ", () => {
    expect(longestCommonSubsequence("a", "b")).toBe(0);
  });

  it('returns 4 for "AGGTAB" and "GXTXAYB"', () => {
    // LCS is "GTAB" — length 4
    expect(longestCommonSubsequence("AGGTAB", "GXTXAYB")).toBe(4);
  });

  it('returns 2 for "ABC" and "AC"', () => {
    expect(longestCommonSubsequence("ABC", "AC")).toBe(2);
  });

  it("handles repeated characters correctly", () => {
    // LCS of "aaa" and "aa" is "aa" — length 2
    expect(longestCommonSubsequence("aaa", "aa")).toBe(2);
  });

  it('returns 1 for "AB" and "B"', () => {
    expect(longestCommonSubsequence("AB", "B")).toBe(1);
  });

  it("handles subsequences that are not substrings", () => {
    // "ACE" is an LCS of "ABCDE" and "ACE" — length 3
    expect(longestCommonSubsequence("ABCDE", "ACE")).toBe(3);
  });

  it('returns 3 for "XMJYAUZ" and "MZJAWXU"', () => {
    // LCS is "MJAU" — length 4
    expect(longestCommonSubsequence("XMJYAUZ", "MZJAWXU")).toBe(4);
  });
});
