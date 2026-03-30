import { describe, it, expect } from "vitest";

function longestSubstringWithoutRepeating(text: string): number {
  const charIndexMap = new Map<string, number>();
  let windowStart = 0;
  let maxLength = 0;
  for (let windowEnd = 0; windowEnd < text.length; windowEnd++) {
    const currentChar = text[windowEnd]!;
    const previousIndex = charIndexMap.get(currentChar);
    if (previousIndex !== undefined && previousIndex >= windowStart)
      windowStart = previousIndex + 1;
    charIndexMap.set(currentChar, windowEnd);
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  return maxLength;
}

describe("longestSubstringWithoutRepeating", () => {
  it("returns 3 for 'abcabcbb'", () => {
    expect(longestSubstringWithoutRepeating("abcabcbb")).toBe(3);
  });
  it("returns 1 for 'bbbbb'", () => {
    expect(longestSubstringWithoutRepeating("bbbbb")).toBe(1);
  });
  it("returns 3 for 'pwwkew'", () => {
    expect(longestSubstringWithoutRepeating("pwwkew")).toBe(3);
  });
  it("returns 0 for empty string", () => {
    expect(longestSubstringWithoutRepeating("")).toBe(0);
  });
  it("returns 1 for single char", () => {
    expect(longestSubstringWithoutRepeating("a")).toBe(1);
  });
  it("returns 5 for 'abcde'", () => {
    expect(longestSubstringWithoutRepeating("abcde")).toBe(5);
  });
  it("returns 2 for 'abba'", () => {
    expect(longestSubstringWithoutRepeating("abba")).toBe(2);
  });
  it("returns 3 for 'dvdf'", () => {
    expect(longestSubstringWithoutRepeating("dvdf")).toBe(3);
  });
});
