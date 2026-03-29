import { describe, it, expect } from "vitest";
import { kmpSearch } from "./sources/kmp-search.ts?fn";

describe("kmpSearch", () => {
  it("finds the pattern at the start of the text", () => {
    expect(kmpSearch("ABCDEF", "ABC")).toBe(0);
  });

  it("finds the pattern in the middle of the text", () => {
    expect(kmpSearch("ABABDABACDABABCABAB", "ABABCABAB")).toBe(10);
  });

  it("finds the pattern at the end of the text", () => {
    expect(kmpSearch("XYZABC", "ABC")).toBe(3);
  });

  it("returns -1 when the pattern is not present", () => {
    expect(kmpSearch("ABCDEFG", "XYZ")).toBe(-1);
  });

  it("handles a single-character pattern that exists", () => {
    expect(kmpSearch("HELLO", "L")).toBe(2);
  });

  it("handles a single-character pattern that does not exist", () => {
    expect(kmpSearch("HELLO", "Z")).toBe(-1);
  });

  it("returns 0 for an empty pattern", () => {
    expect(kmpSearch("HELLO", "")).toBe(0);
  });

  it("handles text equal to the pattern", () => {
    expect(kmpSearch("ABCD", "ABCD")).toBe(0);
  });

  it("returns -1 when pattern is longer than text", () => {
    expect(kmpSearch("AB", "ABCD")).toBe(-1);
  });

  it("handles repeated characters correctly", () => {
    expect(kmpSearch("AAAAAB", "AAAB")).toBe(2);
  });
});
