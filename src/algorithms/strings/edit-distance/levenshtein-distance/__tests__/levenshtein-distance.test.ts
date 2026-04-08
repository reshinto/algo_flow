/** Correctness tests for the levenshteinDistance pure function. */

import { describe, it, expect } from "vitest";
import { levenshteinDistance } from "../sources/levenshtein-distance.ts?fn";

describe("levenshteinDistance", () => {
  it('transforms "kitten" to "sitting" with edit distance 3', () => {
    expect(levenshteinDistance("kitten", "sitting")).toBe(3);
  });

  it("returns the target length when source is empty", () => {
    expect(levenshteinDistance("", "abc")).toBe(3);
  });

  it("returns the source length when target is empty", () => {
    expect(levenshteinDistance("abc", "")).toBe(3);
  });

  it("returns 0 for identical strings", () => {
    expect(levenshteinDistance("abc", "abc")).toBe(0);
  });

  it("returns 0 for two empty strings", () => {
    expect(levenshteinDistance("", "")).toBe(0);
  });

  it("returns 1 for a single insertion", () => {
    expect(levenshteinDistance("cat", "cats")).toBe(1);
  });

  it("returns 1 for a single deletion", () => {
    expect(levenshteinDistance("cats", "cat")).toBe(1);
  });

  it("returns 1 for a single replacement", () => {
    expect(levenshteinDistance("cat", "bat")).toBe(1);
  });

  it("handles completely different strings", () => {
    expect(levenshteinDistance("abc", "xyz")).toBe(3);
  });

  it('transforms "sunday" to "saturday" with edit distance 3', () => {
    expect(levenshteinDistance("sunday", "saturday")).toBe(3);
  });

  it("handles single-character strings that match", () => {
    expect(levenshteinDistance("a", "a")).toBe(0);
  });

  it("handles single-character strings that differ", () => {
    expect(levenshteinDistance("a", "b")).toBe(1);
  });

  it("handles repeated characters", () => {
    expect(levenshteinDistance("aaa", "aa")).toBe(1);
  });
});
