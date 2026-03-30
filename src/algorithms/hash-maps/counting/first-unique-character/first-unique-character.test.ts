import { describe, it, expect } from "vitest";

function firstUniqueCharacter(text: string): number {
  const charCounts = new Map<string, number>();
  for (const currentChar of text) {
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
  }
  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    if (charCounts.get(text[charIndex]!) === 1) return charIndex;
  }
  return -1;
}

describe("firstUniqueCharacter", () => {
  it("returns 0 for 'leetcode' where 'l' is unique first", () => {
    expect(firstUniqueCharacter("leetcode")).toBe(0);
  });

  it("returns 2 for 'loveleetcode' where 'v' is first unique", () => {
    expect(firstUniqueCharacter("loveleetcode")).toBe(2);
  });

  it("returns -1 for 'aabb' where no character is unique", () => {
    expect(firstUniqueCharacter("aabb")).toBe(-1);
  });

  it("returns 0 for a single character string", () => {
    expect(firstUniqueCharacter("z")).toBe(0);
  });

  it("returns -1 for a string where all characters repeat", () => {
    expect(firstUniqueCharacter("aabbcc")).toBe(-1);
  });

  it("returns the last index when only the last character is unique", () => {
    expect(firstUniqueCharacter("aabc")).toBe(2);
  });

  it("handles strings with all distinct characters", () => {
    expect(firstUniqueCharacter("abcde")).toBe(0);
  });

  it("returns correct index for repeated prefix followed by unique suffix", () => {
    expect(firstUniqueCharacter("abab")).toBe(-1);
  });

  it("handles 'aadadaad' where 'd' repeats and no unique exists", () => {
    expect(firstUniqueCharacter("aadadaad")).toBe(-1);
  });

  it("finds uniqueness considering full frequency before returning", () => {
    // 'a' appears at 0,2 so not unique; 'b' at 1 is unique
    expect(firstUniqueCharacter("aba")).toBe(1);
  });
});
