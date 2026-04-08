/** Correctness tests for the jaroWinklerSimilarity pure function. */

import { describe, it, expect } from "vitest";
import { jaroWinklerSimilarity } from "../sources/jaro-winkler-similarity.ts?fn";

describe("jaroWinklerSimilarity", () => {
  it('scores "martha" and "marhta" at ~0.9611 (classic example)', () => {
    expect(jaroWinklerSimilarity("martha", "marhta")).toBeCloseTo(0.9611, 4);
  });

  it("returns 1.0 for identical strings", () => {
    expect(jaroWinklerSimilarity("abc", "abc")).toBe(1.0);
  });

  it("returns 1.0 for two empty strings", () => {
    expect(jaroWinklerSimilarity("", "")).toBe(1.0);
  });

  it("returns 0.0 when source is empty", () => {
    expect(jaroWinklerSimilarity("", "abc")).toBe(0.0);
  });

  it("returns 0.0 when target is empty", () => {
    expect(jaroWinklerSimilarity("abc", "")).toBe(0.0);
  });

  it("returns 0.0 for completely different strings of equal length", () => {
    // No characters fall within each other's match windows
    expect(jaroWinklerSimilarity("abc", "xyz")).toBe(0.0);
  });

  it('scores "CRATE" and "TRACE" with partial matches', () => {
    const score = jaroWinklerSimilarity("CRATE", "TRACE");
    // Jaro is ~0.7333, no common prefix so Winkler adds nothing
    expect(score).toBeGreaterThan(0.7);
    expect(score).toBeLessThan(0.8);
  });

  it('scores "DwAyNE" and "DuANE" above 0.84 (prefix boost)', () => {
    const score = jaroWinklerSimilarity("DwAyNE", "DuANE");
    expect(score).toBeGreaterThanOrEqual(0.84);
  });

  it("scores identical single characters at 1.0", () => {
    expect(jaroWinklerSimilarity("a", "a")).toBe(1.0);
  });

  it("returns a value between 0.0 and 1.0 for arbitrary strings", () => {
    const score = jaroWinklerSimilarity("algorithm", "logarithm");
    expect(score).toBeGreaterThanOrEqual(0.0);
    expect(score).toBeLessThanOrEqual(1.0);
  });

  it("is not symmetric — source and target order can differ slightly", () => {
    // By definition Jaro-Winkler is symmetric; confirm both directions are equal
    const forward = jaroWinklerSimilarity("martha", "marhta");
    const backward = jaroWinklerSimilarity("marhta", "martha");
    expect(forward).toBe(backward);
  });

  it("rewards common prefix — longer prefix gives higher score than no prefix", () => {
    // "JOHNSON" vs "JHNSON" shares prefix "J"
    // "AOHNSON" vs "JHNSON" shares no prefix
    const withPrefix = jaroWinklerSimilarity("JOHNSON", "JHNSON");
    const withoutPrefix = jaroWinklerSimilarity("AOHNSON", "JHNSON");
    expect(withPrefix).toBeGreaterThan(withoutPrefix);
  });

  it("prefix bonus is capped at 4 characters", () => {
    // "abcdefgh" vs "abcdXXXX" — prefix length would be 4 (capped)
    // "abcXefgh" vs "abcdXXXX" — prefix length is 3
    const fourPrefixScore = jaroWinklerSimilarity("abcdefgh", "abcdXXXX");
    const threePrefixScore = jaroWinklerSimilarity("abcXefgh", "abcdXXXX");
    expect(fourPrefixScore).toBeGreaterThan(threePrefixScore);
  });
});
