import { describe, it, expect } from "vitest";
import { hammingDistance } from "../sources/hamming-distance.ts?fn";

describe("hammingDistance", () => {
  it("returns 3 for the default karolin / kathrin example", () => {
    expect(hammingDistance("karolin", "kathrin")).toBe(3);
  });

  it("returns 0 for two identical strings", () => {
    expect(hammingDistance("abcdef", "abcdef")).toBe(0);
  });

  it("returns the full length when every character differs", () => {
    expect(hammingDistance("aaaa", "bbbb")).toBe(4);
  });

  it("returns 1 for a single-character difference", () => {
    expect(hammingDistance("hello", "hxllo")).toBe(1);
  });

  it("returns -1 when the strings have different lengths", () => {
    expect(hammingDistance("abc", "abcd")).toBe(-1);
  });

  it("returns -1 when text is longer than pattern", () => {
    expect(hammingDistance("abcde", "abc")).toBe(-1);
  });

  it("handles single-character strings that match", () => {
    expect(hammingDistance("a", "a")).toBe(0);
  });

  it("handles single-character strings that differ", () => {
    expect(hammingDistance("a", "b")).toBe(1);
  });

  it("returns 0 for two empty strings", () => {
    expect(hammingDistance("", "")).toBe(0);
  });

  it("returns 2 for a known binary string pair", () => {
    expect(hammingDistance("1011101", "1001001")).toBe(2);
  });

  it("handles uppercase character comparisons", () => {
    expect(hammingDistance("TONED", "ROSES")).toBe(3);
  });
});
