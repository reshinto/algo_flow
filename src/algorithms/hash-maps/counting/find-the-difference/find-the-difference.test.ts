import { describe, it, expect } from "vitest";

function findTheDifference(original: string, modified: string): string {
  const charCounts = new Map<string, number>();
  for (const currentChar of original) {
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
  }
  for (const currentChar of modified) {
    const count = (charCounts.get(currentChar) ?? 0) - 1;
    charCounts.set(currentChar, count);
    if (count < 0) return currentChar;
  }
  return "";
}

describe("findTheDifference", () => {
  it("finds 'e' added to 'abcd' → 'abcde'", () => {
    expect(findTheDifference("abcd", "abcde")).toBe("e");
  });

  it("finds added char when it appears at the start", () => {
    expect(findTheDifference("abc", "zabc")).toBe("z");
  });

  it("finds added char when it duplicates an existing one", () => {
    expect(findTheDifference("aab", "aabb")).toBe("b");
  });

  it("handles empty original string", () => {
    expect(findTheDifference("", "x")).toBe("x");
  });

  it("finds added char in middle position", () => {
    expect(findTheDifference("ab", "amb")).toBe("m");
  });

  it("handles single character original", () => {
    expect(findTheDifference("a", "ab")).toBe("b");
  });

  it("finds duplicated character in all-same string", () => {
    expect(findTheDifference("aaa", "aaaa")).toBe("a");
  });

  it("works with uppercase letters", () => {
    expect(findTheDifference("ABC", "ABCD")).toBe("D");
  });
});
