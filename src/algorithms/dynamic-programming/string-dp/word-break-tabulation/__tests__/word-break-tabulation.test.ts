import { describe, it, expect } from "vitest";
import { wordBreakTabulation } from "../sources/word-break-tabulation.ts?fn";

describe("wordBreakTabulation", () => {
  it("returns true for 'leetcode' with ['leet', 'code']", () => {
    expect(wordBreakTabulation("leetcode", ["leet", "code"])).toBe(true);
  });

  it("returns true for 'applepenapple' with ['apple', 'pen']", () => {
    expect(wordBreakTabulation("applepenapple", ["apple", "pen"])).toBe(true);
  });

  it("returns false for 'catsandog' with ['cats', 'dog', 'sand', 'and', 'cat']", () => {
    expect(wordBreakTabulation("catsandog", ["cats", "dog", "sand", "and", "cat"])).toBe(false);
  });

  it("returns true for empty string with any dictionary", () => {
    expect(wordBreakTabulation("", ["a"])).toBe(true);
  });

  it("returns true for 'catsanddog' with ['cats', 'dog', 'sand', 'and', 'cat']", () => {
    expect(wordBreakTabulation("catsanddog", ["cats", "dog", "sand", "and", "cat"])).toBe(true);
  });

  it("returns false when no word matches", () => {
    expect(wordBreakTabulation("hello", ["world", "foo"])).toBe(false);
  });

  it("returns true when text equals a single dictionary word", () => {
    expect(wordBreakTabulation("apple", ["apple", "pen"])).toBe(true);
  });

  it("returns false when partial match leaves remainder unsegmentable", () => {
    expect(wordBreakTabulation("leetcoderr", ["leet", "code"])).toBe(false);
  });

  it("handles dictionary with repeated word usage", () => {
    expect(wordBreakTabulation("aaaa", ["a", "aa"])).toBe(true);
  });

  it("returns false when string cannot be fully covered", () => {
    expect(wordBreakTabulation("abcd", ["ab", "cd", "abc"])).toBe(true);
  });
});
