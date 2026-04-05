import { describe, it, expect } from "vitest";
import { autoCompleteTrie } from "./sources/auto-complete-trie.ts?fn";

describe("autoCompleteTrie", () => {
  it("returns all words matching the given prefix", () => {
    const result = autoCompleteTrie(["apple", "app", "apricot", "banana", "bat"], "ap");
    expect(result.sort()).toEqual(["app", "apple", "apricot"]);
  });

  it("returns a single word when only one matches the prefix", () => {
    const result = autoCompleteTrie(["apple", "banana", "cherry"], "ban");
    expect(result).toEqual(["banana"]);
  });

  it("returns an empty array when no word matches the prefix", () => {
    const result = autoCompleteTrie(["apple", "app", "apricot"], "ba");
    expect(result).toEqual([]);
  });

  it("returns an empty array when prefix does not exist in the trie", () => {
    const result = autoCompleteTrie(["apple", "app"], "xyz");
    expect(result).toEqual([]);
  });

  it("returns all words when prefix is empty", () => {
    const result = autoCompleteTrie(["apple", "app", "banana"], "");
    expect(result.sort()).toEqual(["app", "apple", "banana"]);
  });

  it("returns an empty array when the word list is empty", () => {
    const result = autoCompleteTrie([], "ap");
    expect(result).toEqual([]);
  });

  it("returns the exact word when prefix equals a full word", () => {
    const result = autoCompleteTrie(["apple", "app", "apricot"], "app");
    expect(result.sort()).toEqual(["app", "apple"]);
  });

  it("returns words with no shared sub-prefix correctly", () => {
    const result = autoCompleteTrie(["cat", "car", "dog"], "ca");
    expect(result.sort()).toEqual(["car", "cat"]);
  });

  it("handles a single-word dictionary where the word matches", () => {
    const result = autoCompleteTrie(["hello"], "hel");
    expect(result).toEqual(["hello"]);
  });

  it("handles a single-word dictionary where the word does not match", () => {
    const result = autoCompleteTrie(["hello"], "world");
    expect(result).toEqual([]);
  });

  it("handles words with no shared prefix returning correct matches", () => {
    const result = autoCompleteTrie(["alpha", "beta", "gamma"], "al");
    expect(result).toEqual(["alpha"]);
  });

  it("matches the default input correctly", () => {
    const result = autoCompleteTrie(["apple", "app", "apricot", "banana", "bat"], "ap");
    expect(result.sort()).toEqual(["app", "apple", "apricot"]);
  });

  it("handles duplicate words gracefully — returns the word once", () => {
    const result = autoCompleteTrie(["apple", "apple"], "app");
    expect(result.sort()).toEqual(["apple"]);
  });

  it("returns words for single-character prefix", () => {
    const result = autoCompleteTrie(["apple", "apricot", "banana"], "a");
    expect(result.sort()).toEqual(["apple", "apricot"]);
  });
});
