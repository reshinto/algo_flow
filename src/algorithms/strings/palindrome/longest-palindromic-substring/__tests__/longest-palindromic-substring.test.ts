/** Correctness tests for the longestPalindromicSubstring function. */

import { describe, it, expect } from "vitest";
import { longestPalindromicSubstring } from "../sources/longest-palindromic-substring.ts?fn";

describe("longestPalindromicSubstring", () => {
  it("returns 'bab' or 'aba' for 'babad'", () => {
    const result = longestPalindromicSubstring("babad") as string;
    expect(["bab", "aba"]).toContain(result);
  });

  it("returns 'bb' for 'cbbd'", () => {
    expect(longestPalindromicSubstring("cbbd")).toBe("bb");
  });

  it("returns the single character for a length-1 string", () => {
    expect(longestPalindromicSubstring("a")).toBe("a");
  });

  it("returns empty string for an empty input", () => {
    expect(longestPalindromicSubstring("")).toBe("");
  });

  it("returns the entire string when it is a palindrome", () => {
    expect(longestPalindromicSubstring("racecar")).toBe("racecar");
  });

  it("returns the entire string for an even-length palindrome", () => {
    expect(longestPalindromicSubstring("abba")).toBe("abba");
  });

  it("handles a string of all identical characters", () => {
    expect(longestPalindromicSubstring("aaaa")).toBe("aaaa");
  });

  it("returns first character when all characters are unique", () => {
    const result = longestPalindromicSubstring("abcde") as string;
    expect(result.length).toBe(1);
  });

  it("finds a palindrome embedded in the middle", () => {
    expect(longestPalindromicSubstring("xyzracecarabc")).toBe("racecar");
  });

  it("finds an even-length palindrome embedded in a longer string", () => {
    expect(longestPalindromicSubstring("xyzabbadef")).toBe("abba");
  });

  it("handles a two-character palindrome", () => {
    expect(longestPalindromicSubstring("aa")).toBe("aa");
  });

  it("handles a two-character non-palindrome by returning one character", () => {
    const result = longestPalindromicSubstring("ab") as string;
    expect(result.length).toBe(1);
  });
});
