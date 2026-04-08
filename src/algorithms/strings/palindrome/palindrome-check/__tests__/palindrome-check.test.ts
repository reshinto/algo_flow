/** Correctness tests for the palindromeCheck function. */

import { describe, it, expect } from "vitest";
import { palindromeCheck } from "../sources/palindrome-check.ts?fn";

describe("palindromeCheck", () => {
  it("returns true for a classic odd-length palindrome", () => {
    expect(palindromeCheck("racecar")).toBe(true);
  });

  it("returns false for a non-palindrome", () => {
    expect(palindromeCheck("hello")).toBe(false);
  });

  it("returns true for a single character", () => {
    expect(palindromeCheck("a")).toBe(true);
  });

  it("returns true for an empty string", () => {
    expect(palindromeCheck("")).toBe(true);
  });

  it("returns false for a two-character non-palindrome", () => {
    expect(palindromeCheck("ab")).toBe(false);
  });

  it("returns true for an odd-length symmetric string", () => {
    expect(palindromeCheck("aba")).toBe(true);
  });

  it("returns true for an even-length palindrome", () => {
    expect(palindromeCheck("abba")).toBe(true);
  });

  it("returns false when only the first and last chars differ", () => {
    expect(palindromeCheck("abca")).toBe(false);
  });

  it("returns true for a string of repeated identical characters", () => {
    expect(palindromeCheck("aaaa")).toBe(true);
  });
});
