/** Correctness tests for the First Non-Repeating Character algorithm. */

import { describe, it, expect } from "vitest";
import { firstNonRepeatingCharacter } from "../sources/first-non-repeating-character.ts?fn";

describe("firstNonRepeatingCharacter", () => {
  it('returns 0 for "leetcode" — first unique char is l at index 0', () => {
    expect(firstNonRepeatingCharacter("leetcode")).toBe(0);
  });

  it('returns 2 for "loveleetcode" — first unique char is v at index 2', () => {
    expect(firstNonRepeatingCharacter("loveleetcode")).toBe(2);
  });

  it('returns -1 for "aabb" — all characters repeat', () => {
    expect(firstNonRepeatingCharacter("aabb")).toBe(-1);
  });

  it("returns 0 for a single-character string", () => {
    expect(firstNonRepeatingCharacter("z")).toBe(0);
  });

  it("returns -1 for a string where every character appears twice", () => {
    expect(firstNonRepeatingCharacter("aabbcc")).toBe(-1);
  });

  it("returns the index of the unique character when it appears in the middle", () => {
    expect(firstNonRepeatingCharacter("aabbc")).toBe(4);
  });

  it("returns 0 when the first character is the only non-repeating one", () => {
    expect(firstNonRepeatingCharacter("xaabb")).toBe(0);
  });

  it("returns the last index when only the last character is non-repeating", () => {
    expect(firstNonRepeatingCharacter("aabbz")).toBe(4);
  });

  it("returns -1 for a string of all identical characters", () => {
    expect(firstNonRepeatingCharacter("aaaa")).toBe(-1);
  });

  it("returns 0 for a two-character string where both are unique", () => {
    expect(firstNonRepeatingCharacter("ab")).toBe(0);
  });

  it('handles "dddccdbba" — all of d, c, b repeat so first unique is a at index 8', () => {
    expect(firstNonRepeatingCharacter("dddccdbba")).toBe(8);
  });
});
