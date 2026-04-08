import { describe, it, expect } from "vitest";

function validAnagram(textA: string, textB: string): boolean {
  if (textA.length !== textB.length) return false;
  const charCounts = new Map<string, number>();
  for (const currentChar of textA) {
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
  }
  for (const currentChar of textB) {
    const updatedCount = (charCounts.get(currentChar) ?? 0) - 1;
    if (updatedCount < 0) return false;
    charCounts.set(currentChar, updatedCount);
  }
  return true;
}

describe("validAnagram", () => {
  it("returns true for 'anagram' and 'nagaram'", () => {
    expect(validAnagram("anagram", "nagaram")).toBe(true);
  });

  it("returns false for 'rat' and 'car'", () => {
    expect(validAnagram("rat", "car")).toBe(false);
  });

  it("returns false when strings have different lengths", () => {
    expect(validAnagram("ab", "abc")).toBe(false);
  });

  it("returns true for two identical single-character strings", () => {
    expect(validAnagram("a", "a")).toBe(true);
  });

  it("returns false for two different single-character strings", () => {
    expect(validAnagram("a", "b")).toBe(false);
  });

  it("returns true for empty strings", () => {
    expect(validAnagram("", "")).toBe(true);
  });

  it("returns true when both strings are the same", () => {
    expect(validAnagram("listen", "listen")).toBe(true);
  });

  it("returns true for 'listen' and 'silent'", () => {
    expect(validAnagram("listen", "silent")).toBe(true);
  });

  it("returns false when one string has an extra repeated char", () => {
    expect(validAnagram("aab", "aaa")).toBe(false);
  });

  it("is case-sensitive — 'Aa' is not an anagram of 'aa'", () => {
    expect(validAnagram("Aa", "aa")).toBe(false);
  });
});
