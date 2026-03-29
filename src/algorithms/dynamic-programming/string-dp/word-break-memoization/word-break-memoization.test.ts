import { describe, it, expect } from "vitest";
import { wordBreakMemoization } from "./sources/word-break-memoization.ts?fn";

describe("wordBreakMemoization", () => {
  it("returns true for the default input 'leetcode' with ['leet', 'code']", () => {
    expect(wordBreakMemoization("leetcode", ["leet", "code"])).toBe(true);
  });

  it("returns false when no segmentation is possible", () => {
    expect(wordBreakMemoization("catsandog", ["cats", "dog", "sand", "and", "cat"])).toBe(false);
  });

  it("returns true for an empty string", () => {
    expect(wordBreakMemoization("", ["leet", "code"])).toBe(true);
  });

  it("returns true when text exactly matches one dictionary word", () => {
    expect(wordBreakMemoization("leet", ["leet", "code"])).toBe(true);
  });

  it("returns false when text has no matching words in dictionary", () => {
    expect(wordBreakMemoization("abcd", ["leet", "code"])).toBe(false);
  });

  it("returns true for 'applepenapple' with ['apple', 'pen']", () => {
    expect(wordBreakMemoization("applepenapple", ["apple", "pen"])).toBe(true);
  });

  it("returns true for 'catsanddog' with ['cat', 'cats', 'and', 'sand', 'dog']", () => {
    expect(wordBreakMemoization("catsanddog", ["cat", "cats", "and", "sand", "dog"])).toBe(true);
  });

  it("returns false for 'aaaaab' with only 'a' prefixes in dictionary", () => {
    expect(wordBreakMemoization("aaaaab", ["a", "aa", "aaa", "aaaa"])).toBe(false);
  });

  it("returns true when multiple segmentations are possible", () => {
    expect(wordBreakMemoization("pineapple", ["pine", "apple", "pineapple"])).toBe(true);
  });

  it("returns false when text is one character not in dictionary", () => {
    expect(wordBreakMemoization("z", ["a", "b", "c"])).toBe(false);
  });

  it("handles dictionary with single-character words", () => {
    expect(wordBreakMemoization("abc", ["a", "b", "c"])).toBe(true);
  });

  it("matches expected results for several standard inputs", () => {
    const cases: Array<[string, string[], boolean]> = [
      ["leetcode", ["leet", "code"], true],
      ["applepenapple", ["apple", "pen"], true],
      ["catsandog", ["cats", "dog", "sand", "and", "cat"], false],
      ["", ["word"], true],
    ];
    for (const [text, dictionary, expected] of cases) {
      expect(wordBreakMemoization(text, dictionary)).toBe(expected);
    }
  });
});
