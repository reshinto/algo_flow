import { describe, it, expect } from "vitest";
import { findAllAnagrams } from "./sources/find-all-anagrams.ts?fn";

describe("findAllAnagrams", () => {
  it("finds both anagram windows in the default example", () => {
    expect(findAllAnagrams("cbaebabacd", "abc")).toEqual([0, 6]);
  });

  it("finds consecutive overlapping anagram windows", () => {
    expect(findAllAnagrams("abab", "ab")).toEqual([0, 1, 2]);
  });

  it("returns an empty array when no anagram exists", () => {
    expect(findAllAnagrams("af", "be")).toEqual([]);
  });

  it("finds a match when the entire text is the anagram", () => {
    const result = findAllAnagrams("cba", "abc") as number[];
    expect(result).toEqual([0]);
  });

  it("handles a single-character pattern", () => {
    expect(findAllAnagrams("aaab", "a")).toEqual([0, 1, 2]);
  });

  it("returns empty when pattern is longer than the text", () => {
    expect(findAllAnagrams("ab", "abc")).toEqual([]);
  });

  it("returns empty when no window in text matches the pattern", () => {
    expect(findAllAnagrams("aabbcc", "bca")).toEqual([]);
  });

  it("finds all anagram windows for a repeated-char pattern", () => {
    // pattern "aab" = {a:2, b:1}
    // windows: "aab"(0)=match, "aba"(1)=match, "bab"(2)=no, "abb"(3)=no
    const result = findAllAnagrams("aababb", "aab") as number[];
    expect(result).toContain(0);
    expect(result).toContain(1);
  });
});
