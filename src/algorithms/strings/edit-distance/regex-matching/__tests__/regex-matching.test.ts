/** Correctness tests for the regexMatching pure function. */

import { describe, it, expect } from "vitest";
import { regexMatching } from "../sources/regex-matching.ts?fn";

describe("regexMatching", () => {
  it('matches "aab" against "c*a*b" returning true', () => {
    expect(regexMatching("aab", "c*a*b")).toBe(true);
  });

  it('does not match "aa" against "a" returning false', () => {
    expect(regexMatching("aa", "a")).toBe(false);
  });

  it('matches "ab" against ".*" returning true', () => {
    expect(regexMatching("ab", ".*")).toBe(true);
  });

  it("matches empty text against empty pattern returning true", () => {
    expect(regexMatching("", "")).toBe(true);
  });

  it('matches "aa" against "a*" returning true', () => {
    expect(regexMatching("aa", "a*")).toBe(true);
  });

  it('matches "aa" against ".*" returning true', () => {
    expect(regexMatching("aa", ".*")).toBe(true);
  });

  it('does not match "aab" against "c*a*" returning false', () => {
    expect(regexMatching("aab", "c*a*")).toBe(false);
  });

  it('matches "mississippi" against "mis*is*p*." returning false', () => {
    expect(regexMatching("mississippi", "mis*is*p*.")).toBe(false);
  });

  it('matches "ab" against ".*c" returning false', () => {
    expect(regexMatching("ab", ".*c")).toBe(false);
  });

  it('matches single character "a" against "." returning true', () => {
    expect(regexMatching("a", ".")).toBe(true);
  });

  it('does not match "b" against "a" returning false', () => {
    expect(regexMatching("b", "a")).toBe(false);
  });

  it('matches empty text against "a*" returning true', () => {
    expect(regexMatching("", "a*")).toBe(true);
  });

  it('matches "aaa" against "a*a" returning true', () => {
    expect(regexMatching("aaa", "a*a")).toBe(true);
  });

  it('matches "abc" against "a.c" returning true', () => {
    expect(regexMatching("abc", "a.c")).toBe(true);
  });
});
