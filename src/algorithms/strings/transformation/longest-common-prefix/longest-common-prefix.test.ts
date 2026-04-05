/** Correctness tests for the longestCommonPrefix pure function. */

import { describe, it, expect } from "vitest";
import { longestCommonPrefix } from "./sources/longest-common-prefix.ts?fn";

describe("longestCommonPrefix", () => {
  it('returns "fl" for ["flower","flow","flight"]', () => {
    expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
  });

  it('returns "" for ["dog","racecar","car"] — no common prefix', () => {
    expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe("");
  });

  it('returns "" for [""] — single empty string', () => {
    expect(longestCommonPrefix([""])).toBe("");
  });

  it("returns the string itself for a single-element array", () => {
    expect(longestCommonPrefix(["hello"])).toBe("hello");
  });

  it("returns empty string for an empty array", () => {
    expect(longestCommonPrefix([])).toBe("");
  });

  it('returns "" when one word is empty', () => {
    expect(longestCommonPrefix(["abc", ""])).toBe("");
  });

  it("returns the shared prefix when all strings are identical", () => {
    expect(longestCommonPrefix(["abc", "abc", "abc"])).toBe("abc");
  });

  it("returns the full first word when it is a prefix of all others", () => {
    expect(longestCommonPrefix(["ab", "abc", "abcd"])).toBe("ab");
  });

  it('returns "a" for ["ab","a"]', () => {
    expect(longestCommonPrefix(["ab", "a"])).toBe("a");
  });

  it("handles two-word arrays with partial overlap", () => {
    expect(longestCommonPrefix(["interview", "internal"])).toBe("inter");
  });
});
