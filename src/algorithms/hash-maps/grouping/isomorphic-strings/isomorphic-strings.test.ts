import { describe, it, expect } from "vitest";

function isomorphicStrings(textA: string, textB: string): boolean {
  if (textA.length !== textB.length) return false;
  const aToB = new Map<string, string>();
  const bToA = new Map<string, string>();
  for (let charIndex = 0; charIndex < textA.length; charIndex++) {
    const charA = textA[charIndex]!;
    const charB = textB[charIndex]!;
    const mappedB = aToB.get(charA);
    const mappedA = bToA.get(charB);
    if (mappedB === undefined && mappedA === undefined) {
      aToB.set(charA, charB);
      bToA.set(charB, charA);
    } else if (mappedB !== charB || mappedA !== charA) {
      return false;
    }
  }
  return true;
}

describe("isomorphicStrings", () => {
  it("returns true for 'egg' and 'add'", () => {
    expect(isomorphicStrings("egg", "add")).toBe(true);
  });

  it("returns false for 'foo' and 'bar'", () => {
    expect(isomorphicStrings("foo", "bar")).toBe(false);
  });

  it("returns true for 'paper' and 'title'", () => {
    expect(isomorphicStrings("paper", "title")).toBe(true);
  });

  it("returns false for different lengths", () => {
    expect(isomorphicStrings("ab", "abc")).toBe(false);
  });

  it("returns true for empty strings", () => {
    expect(isomorphicStrings("", "")).toBe(true);
  });

  it("returns true for single character strings", () => {
    expect(isomorphicStrings("a", "b")).toBe(true);
  });

  it("returns false for 'badc' and 'baba'", () => {
    expect(isomorphicStrings("badc", "baba")).toBe(false);
  });

  it("returns true for identical strings", () => {
    expect(isomorphicStrings("abc", "abc")).toBe(true);
  });
});
