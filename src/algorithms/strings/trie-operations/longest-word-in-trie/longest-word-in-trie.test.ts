import { describe, it, expect } from "vitest";
import { longestWordInTrie } from "./sources/longest-word-in-trie.ts?fn";

describe("longestWordInTrie", () => {
  it("returns the longest word when all prefixes are present", () => {
    expect(longestWordInTrie(["w", "wo", "wor", "worl", "world"])).toBe("world");
  });

  it("returns empty string for an empty word list", () => {
    expect(longestWordInTrie([])).toBe("");
  });

  it("returns a single-character word when only one word is present", () => {
    expect(longestWordInTrie(["a"])).toBe("a");
  });

  it("returns empty string when no word has all its prefixes present", () => {
    // "world" requires "w","wo","wor","worl" — none of those are present
    expect(longestWordInTrie(["world"])).toBe("");
  });

  it("returns the longer of two valid candidates", () => {
    // "apple": a, ap, app, appl, apple — all present
    // "app": a, ap, app — all present
    // "apple" is longer so it wins
    const words = ["a", "ap", "app", "appl", "apple"];
    expect(longestWordInTrie(words)).toBe("apple");
  });

  it("returns lexicographically smallest when lengths tie", () => {
    // "b","ba" and "c","ca" are both length-2 valid words
    // "ba" < "ca" lexicographically
    expect(longestWordInTrie(["b", "ba", "c", "ca"])).toBe("ba");
  });

  it("ignores branches where an intermediate node is not end-of-word", () => {
    // "do" is missing so "dog" cannot be the answer even though "d" and "dog" are present
    expect(longestWordInTrie(["d", "dog"])).toBe("d");
  });

  it("handles the default input correctly", () => {
    expect(longestWordInTrie(["w", "wo", "wor", "worl", "world"])).toBe("world");
  });

  it("returns empty string when words list has only multi-char entries without prefixes", () => {
    expect(longestWordInTrie(["abc", "def", "ghi"])).toBe("");
  });

  it("handles two competing complete chains — picks longer one", () => {
    // "a","ab","abc" (length 3) vs "x","xy" (length 2)
    expect(longestWordInTrie(["a", "ab", "abc", "x", "xy"])).toBe("abc");
  });

  it("handles duplicate words gracefully", () => {
    expect(longestWordInTrie(["a", "a", "ab", "ab"])).toBe("ab");
  });

  it("returns lexicographically smallest when only single chars are valid", () => {
    // Both "b" and "c" are length 1 — "b" < "c" lexicographically
    expect(longestWordInTrie(["b", "c"])).toBe("b");
  });
});
