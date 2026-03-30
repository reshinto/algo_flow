import { describe, it, expect } from "vitest";

function ransomNote(ransomNoteText: string, magazine: string): boolean {
  const charCounts = new Map<string, number>();
  for (const currentChar of magazine) {
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
  }
  for (const currentChar of ransomNoteText) {
    const updatedCount = (charCounts.get(currentChar) ?? 0) - 1;
    if (updatedCount < 0) return false;
    charCounts.set(currentChar, updatedCount);
  }
  return true;
}

describe("ransomNote", () => {
  it("returns true when magazine has exactly the needed characters", () => {
    expect(ransomNote("aa", "aab")).toBe(true);
  });

  it("returns false when magazine lacks a required character", () => {
    expect(ransomNote("a", "b")).toBe(false);
  });

  it("returns false when magazine has the character but not enough copies", () => {
    expect(ransomNote("aa", "ab")).toBe(false);
  });

  it("returns true when ransom note is empty", () => {
    expect(ransomNote("", "abc")).toBe(true);
  });

  it("returns true when both strings are empty", () => {
    expect(ransomNote("", "")).toBe(true);
  });

  it("returns false when ransom note is non-empty but magazine is empty", () => {
    expect(ransomNote("a", "")).toBe(false);
  });

  it("returns true when magazine contains extra characters beyond what is needed", () => {
    expect(ransomNote("abc", "aabbcc")).toBe(true);
  });

  it("returns false when ransom note has a character not present in magazine at all", () => {
    expect(ransomNote("z", "abcde")).toBe(false);
  });

  it("returns true for a single matching character", () => {
    expect(ransomNote("x", "x")).toBe(true);
  });

  it("handles repeated characters requiring exact count from magazine", () => {
    expect(ransomNote("aaa", "aaab")).toBe(true);
    expect(ransomNote("aaaa", "aaab")).toBe(false);
  });
});
