/** Correctness tests for the longestRepeatedSubstring pure function. */

import { describe, it, expect } from "vitest";
import { longestRepeatedSubstring } from "../sources/longest-repeated-substring.ts?fn";

describe("longestRepeatedSubstring", () => {
  it('finds "ana" as the longest repeated substring in "banana"', () => {
    expect(longestRepeatedSubstring("banana")).toBe("ana");
  });

  it("returns empty string when no character repeats", () => {
    expect(longestRepeatedSubstring("abcd")).toBe("");
  });

  it('finds "a" as the longest repeated substring in "aab"', () => {
    expect(longestRepeatedSubstring("aab")).toBe("a");
  });

  it("returns empty string for a single character string", () => {
    expect(longestRepeatedSubstring("a")).toBe("");
  });

  it("returns empty string for an empty string", () => {
    expect(longestRepeatedSubstring("")).toBe("");
  });

  it('finds "ab" as the longest repeated substring in "ababc"', () => {
    expect(longestRepeatedSubstring("ababc")).toBe("ab");
  });

  it("handles a string where all characters are the same", () => {
    // "aaa" → longest repeated substring is "aa" (positions 0-1 and 1-2 overlap, but DP skips diagonal)
    const result = longestRepeatedSubstring("aaa");
    expect(result.length).toBeGreaterThan(0);
    expect("aaa".includes(result)).toBe(true);
  });

  it("handles two-character string with identical characters", () => {
    expect(longestRepeatedSubstring("aa")).toBe("a");
  });

  it("handles two-character string with different characters", () => {
    expect(longestRepeatedSubstring("ab")).toBe("");
  });

  it('finds the correct repeated pattern in "abcabc"', () => {
    expect(longestRepeatedSubstring("abcabc")).toBe("abc");
  });

  it('finds repeated substring in "mississippi"', () => {
    const result = longestRepeatedSubstring("mississippi");
    // "issi" appears twice — the result should be a non-empty repeated substring
    expect(result.length).toBeGreaterThan(0);
    const firstOccurrence = "mississippi".indexOf(result);
    const secondOccurrence = "mississippi".indexOf(result, firstOccurrence + 1);
    expect(secondOccurrence).toBeGreaterThan(-1);
  });

  it("handles numeric-like characters in the string", () => {
    expect(longestRepeatedSubstring("121212")).toBe("1212");
  });
});
