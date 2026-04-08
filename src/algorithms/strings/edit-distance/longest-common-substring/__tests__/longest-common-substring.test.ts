/** Correctness tests for the longestCommonSubstring pure function. */

import { describe, it, expect } from "vitest";
import { longestCommonSubstring } from "../sources/longest-common-substring.ts?fn";

describe("longestCommonSubstring", () => {
  it('finds the longest common substring between "ABABC" and "BABCBA" (length 4)', () => {
    expect(longestCommonSubstring("ABABC", "BABCBA")).toBe(4);
  });

  it("returns 0 when source is empty", () => {
    expect(longestCommonSubstring("", "abc")).toBe(0);
  });

  it("returns 0 when target is empty", () => {
    expect(longestCommonSubstring("abc", "")).toBe(0);
  });

  it("returns 0 for two empty strings", () => {
    expect(longestCommonSubstring("", "")).toBe(0);
  });

  it("returns full length for identical strings", () => {
    expect(longestCommonSubstring("abc", "abc")).toBe(3);
  });

  it("returns 0 for completely different strings", () => {
    expect(longestCommonSubstring("abc", "xyz")).toBe(0);
  });

  it("finds a single matching character", () => {
    expect(longestCommonSubstring("abc", "xbz")).toBe(1);
  });

  it("handles single-character strings that match", () => {
    expect(longestCommonSubstring("a", "a")).toBe(1);
  });

  it("handles single-character strings that differ", () => {
    expect(longestCommonSubstring("a", "b")).toBe(0);
  });

  it("finds substring at the beginning", () => {
    expect(longestCommonSubstring("abcdef", "abcxyz")).toBe(3);
  });

  it("finds substring at the end", () => {
    expect(longestCommonSubstring("xyzabc", "defabc")).toBe(3);
  });

  it("returns longest when multiple substrings exist", () => {
    expect(longestCommonSubstring("abXYZcd", "abXYcd")).toBe(4);
  });

  it("handles repeated characters", () => {
    expect(longestCommonSubstring("aaaa", "aa")).toBe(2);
  });
});
