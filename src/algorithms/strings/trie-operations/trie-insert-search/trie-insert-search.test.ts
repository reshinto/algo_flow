import { describe, it, expect } from "vitest";
import { trieInsertSearch } from "./sources/trie-insert-search.ts?fn";

describe("trieInsertSearch", () => {
  it("finds an exact word that was inserted", () => {
    expect(trieInsertSearch(["apple", "app"], "app")).toBe(true);
  });

  it("returns false for a prefix that was not inserted as a full word", () => {
    expect(trieInsertSearch(["apple"], "ap")).toBe(false);
  });

  it("finds a longer word that was inserted alongside shorter prefixes", () => {
    expect(trieInsertSearch(["apple", "app"], "apple")).toBe(true);
  });

  it("returns false when the search word is not in the trie at all", () => {
    expect(trieInsertSearch(["apple", "app", "apricot"], "banana")).toBe(false);
  });

  it("returns false when the trie is empty", () => {
    expect(trieInsertSearch([], "app")).toBe(false);
  });

  it("finds a single inserted word", () => {
    expect(trieInsertSearch(["hello"], "hello")).toBe(true);
  });

  it("returns false for a word that extends beyond an inserted word", () => {
    expect(trieInsertSearch(["app"], "apple")).toBe(false);
  });

  it("handles words sharing no common prefix", () => {
    expect(trieInsertSearch(["cat", "dog", "bird"], "dog")).toBe(true);
  });

  it("handles words sharing no common prefix — search miss", () => {
    expect(trieInsertSearch(["cat", "dog", "bird"], "fox")).toBe(false);
  });

  it("handles duplicate words gracefully — still returns true", () => {
    expect(trieInsertSearch(["apple", "apple"], "apple")).toBe(true);
  });

  it("handles single-character words", () => {
    expect(trieInsertSearch(["a", "b", "c"], "b")).toBe(true);
  });

  it("returns false for empty search string when no empty word inserted", () => {
    expect(trieInsertSearch(["apple", "app"], "")).toBe(false);
  });

  it("finds the default input search word correctly", () => {
    expect(trieInsertSearch(["apple", "app", "apricot"], "app")).toBe(true);
  });
});
