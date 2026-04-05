import { describe, it, expect } from "vitest";
import { rabinKarpSearch } from "./sources/rabin-karp-search.ts?fn";

describe("rabinKarpSearch", () => {
  it("finds the pattern at the start of the text", () => {
    expect(rabinKarpSearch("ABCDEF", "ABC")).toBe(0);
  });

  it("finds the pattern in the middle of the text", () => {
    expect(rabinKarpSearch("GEEKS FOR GEEKS", "GEEK")).toBe(0);
  });

  it("finds the pattern at the end of the text", () => {
    expect(rabinKarpSearch("XYZABC", "ABC")).toBe(3);
  });

  it("returns -1 when the pattern is not present", () => {
    expect(rabinKarpSearch("ABCDEFG", "XYZ")).toBe(-1);
  });

  it("handles a single-character pattern that exists", () => {
    expect(rabinKarpSearch("HELLO", "L")).toBe(2);
  });

  it("handles a single-character pattern that does not exist", () => {
    expect(rabinKarpSearch("HELLO", "Z")).toBe(-1);
  });

  it("returns 0 for an empty pattern", () => {
    expect(rabinKarpSearch("HELLO", "")).toBe(0);
  });

  it("handles text equal to the pattern", () => {
    expect(rabinKarpSearch("ABCD", "ABCD")).toBe(0);
  });

  it("returns -1 when pattern is longer than text", () => {
    expect(rabinKarpSearch("AB", "ABCD")).toBe(-1);
  });

  it("handles repeated characters correctly", () => {
    expect(rabinKarpSearch("AAAAAB", "AAAB")).toBe(2);
  });

  it("finds the second occurrence when first would be a partial match", () => {
    expect(rabinKarpSearch("ABABCABAB", "ABABCABAB")).toBe(0);
  });

  it("handles pattern at a known position in default input", () => {
    expect(rabinKarpSearch("GEEKS FOR GEEKS", "FOR")).toBe(6);
  });
});
