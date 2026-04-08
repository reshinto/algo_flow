import { describe, it, expect } from "vitest";
import { boyerMooreSearch } from "../sources/boyer-moore-search.ts?fn";

describe("boyerMooreSearch", () => {
  it("finds the pattern at the start of the text", () => {
    expect(boyerMooreSearch("ABCDEF", "ABC")).toBe(0);
  });

  it("finds the pattern in the middle of the text", () => {
    expect(boyerMooreSearch("ABAAABCD", "ABC")).toBe(4);
  });

  it("finds the pattern at the end of the text", () => {
    expect(boyerMooreSearch("XYZABC", "ABC")).toBe(3);
  });

  it("returns -1 when the pattern is not present", () => {
    expect(boyerMooreSearch("ABCDEFG", "XYZ")).toBe(-1);
  });

  it("handles a single-character pattern that exists", () => {
    expect(boyerMooreSearch("HELLO", "L")).toBe(2);
  });

  it("handles a single-character pattern that does not exist", () => {
    expect(boyerMooreSearch("HELLO", "Z")).toBe(-1);
  });

  it("returns 0 for an empty pattern", () => {
    expect(boyerMooreSearch("HELLO", "")).toBe(0);
  });

  it("handles text equal to the pattern", () => {
    expect(boyerMooreSearch("ABCD", "ABCD")).toBe(0);
  });

  it("returns -1 when pattern is longer than text", () => {
    expect(boyerMooreSearch("AB", "ABCD")).toBe(-1);
  });

  it("handles repeated characters with bad character skipping", () => {
    expect(boyerMooreSearch("AAAAABCD", "ABCD")).toBe(4);
  });

  it("finds a pattern that requires multiple shifts", () => {
    expect(boyerMooreSearch("GCATCGCAGAGAGTATACAGTACG", "GCAGAGAG")).toBe(5);
  });

  it("handles patterns with no repeated characters", () => {
    expect(boyerMooreSearch("ABCDEFGHIJK", "DEF")).toBe(3);
  });
});
