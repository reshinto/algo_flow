/** Correctness tests for the validPalindrome function. */

import { describe, it, expect } from "vitest";
import { validPalindrome } from "../sources/valid-palindrome.ts?fn";

describe("validPalindrome", () => {
  it("returns true for the classic mixed-case phrase with punctuation", () => {
    expect(validPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  it("returns false for a non-palindrome with spaces", () => {
    expect(validPalindrome("race a car")).toBe(false);
  });

  it("returns true for a string of only spaces", () => {
    expect(validPalindrome(" ")).toBe(true);
  });

  it("returns true for a single alphanumeric character followed by punctuation", () => {
    expect(validPalindrome("a.")).toBe(true);
  });

  it("returns true for an empty string", () => {
    expect(validPalindrome("")).toBe(true);
  });

  it("returns true for a simple lowercase palindrome", () => {
    expect(validPalindrome("racecar")).toBe(true);
  });

  it("returns false for a simple lowercase non-palindrome", () => {
    expect(validPalindrome("hello")).toBe(false);
  });

  it("returns true when case differs but characters are the same", () => {
    expect(validPalindrome("AbBa")).toBe(true);
  });

  it("returns true for a string of only punctuation", () => {
    expect(validPalindrome(".,!?")).toBe(true);
  });

  it("returns true for alphanumeric palindrome with surrounding punctuation", () => {
    expect(validPalindrome("...racecar...")).toBe(true);
  });

  it("returns false when alphanumeric mismatch occurs in the middle", () => {
    expect(validPalindrome("ab2a")).toBe(false);
  });
});
