/** Correctness tests for the suffixArrayConstruction pure function. */

import { describe, it, expect } from "vitest";
import { suffixArrayConstruction } from "./sources/suffix-array-construction.ts?fn";

describe("suffixArrayConstruction", () => {
  it('returns [5,3,1,0,4,2] for "banana"', () => {
    // Suffixes in sorted order: a(5), ana(3), anana(1), banana(0), na(4), nana(2)
    expect(suffixArrayConstruction("banana")).toEqual([5, 3, 1, 0, 4, 2]);
  });

  it('returns [0] for single character "a"', () => {
    expect(suffixArrayConstruction("a")).toEqual([0]);
  });

  it("returns [] for empty string", () => {
    expect(suffixArrayConstruction("")).toEqual([]);
  });

  it("returns indices in suffix-sorted order for a two-character string", () => {
    // "ab" → suffixes: "ab"(0), "b"(1) → sorted: "ab" < "b" → [0, 1]
    expect(suffixArrayConstruction("ab")).toEqual([0, 1]);
  });

  it("returns reversed indices when input is in descending char order", () => {
    // "ba" → suffixes: "ba"(0), "a"(1) → sorted: "a" < "ba" → [1, 0]
    expect(suffixArrayConstruction("ba")).toEqual([1, 0]);
  });

  it('handles all identical characters "aaa"', () => {
    // Suffixes: "aaa"(0), "aa"(1), "a"(2) → sorted: "a"(2) < "aa"(1) < "aaa"(0)
    expect(suffixArrayConstruction("aaa")).toEqual([2, 1, 0]);
  });

  it('handles "mississippi" with known suffix array', () => {
    // Known suffix array for "mississippi": [10,7,4,1,0,9,8,6,3,5,2]
    // i(10), ippi(7), issippi(4), ississippi(1), mississippi(0), pi(9), ppi(8), sippi(6), sissippi(3), ssippi(5), ssissippi(2)
    expect(suffixArrayConstruction("mississippi")).toEqual([10, 7, 4, 1, 0, 9, 8, 6, 3, 5, 2]);
  });

  it("produces an array of length equal to input text length", () => {
    const result = suffixArrayConstruction("hello");
    expect(result).toHaveLength(5);
  });

  it("produces a permutation of [0..n-1]", () => {
    const text = "abracadabra";
    const result = suffixArrayConstruction(text);
    const sorted = [...result].sort((firstVal, secondVal) => firstVal - secondVal);
    expect(sorted).toEqual(Array.from({ length: text.length }, (_, idx) => idx));
  });

  it("handles single repeated pair", () => {
    // "abab" → suffixes: "abab"(0), "bab"(1), "ab"(2), "b"(3)
    // sorted: "ab"(2) < "abab"(0) < "b"(3) < "bab"(1)
    expect(suffixArrayConstruction("abab")).toEqual([2, 0, 3, 1]);
  });

  it("produces suffix array where each successive suffix is lexicographically larger", () => {
    const text = "banana";
    const suffixArray = suffixArrayConstruction(text) as number[];
    for (let rankIdx = 0; rankIdx < suffixArray.length - 1; rankIdx++) {
      const currentSuffix = text.slice(suffixArray[rankIdx]!);
      const nextSuffix = text.slice(suffixArray[rankIdx + 1]!);
      expect(currentSuffix <= nextSuffix).toBe(true);
    }
  });
});
