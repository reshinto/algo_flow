/** Correctness tests for the Aho-Corasick Search pure implementation. */

import { describe, it, expect } from "vitest";
import { ahoCorasickSearch } from "../sources/aho-corasick-search.ts?fn";

describe("ahoCorasickSearch", () => {
  it("finds all patterns in the classic example", () => {
    const result = ahoCorasickSearch("ahishers", ["he", "she", "his", "hers"]) as string[];
    expect(result.sort()).toEqual(["he", "hers", "his", "she"].sort());
  });

  it("returns an empty array when no patterns are found", () => {
    const result = ahoCorasickSearch("hello world", ["xyz", "abc"]) as string[];
    expect(result).toHaveLength(0);
  });

  it("returns an empty array when patterns list is empty", () => {
    const result = ahoCorasickSearch("hello", []) as string[];
    expect(result).toHaveLength(0);
  });

  it("returns an empty array when text is empty", () => {
    const result = ahoCorasickSearch("", ["hello", "world"]) as string[];
    expect(result).toHaveLength(0);
  });

  it("finds a single pattern that appears once", () => {
    const result = ahoCorasickSearch("banana", ["nan"]) as string[];
    expect(result).toEqual(["nan"]);
  });

  it("finds a pattern that appears multiple times — reported only once", () => {
    const result = ahoCorasickSearch("aaaa", ["aa"]) as string[];
    expect(result).toEqual(["aa"]);
  });

  it("finds overlapping patterns", () => {
    const result = ahoCorasickSearch("aabc", ["a", "aa", "aab"]) as string[];
    expect(result.sort()).toEqual(["a", "aa", "aab"].sort());
  });

  it("finds a pattern that is a prefix of another pattern", () => {
    const result = ahoCorasickSearch("app", ["app", "ap"]) as string[];
    expect(result.sort()).toEqual(["ap", "app"].sort());
  });

  it("finds a pattern equal to the full text", () => {
    const result = ahoCorasickSearch("hello", ["hello"]) as string[];
    expect(result).toEqual(["hello"]);
  });

  it("handles single-character patterns", () => {
    const result = ahoCorasickSearch("abcabc", ["a", "b"]) as string[];
    expect(result.sort()).toEqual(["a", "b"].sort());
  });

  it("returns only found patterns, not all patterns", () => {
    const result = ahoCorasickSearch("cat", ["cat", "dog", "bird"]) as string[];
    expect(result).toEqual(["cat"]);
  });

  it("handles patterns with no shared prefix", () => {
    const result = ahoCorasickSearch("foobar", ["foo", "bar"]) as string[];
    expect(result.sort()).toEqual(["bar", "foo"].sort());
  });

  it("handles case sensitivity — does not find case-mismatched patterns", () => {
    const result = ahoCorasickSearch("Hello", ["hello"]) as string[];
    expect(result).toHaveLength(0);
  });

  it("finds a pattern at the very end of the text", () => {
    const result = ahoCorasickSearch("xyzabc", ["abc"]) as string[];
    expect(result).toEqual(["abc"]);
  });

  it("finds a pattern at the very start of the text", () => {
    const result = ahoCorasickSearch("abcxyz", ["abc"]) as string[];
    expect(result).toEqual(["abc"]);
  });
});
