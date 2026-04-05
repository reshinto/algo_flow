/** Correctness tests for the naivePatternSearch function. */

import { describe, it, expect } from "vitest";
import { naivePatternSearch } from "./sources/naive-pattern-search.ts?fn";

describe("naivePatternSearch", () => {
  it("finds the pattern at the start of the text", () => {
    expect(naivePatternSearch("ABCDEF", "ABC")).toBe(0);
  });

  it("finds the pattern in the middle of the text", () => {
    expect(naivePatternSearch("AABAACAADAABAABA", "AABA")).toBe(0);
  });

  it("finds the pattern at the end of the text", () => {
    expect(naivePatternSearch("XYZABC", "ABC")).toBe(3);
  });

  it("returns -1 when the pattern is not present", () => {
    expect(naivePatternSearch("ABCDEFG", "XYZ")).toBe(-1);
  });

  it("handles a single-character pattern that exists", () => {
    expect(naivePatternSearch("HELLO", "L")).toBe(2);
  });

  it("handles a single-character pattern that does not exist", () => {
    expect(naivePatternSearch("HELLO", "Z")).toBe(-1);
  });

  it("returns 0 for an empty pattern", () => {
    expect(naivePatternSearch("HELLO", "")).toBe(0);
  });

  it("handles text equal to the pattern", () => {
    expect(naivePatternSearch("ABCD", "ABCD")).toBe(0);
  });

  it("returns -1 when pattern is longer than text", () => {
    expect(naivePatternSearch("AB", "ABCD")).toBe(-1);
  });

  it("handles repeated characters correctly", () => {
    expect(naivePatternSearch("AAAAAB", "AAAB")).toBe(2);
  });

  it("finds the first of multiple occurrences", () => {
    expect(naivePatternSearch("AABAACAADAABAABA", "AABA")).toBe(0);
  });

  it("handles worst-case repetitive text", () => {
    expect(naivePatternSearch("AAAAAAB", "AAAAB")).toBe(2);
  });
});
