import { describe, it, expect } from "vitest";
import { reorganizeString } from "../sources/reorganize-string.ts?fn";

function hasAdjacentDuplicates(str: string): boolean {
  for (let charIndex = 1; charIndex < str.length; charIndex++) {
    if (str[charIndex] === str[charIndex - 1]) return true;
  }
  return false;
}

function characterCounts(str: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const character of str) {
    counts[character] = (counts[character] ?? 0) + 1;
  }
  return counts;
}

describe("reorganizeString", () => {
  it('returns a valid reorganization of "aabbc"', () => {
    const result = reorganizeString("aabbc") as string;
    expect(result).toHaveLength(5);
    expect(hasAdjacentDuplicates(result)).toBe(false);
    expect(characterCounts(result)).toEqual(characterCounts("aabbc"));
  });

  it('returns a valid reorganization of "aaab" — impossible, returns empty string', () => {
    const result = reorganizeString("aaab");
    expect(result).toBe("");
  });

  it('handles single character "a"', () => {
    const result = reorganizeString("a");
    expect(result).toBe("a");
  });

  it('handles two different characters "ab"', () => {
    const result = reorganizeString("ab") as string;
    expect(result.length).toBe(2);
    expect(hasAdjacentDuplicates(result)).toBe(false);
  });

  it('handles "aab" — exactly one valid arrangement "aba"', () => {
    const result = reorganizeString("aab") as string;
    expect(result).toHaveLength(3);
    expect(hasAdjacentDuplicates(result)).toBe(false);
  });

  it('handles "vvvlo" — must interleave vs', () => {
    const result = reorganizeString("vvvlo") as string;
    expect(result).toHaveLength(5);
    expect(hasAdjacentDuplicates(result)).toBe(false);
    expect(characterCounts(result)).toEqual(characterCounts("vvvlo"));
  });

  it("returns same characters as input in the valid case", () => {
    const input = "aabbc";
    const result = reorganizeString(input) as string;
    if (result.length > 0) {
      expect(characterCounts(result)).toEqual(characterCounts(input));
    }
  });

  it("returns empty string when impossible", () => {
    // 'aaa' — three of one character, impossible for length 3
    const result = reorganizeString("aaa");
    expect(result).toBe("");
  });

  it("handles two identical characters — impossible", () => {
    const result = reorganizeString("aa");
    expect(result).toBe("");
  });

  it("handles all unique characters", () => {
    const result = reorganizeString("abcde") as string;
    expect(result).toHaveLength(5);
    expect(hasAdjacentDuplicates(result)).toBe(false);
  });
});
