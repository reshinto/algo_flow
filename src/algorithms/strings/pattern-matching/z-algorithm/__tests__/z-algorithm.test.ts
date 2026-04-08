import { describe, it, expect } from "vitest";
import { zAlgorithm } from "../sources/z-algorithm.ts?fn";

describe("zAlgorithm", () => {
  it("finds the pattern at the start of the text", () => {
    expect(zAlgorithm("ABCDEF", "ABC")).toBe(0);
  });

  it("finds the pattern in the middle of the text", () => {
    expect(zAlgorithm("AABXAABXCAABXAABXAY", "AABXAAB")).toBe(0);
  });

  it("finds the pattern near the end of the text", () => {
    expect(zAlgorithm("XYZAABXAAB", "AABXAAB")).toBe(3);
  });

  it("finds the pattern at the end of the text", () => {
    expect(zAlgorithm("XYZABC", "ABC")).toBe(3);
  });

  it("returns -1 when the pattern is not present", () => {
    expect(zAlgorithm("ABCDEFG", "XYZ")).toBe(-1);
  });

  it("handles a single-character pattern that exists", () => {
    expect(zAlgorithm("HELLO", "L")).toBe(2);
  });

  it("handles a single-character pattern that does not exist", () => {
    expect(zAlgorithm("HELLO", "Z")).toBe(-1);
  });

  it("returns 0 for an empty pattern", () => {
    expect(zAlgorithm("HELLO", "")).toBe(0);
  });

  it("handles text equal to the pattern", () => {
    expect(zAlgorithm("ABCD", "ABCD")).toBe(0);
  });

  it("returns -1 when pattern is longer than text", () => {
    expect(zAlgorithm("AB", "ABCD")).toBe(-1);
  });

  it("handles repeated characters correctly", () => {
    expect(zAlgorithm("AAAAAB", "AAAB")).toBe(2);
  });

  it("finds the first of multiple occurrences", () => {
    expect(zAlgorithm("ABABABAB", "ABAB")).toBe(0);
  });
});
