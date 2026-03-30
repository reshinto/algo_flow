import { describe, it, expect } from "vitest";
import { wordPattern } from "./sources/word-pattern.ts?fn";

describe("wordPattern", () => {
  it("returns true for the default example abba / dog cat cat dog", () => {
    expect(wordPattern("abba", "dog cat cat dog")).toBe(true);
  });

  it("returns false when char maps to two different words", () => {
    expect(wordPattern("abba", "dog cat cat fish")).toBe(false);
  });

  it("returns false when two chars map to the same word", () => {
    expect(wordPattern("aabb", "dog dog cat cat")).toBe(true);
    expect(wordPattern("aaaa", "dog cat cat dog")).toBe(false);
  });

  it("returns false when pattern and word count differ", () => {
    expect(wordPattern("abc", "dog cat")).toBe(false);
  });

  it("returns true for a single-character pattern matching a single word", () => {
    expect(wordPattern("a", "dog")).toBe(true);
  });

  it("returns true for identical pattern chars mapping to same word", () => {
    expect(wordPattern("aa", "dog dog")).toBe(true);
  });

  it("returns false when bijection is violated in the word-to-char direction", () => {
    // 'a' maps to 'dog' and 'b' maps to 'dog' — not a bijection
    expect(wordPattern("ab", "dog dog")).toBe(false);
  });

  it("handles all unique characters and words", () => {
    expect(wordPattern("abcd", "one two three four")).toBe(true);
  });
});
