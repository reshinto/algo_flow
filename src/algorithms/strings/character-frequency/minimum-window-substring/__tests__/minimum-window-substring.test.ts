/** Correctness tests for the Minimum Window Substring algorithm. */

import { describe, it, expect } from "vitest";
import { minimumWindowSubstring } from "../sources/minimum-window-substring.ts?fn";

describe("minimumWindowSubstring", () => {
  it("returns BANC for the classic example ADOBECODEBANC / ABC", () => {
    expect(minimumWindowSubstring("ADOBECODEBANC", "ABC")).toBe("BANC");
  });

  it("returns the single matching character when text equals pattern", () => {
    expect(minimumWindowSubstring("a", "a")).toBe("a");
  });

  it("returns empty string when pattern requires more of a character than text contains", () => {
    expect(minimumWindowSubstring("a", "aa")).toBe("");
  });

  it("returns empty string when pattern character is absent from text", () => {
    expect(minimumWindowSubstring("hello", "z")).toBe("");
  });

  it("returns the entire text when text equals pattern", () => {
    expect(minimumWindowSubstring("abc", "abc")).toBe("abc");
  });

  it("returns empty string when text is shorter than pattern", () => {
    expect(minimumWindowSubstring("ab", "abc")).toBe("");
  });

  it("handles duplicate characters in pattern correctly", () => {
    expect(minimumWindowSubstring("ADOBECODEBANC", "AABC")).toBe("ADOBECODEBA");
  });

  it("returns the minimum window when multiple valid windows exist", () => {
    // "aa" and "ba" both contain a and b, but "ba" is later so "aa"... actually "ab" is length 2
    // text = "cabwefgewcwaefgcf", pattern = "cae" → "cwae"
    expect(minimumWindowSubstring("cabwefgewcwaefgcf", "cae")).toBe("cwae");
  });

  it("handles single-character pattern found at the end", () => {
    expect(minimumWindowSubstring("abcdef", "f")).toBe("f");
  });

  it("returns empty string for empty pattern", () => {
    expect(minimumWindowSubstring("abc", "")).toBe("");
  });

  it("handles text with all same characters and pattern requiring one", () => {
    expect(minimumWindowSubstring("aaabbbccc", "b")).toBe("b");
  });

  it("returns correct result when window must span full text", () => {
    expect(minimumWindowSubstring("abc", "cba")).toBe("abc");
  });
});
